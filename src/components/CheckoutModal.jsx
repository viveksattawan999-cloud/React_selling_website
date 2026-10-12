import React, { useState } from "react";
import { Check, CreditCard, MapPin, User, X } from "lucide-react";

export default function CheckoutModal({ open, onClose, total, items, onComplete }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", address: "", city: "", card: "" });
  const [done, setDone] = useState(false);

  if (!open) return null;

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const next = () => setStep(s => Math.min(3, s + 1));
  const back = () => setStep(s => Math.max(1, s - 1));

  const finish = () => {
    setDone(true);
    onComplete();
  };

  return (
    <div className="modal-backdrop">
      <div className="checkout-modal">
        <div className="modal-header">
          <div>
            <h2>{done ? "Order confirmed!" : "Secure Checkout"}</h2>
            {!done && <p>Step {step} of 3</p>}
          </div>
          <button className="icon-btn" onClick={onClose}><X /></button>
        </div>

        {done ? (
          <div className="success-state">
            <div className="success-icon"><Check size={38}/></div>
            <h3>Thanks for your purchase!</h3>
            <p>Your demo order has been placed successfully.</p>
            <strong>Order total: ${total.toFixed(2)}</strong>
            <button className="checkout-btn" onClick={onClose}>Continue shopping</button>
          </div>
        ) : (
          <>
            <div className="steps">
              <span className={step >= 1 ? "active" : ""}>1</span>
              <i />
              <span className={step >= 2 ? "active" : ""}>2</span>
              <i />
              <span className={step >= 3 ? "active" : ""}>3</span>
            </div>

            {step === 1 && (
              <section className="checkout-step">
                <h3><User size={18}/> Contact information</h3>
                <label>Name<input value={form.name} onChange={e => update("name", e.target.value)} placeholder="Alex Johnson"/></label>
                <label>Email<input type="email" value={form.email} onChange={e => update("email", e.target.value)} placeholder="alex@example.com"/></label>
              </section>
            )}

            {step === 2 && (
              <section className="checkout-step">
                <h3><MapPin size={18}/> Billing information</h3>
                <label>Address<input value={form.address} onChange={e => update("address", e.target.value)} placeholder="123 Market Street"/></label>
                <label>City<input value={form.city} onChange={e => update("city", e.target.value)} placeholder="Jaipur"/></label>
              </section>
            )}

            {step === 3 && (
              <section className="checkout-step">
                <h3><CreditCard size={18}/> Payment</h3>
                <label>Card number<input value={form.card} onChange={e => update("card", e.target.value)} placeholder="4242 4242 4242 4242"/></label>
                <div className="demo-note">Demo checkout — no real payment is processed.</div>
                <div className="order-summary">
                  <span>{items.length} product(s)</span>
                  <strong>${total.toFixed(2)}</strong>
                </div>
              </section>
            )}

            <div className="modal-actions">
              {step > 1 && <button className="secondary-btn" onClick={back}>Back</button>}
              {step < 3 ? (
                <button className="checkout-btn" onClick={next}>Continue</button>
              ) : (
                <button className="checkout-btn" onClick={finish}>Place demo order</button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}