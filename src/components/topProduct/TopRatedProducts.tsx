import React, { useEffect, useState, useRef, useCallback } from "react";
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
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const checkPositionRef = useRef<(() => void) | null>(null);

  // fetch api
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

  // Check scroll position to determine if we're at start or end
  const checkScrollPosition = useCallback(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const { scrollLeft, scrollWidth, clientWidth } = carousel;

    // Check if at start (with a small buffer for rounding errors)
    setIsAtStart(scrollLeft <= 5);

    // Check if at end (with a small buffer for rounding errors)
    setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 5);
  }, []);

  // Store the function in ref for the event listener
  checkPositionRef.current = checkScrollPosition;

  // Check the scroll position according to responsivness and add arrow accordingly
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
    const handleResize = () => {
      checkScrollPosition();
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Initial check
    checkScrollPosition();

    return () => {
      carousel.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [checkScrollPosition, products]);

  // Responsive scroll amount based on screen width
  const getScrollAmount = useCallback(() => {
    if (typeof window === "undefined") return 300;

    if (window.innerWidth <= 480) {
      return 180;
    } else if (window.innerWidth <= 860) {
      return 250;
    } else {
      return 400;
    }
  }, []);

  const scrollLeftHandler = () => {
    const scrollAmount = getScrollAmount();
    carouselRef.current?.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };

  const scrollRightHandler = () => {
    const scrollAmount = getScrollAmount();
    carouselRef.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });
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
