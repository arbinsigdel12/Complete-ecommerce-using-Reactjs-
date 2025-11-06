import React, { useEffect, useState, useRef, useCallback } from "react";
import "./topRatedProducts.css";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import Product from "../products/Product";
import SkeletonLoader from "../skeletonLoader/CarouselSkeletonloader";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

const TopRatedProducts: React.FC = () => {
  const { product } = useSelector((state: RootState) => state.fetchapi);
  const [filteredProducts, setFilteredProducts] = useState(product.data);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const tickingRef = useRef(false);

  useEffect(() => {
    if (product.data.length > 0) {
      const filtered = product.data.filter(
        (item) => item.rating && item.rating.rate >= 4
      );
      setFilteredProducts(filtered);
    }
  }, [product.status, product]);

  const checkScrollPosition = useCallback(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const { scrollLeft, scrollWidth, clientWidth } = carousel;
    setIsAtStart(scrollLeft <= 5);
    setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 5);
  }, []);

  const handleScroll = useCallback(() => {
    if (!tickingRef.current) {
      tickingRef.current = true;
      requestAnimationFrame(() => {
        checkScrollPosition();
        tickingRef.current = false;
      });
    }
  }, [checkScrollPosition]);

  useEffect(() => {
    checkScrollPosition();
    window.addEventListener("resize", checkScrollPosition);
    return () => window.removeEventListener("resize", checkScrollPosition);
  }, [checkScrollPosition, filteredProducts]);

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

      {product.status === "loading" ? (
        <SkeletonLoader />
      ) : filteredProducts.length > 0 ? (
        <div className="carousel-container">
          <button
            className={`carousel-btn left ${isAtStart ? "hidden" : ""}`}
            onClick={scrollLeftHandler}
          >
            <IoIosArrowDropleft />
          </button>

          <div className="carousel" ref={carouselRef} onScroll={handleScroll}>
            {filteredProducts.map((product) => (
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
      ) : (
        <p className="no-products">No top-rated products found.</p>
      )}
    </div>
  );
};

export default TopRatedProducts;
