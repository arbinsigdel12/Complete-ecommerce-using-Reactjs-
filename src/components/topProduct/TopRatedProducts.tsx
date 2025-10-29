import React, { useEffect, useState, useRef, useCallback } from "react";
import "./TopRatedProducts.css";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import Product from "../products/Product";
import SkeletonLoader from "../skeletonLoader/CarouselSkeletonloader";

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
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const checkPositionRef = useRef<(() => void) | null>(null);

  // Fetch products
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

  // Check scroll position
  const checkScrollPosition = useCallback(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const { scrollLeft, scrollWidth, clientWidth } = carousel;
    setIsAtStart(scrollLeft <= 5);
    setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 5);
  }, []);

  checkPositionRef.current = checkScrollPosition;

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          checkPositionRef.current?.();
          ticking = false;
        });
        ticking = true;
      }
    };

    carousel.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", checkScrollPosition, { passive: true });
    checkScrollPosition();

    return () => {
      carousel.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkScrollPosition);
    };
  }, [checkScrollPosition, products]);

  // Scroll handlers
  const getScrollAmount = useCallback(() => {
    if (typeof window === "undefined") return 300;
    if (window.innerWidth <= 480) return 180;
    if (window.innerWidth <= 860) return 250;
    return 400;
  }, []);

  const scrollLeftHandler = () => {
    carouselRef.current?.scrollBy({
      left: -getScrollAmount(),
      behavior: "smooth",
    });
  };

  const scrollRightHandler = () => {
    carouselRef.current?.scrollBy({
      left: getScrollAmount(),
      behavior: "smooth",
    });
  };

  return (
    <div className="top-rated-section">
      <h2>Top Rated Products</h2>

      {loading ? (
        <SkeletonLoader />
      ) : products.length === 0 ? (
        <p className="no-products">No top-rated products found.</p>
      ) : (
        <div className="carousel-container">
          <button
            className={`carousel-btn left ${isAtStart ? "hidden" : ""}`}
            onClick={scrollLeftHandler}
          >
            <IoIosArrowDropleft />
          </button>

          <div className="carousel" ref={carouselRef}>
            {products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>

          <button
            className={`carousel-btn right ${isAtEnd ? "hidden" : ""}`}
            onClick={scrollRightHandler}
          >
            <IoIosArrowDropright />
          </button>
        </div>
      )}
    </div>
  );
};

export default TopRatedProducts;
