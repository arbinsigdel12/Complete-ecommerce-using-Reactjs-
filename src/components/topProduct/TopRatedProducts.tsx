import React, { useEffect, useState, useRef } from "react";
import "./TopRatedProducts.css";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import Product from "../products/Product";

interface ProductType {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: { rate: number; count: number };
}

const TopRatedProducts: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data: ProductType[] = await res.json();

        const filtered = data.filter(
          (item) => item.rating && item.rating.rate >= 4
        );

        setProducts(filtered);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setTimeout(() => setLoading(false));
      }
    };

    fetchData();
  }, []);

  // Responsive scroll amount based on screen width
  const getScrollAmount = () => {
    if (typeof window === "undefined") return 300;

    if (window.innerWidth <= 480) {
      return 180;
    } else if (window.innerWidth <= 860) {
      return 250; // Medium scroll on tablet
    } else {
      return 400; // Default scroll on desktop
    }
  };

  const scrollLeftHandler = () => {
    const scrollAmount = getScrollAmount();
    carouselRef.current?.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };

  const scrollRightHandler = () => {
    const scrollAmount = getScrollAmount();
    carouselRef.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  // Drag functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;

    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;

    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  // Touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!carouselRef.current) return;

    setIsDragging(true);
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !carouselRef.current) return;

    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="top-rated-section">
      <h2>Top Rated Products</h2>

      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
          <p>Loading top-rated products...</p>
        </div>
      ) : products.length === 0 ? (
        <p className="no-products">No top-rated products found.</p>
      ) : (
        <div className="carousel-container">
          <button className="carousel-btn left" onClick={scrollLeftHandler}>
            <IoIosArrowDropleft />
          </button>

          <div
            className="carousel"
            ref={carouselRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleMouseUp}
            onTouchMove={handleTouchMove}
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
          >
            {products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>

          <button className="carousel-btn right" onClick={scrollRightHandler}>
            <IoIosArrowDropright />
          </button>
        </div>
      )}
    </div>
  );
};

export default TopRatedProducts;
