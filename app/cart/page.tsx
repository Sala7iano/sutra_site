"use client";
import { getCart } from "../components/storageHelpers";

export default function Cart() {
  const cart = getCart();

  return (
    <section style={{ textAlign: "center", padding: "4em 1em" }}>
      <h2>🛒 Your Cart</h2>

      {cart.length > 0 ? (
        <>
          {cart.map((p: { name: string; price: string }, i: number) => (
            <p key={i}>
              {p.name} — {p.price}
            </p>
          ))}
          <p>Total Items: {cart.length}</p>
        </>
      ) : (
        <p>
          Your cart is empty — add something from our collections.
        </p>
      )}
    </section>
  );
}