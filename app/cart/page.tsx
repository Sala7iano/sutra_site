"use client";
import { getCart, removeFromCart } from "../components/storageHelpers";
import { useEffect, useState } from "react";

export default function Cart() {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const removeItem = (name: string) => {
    const updated = removeFromCart(name);
    setCart(updated);
  };

  const totalPrice = cart.reduce((sum, p) => {
    const value = parseFloat(p.price);
    return sum + (isNaN(value) ? 0 : value);
  }, 0);

  return (
    <section style={{ textAlign: "center", padding: "4em 1em" }}>
      <h2>🛒 Your Cart</h2>

      {cart.length ? (
        <>
          <div
            style={{
              maxWidth: "600px",
              margin: "2em auto",
              textAlign: "left",
            }}
          >
            {cart.map(
              (p: { name: string; price: string }, i: number) => (
                <p
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px solid #eee",
                    padding: ".5em 0",
                  }}
                >
                  <span>
                    {p.name} — {p.price}
                  </span>
                  <button
                    onClick={() => removeItem(p.name)}
                    style={{
                      border: "none",
                      background: "transparent",
                      color: "#C00",
                      cursor: "pointer",
                    }}
                    title="Remove from cart"
                  >
                    ✖
                  </button>
                </p>
              )
            )}
          </div>

          <p>
            <strong>Total Items:</strong> {cart.length}
            <br />
            <strong>Total Value:</strong> {totalPrice.toFixed(0)} EGP
          </p>

          <button
            style={{
              marginTop: "1em",
              padding: "0.7em 1.5em",
              border: "1px solid #C5A253",
              borderRadius: "4px",
              background: "#C5A253",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Proceed to Payment
          </button>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </section>
  );
}