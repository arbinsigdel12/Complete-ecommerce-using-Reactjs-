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
  const tickingRef = useRef(false);

  // Fetch products once
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
        setTimeout(() => setLoading(false), 500);
      }
    };
    fetchData();
  }, []);

  // Check scroll position (start/end)
  const checkScrollPosition = useCallback(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const { scrollLeft, scrollWidth, clientWidth } = carousel;
    setIsAtStart(scrollLeft <= 5);
    setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 5);
  }, []);

  // Throttled scroll handler using ref
  const handleScroll = useCallback(() => {
    if (!tickingRef.current) {
      tickingRef.current = true;
      requestAnimationFrame(() => {
        checkScrollPosition();
        tickingRef.current = false;
      });
    }
  }, [checkScrollPosition]);

  // Recalculate on resize
  useEffect(() => {
    checkScrollPosition();
    window.addEventListener("resize", checkScrollPosition);
    return () => window.removeEventListener("resize", checkScrollPosition);
  }, [checkScrollPosition, products]);

  // Scroll amount helper
  const getScrollAmount = useCallback(() => {
    if (typeof window === "undefined") return 300;
    if (window.innerWidth <= 480) return 180;
    if (window.innerWidth <= 860) return 250;
    return 400;
  }, []);

  // Scroll buttons
  const scrollLeftHandler = () => {
    carouselRef.current?.scrollBy({
      left: -getScrollAmount(),
      behavior: "smooth",
    });
    setTimeout(checkScrollPosition, 400);
  };

  const scrollRightHandler = () => {
    carouselRef.current?.scrollBy({
      left: getScrollAmount(),
      behavior: "smooth",
    });
    setTimeout(checkScrollPosition, 400);
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

          <div className="carousel" ref={carouselRef} onScroll={handleScroll}>
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
