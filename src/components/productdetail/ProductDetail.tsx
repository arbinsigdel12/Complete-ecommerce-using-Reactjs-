import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductImageSection from "./ProductImageSection";
import ProductInfoSection from "./ProductInfoSection";
import ProductDetailSkeleton from "../skeletonLoader/productdetail/ProductDetailsSkeletonloader";
import "./productdetail.css";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    if (!id) {
      setLoading(false);
      return;
    }
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // small delay kept for skeleton experience
        setTimeout(() => {
          setProduct(data);
          setLoading(false);
        }, 400);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <ProductDetailSkeleton />;
  if (!product) return <div className="error">Product not found.</div>;

  return (
    <div className="product-detail-container">
      <div className="product-detail">
        <ProductImageSection image={product.image} title={product.title} />
        <ProductInfoSection product={product} />
      </div>
    </div>
  );
};

export default ProductDetail;
