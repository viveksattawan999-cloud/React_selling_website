import React, { useEffect, useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Search, ShieldCheck, Sparkles, Zap } from "lucide-react";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import CheckoutModal from "./components/CheckoutModal";
import products from "./data/products.json";

export default function App() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart") || "[]"));
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? "dark" : "light";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const categories = ["All", ...new Set(products.map(p => p.category))];

  const visibleProducts = useMemo(() => {
    let result = products.filter(p => {
      const matchesQuery = `${p.name} ${p.description} ${p.category}`.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "All" || p.category === category;
      return matchesQuery && matchesCategory;
    });

    if (sort === "price-low") result.sort((a, b) => a.price - b.price);
    if (sort === "price-high") result.sort((a, b) => b.price - a.price);
    if (sort === "rating") result.sort((a, b) => b.rating - a.rating);
    if (sort === "popular") result.sort((a, b) => b.sales - a.sales);
    return result;
  }, [query, category, sort]);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const addToCart = product => {
    setCart(prev => {
      const found = prev.find(i => i.id === product.id);
      return found
        ? prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
        : [...prev, { ...product, qty: 1 }];
    });
    setCartOpen(true);
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev
      .map(item => item.id === id ? { ...item, qty: item.qty + delta } : item)
      .filter(item => item.qty > 0)
    );
  };

  const removeItem = id => setCart(prev => prev.filter(item => item.id !== id));

  const startCheckout = () => {
    if (!cart.length) return;
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const completeOrder = () => setCart([]);

  return (
    <div className="app-shell">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />

      <main>
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow"><Sparkles size={15}/> Premium digital products</span>
            <h1>Everything you need to <span>create, sell & grow.</span></h1>
            <p>Discover ready-to-use digital resources built for creators, entrepreneurs and modern teams.</p>
            <div className="hero-actions">
              <a href="#products" className="primary-link">Explore products <ArrowRight size={17}/></a>
              <span className="trust"><ShieldCheck size={17}/> Secure & instant delivery</span>
            </div>
          </div>
          <div className="hero-card">
            <div className="hero-orbit">✦</div>
            <div className="hero-stat">
              <strong>10,000+</strong>
              <span>happy customers</span>
            </div>
            <div className="hero-mini-grid">
              <div>🎨<small>Design</small></div>
              <div>🤖<small>AI</small></div>
              <div>📈<small>Growth</small></div>
              <div>⚡<small>Instant</small></div>
            </div>
          </div>
        </section>

        <section className="benefits" id="benefits">
          <div><Zap size={20}/><span><strong>Instant access</strong><small>Get your files immediately</small></span></div>
          <div><ShieldCheck size={20}/><span><strong>Secure checkout</strong><small>Your purchase is protected</small></span></div>
          <div><CheckCircle2 size={20}/><span><strong>Curated quality</strong><small>Useful resources, not clutter</small></span></div>
        </section>

        <section className="catalog" id="products">
          <div className="section-heading">
            <div>
              <span className="eyebrow">The marketplace</span>
              <h2>Browse our collection</h2>
            </div>
            <div className="search-box">
              <Search size={18}/>
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search products..." />
            </div>
          </div>

          <div className="filters">
            <div className="category-pills">
              {categories.map(c => <button key={c} className={category === c ? "selected" : ""} onClick={() => setCategory(c)}>{c}</button>)}
            </div>
            <select value={sort} onChange={e => setSort(e.target.value)}>
              <option value="featured">Featured</option>
              <option value="popular">Most popular</option>
              <option value="rating">Highest rated</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
            </select>
          </div>

          <div className="product-grid">
            {visibleProducts.map(product => <ProductCard key={product.id} product={product} onAdd={addToCart} />)}
          </div>

          {!visibleProducts.length && (
            <div className="no-results"><h3>No products found</h3><p>Try another search or category.</p></div>
          )}
        </section>
      </main>

      <footer id="footer">
        <div><span className="brand"><span className="brand-mark">N</span> NovaStore</span><p>Digital products for ambitious people.</p></div>
        <span>© 2026 NovaStore. Demo store.</span>
      </footer>

      <Cart open={cartOpen} onClose={() => setCartOpen(false)} items={cart}
        onUpdateQty={updateQty} onRemove={removeItem} onCheckout={startCheckout} />

      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)}
        total={total} items={cart} onComplete={completeOrder} />
    </div>
  );
}