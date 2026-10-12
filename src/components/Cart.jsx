import React from "react";
import { Minus, Plus, Trash2, X, ShoppingBag } from "lucide-react";

export default function Cart({ open, onClose, items, onUpdateQty, onRemove, onCheckout }) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <>
      {open && <div className="drawer-overlay" onClick={onClose} />}
      <aside className={`cart-drawer ${open ? "open" : ""}`} aria-hidden={!open}>
        <div className="cart-header">
          <div>
            <h2>Your Cart</h2>
            <span>{items.reduce((s, i) => s + i.qty, 0)} item(s)</span>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close cart"><X /></button>
        </div>

        {items.length === 0 ? (
          <div className="empty-cart">
            <ShoppingBag size={42} />
            <h3>Your cart is empty</h3>
            <p>Add a product to get started.</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map(item => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-thumb">{item.emoji}</div>
                  <div className="cart-item-main">
                    <h4>{item.name}</h4>
                    <strong>${item.price.toFixed(2)}</strong>
                    <div className="qty-controls">
                      <button onClick={() => onUpdateQty(item.id, -1)}><Minus size={14}/></button>
                      <span>{item.qty}</span>
                      <button onClick={() => onUpdateQty(item.id, 1)}><Plus size={14}/></button>
                      <button className="remove-btn" onClick={() => onRemove(item.id)}><Trash2 size={15}/></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="subtotal">
                <span>Subtotal</span>
                <strong>${subtotal.toFixed(2)}</strong>
              </div>
              <small>Taxes and final payment are simulated.</small>
              <button className="checkout-btn" onClick={onCheckout}>Continue to checkout</button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}