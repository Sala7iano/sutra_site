// app/checkout/page.tsx
"use client";
import { getCart, clearCart } from "../components/storageHelpers";
import { useEffect, useState } from "react";

export default function Checkout() {
  const [cart, setCart] = useState<any[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => { setCart(getCart()); }, []);

  const extract = (s: string) => {
    const m = (s || "").match(/[\d.]+/);
    return m ? parseFloat(m[0]) : 0;
  };
  const totalValue = cart.reduce((sum, p) => sum + extract(p.price), 0);

  const completeOrder = () => {
    clearCart();
    setDone(true);
  };

  if (done) {
    return (
      <section style={{ textAlign: "center", padding: "4em 1em" }}>
        <h2>✅ Order Completed</h2>
        <p>Thank you! We’ll contact you to confirm delivery details.</p>
        <a href="/" style={{ color: "#C5A253" }}>Back to Home →</a>
      </section>
    );
  }

  return (
    <section style={{ textAlign: "center", padding: "4em 1em" }}>
      <h2>Checkout</h2>
      {cart.length ? (
        <>
          <div style={{ maxWidth: 600, margin: "2em auto", textAlign: "left" }}>
            {cart.map((p: any, i: number) => (
              <p key={i} style={{ borderBottom: "1px solid #eee", padding: ".5em 0" }}>
                {p.name} — {p.price}
              </p>
            ))}
          </div>
          <p><strong>Total:</strong> {totalValue.toFixed(0)} EGP</p>

          {/* Placeholder for Paymob: we will replace this with real redirect */}
          <button
            onClick={completeOrder}
            style={{
              marginTop: "1em",
              padding: "0.7em 1.4em",
              border: "1px solid #C5A253",
              borderRadius: 4,
              background: "#C5A253",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Complete Order (stub)
          </button>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </section>
  );
}