import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductImageSection from "./productimagesection/ProductImageSection";
import ProductInfoSection from "./productinfosection/ProductInfoSection";
import ProductDetailSkeleton from "../skeletonLoader/productdetail/ProductDetailsSkeletonloader";
import "./productdetail.css";
import type { Product } from "../../type/Product";

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
