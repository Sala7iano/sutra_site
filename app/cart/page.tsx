// app/cart/page.tsx
"use client";
import { getCart, removeFromCart, clearCart } from "../components/storageHelpers";
import { useEffect, useState } from "react";

export default function Cart() {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const removeItem = (name: string) => setCart(removeFromCart(name));
  const clearAll = () => { clearCart(); setCart([]); };

  const extract = (s: string) => {
    const m = (s || "").match(/[\d.]+/);
    return m ? parseFloat(m[0]) : 0;
  };
  const totalValue = cart.reduce((sum, p) => sum + extract(p.price), 0);

  return (
    <section style={{ textAlign: "center", padding: "4em 1em" }}>
      <h2>🛒 Your Cart</h2>

      {cart.length ? (
        <>
          <div style={{ maxWidth: 600, margin: "2em auto", textAlign: "left" }}>
            {cart.map((p: { name: string; price: string }, i: number) => (
              <p
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid #eee",
                  padding: ".5em 0",
                }}
              >
                <span>{p.name} — {p.price}</span>
                <button
                  onClick={() => removeItem(p.name)}
                  style={{ border: "none", background: "transparent", color: "#C00", cursor: "pointer" }}
                  title="Remove from cart"
                >
                  ✖
                </button>
              </p>
            ))}
          </div>

          <p>
            <strong>Total Items:</strong> {cart.length}<br />
            <strong>Total Value:</strong> {totalValue.toFixed(0)} EGP
          </p>

          <div style={{ marginTop: "1em", display: "flex", gap: "1em", justifyContent: "center" }}>
            <a
              href="/checkout"
              style={{
                padding: "0.7em 1.4em",
                border: "1px solid #C5A253",
                borderRadius: 4,
                background: "#C5A253",
                color: "#fff",
                textDecoration: "none",
              }}
            >
              Proceed to Payment
            </a>

            <button
              onClick={clearAll}
              style={{
                padding: "0.7em 1.4em",
                border: "1px solid #ddd",
                borderRadius: 4,
                background: "transparent",
                color: "#36454F",
                cursor: "pointer",
              }}
            >
              Clear Cart
            </button>
          </div>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </section>
  );
}