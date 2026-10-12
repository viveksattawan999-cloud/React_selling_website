import React from "react";
import { ShoppingCart, Star } from "lucide-react";

export default function ProductCard({ product, onAdd }) {
  return (
    <article className="product-card">
      <div className="product-art">
        <span className="product-emoji">{product.emoji}</span>
        <span className="badge">{product.badge}</span>
      </div>

      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>

        <div className="rating">
          <Star size={15} fill="currentColor" />
          <span>{product.rating}</span>
          <small>({product.sales.toLocaleString()} sales)</small>
        </div>

        <div className="product-bottom">
          <div className="price">
            <strong>${product.price.toFixed(2)}</strong>
            <del>${product.oldPrice.toFixed(2)}</del>
          </div>
          <button className="add-btn" onClick={() => onAdd(product)}>
            <ShoppingCart size={17} /> Add
          </button>
        </div>
      </div>
    </article>
  );
}