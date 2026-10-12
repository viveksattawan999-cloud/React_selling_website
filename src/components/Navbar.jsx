import React from "react";
import { Moon, Sun, ShoppingBag } from "lucide-react";

export default function Navbar({ darkMode, setDarkMode, cartCount, onCartOpen }) {
  return (
    <header className="navbar">
      <div className="nav-inner">
        <a className="brand" href="#" aria-label="NovaStore home">
          <span className="brand-mark">N</span>
          <span>NovaStore</span>
        </a>

        <nav className="nav-links">
          <a href="#products">Products</a>
          <a href="#benefits">Why us</a>
          <a href="#footer">Support</a>
        </nav>

        <div className="nav-actions">
          <button className="icon-btn" onClick={() => setDarkMode(!darkMode)}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}>
            {darkMode ? <Sun size={19} /> : <Moon size={19} />}
          </button>
          <button className="cart-btn" onClick={onCartOpen}>
            <ShoppingBag size={19} />
            <span>Cart</span>
            {cartCount > 0 && <b>{cartCount}</b>}
          </button>
        </div>
      </div>
    </header>
  );
}