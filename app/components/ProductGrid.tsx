"use client";
import { useEffect, useState } from "react";
import { addToCart, getCart, toggleFavorite, getFavorites } from "./storageHelpers";

export default function ProductGrid() {
  const products = [
    { name: "Classic Black Abaya", price: "850 EGP", img: "/images/abaya_black.jpg" },
    { name: "Ivory Grace Abaya", price: "870 EGP", img: "/images/abaya_ivory.jpg" },
    { name: "Soft White Isdal", price: "880 EGP", img: "/images/isdal_white.jpg" }
  ];

  const [favorites, setFavorites] = useState<string[]>([]);
  const [cart, setCart] = useState<any[]>([]);

  // Load stored data once
  useEffect(() => {
    setFavorites(getFavorites());
    setCart(getCart());
  }, []);

  const handleFavorite = (itemName: string) => {
    const updated = toggleFavorite(itemName);
    setFavorites(updated);
  };

  const handleCart = (p: any) => {
    const updated = addToCart(p);
    setCart(updated);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "2em",
        padding: "3em"
      }}
    >
      {products.map((p) => {
        const isFav = favorites.includes(p.name);
        const inCart = cart.some((c) => c.name === p.name);

        return (
          <div
            key={p.name}
            style={{
              border: "1px solid #eee",
              borderRadius: "6px",
              padding: "1em",
              textAlign: "center",
              transition: "box-shadow 0.3s",
              boxShadow: "0 2px 6px rgba(0,0,0,0.03)"
            }}
          >
            <img
              src={p.img}
              alt={p.name}
              style={{ width: "100%", borderRadius: "6px", marginBottom: "1em" }}
            />

            <h3 style={{ marginBottom: ".3em" }}>{p.name}</h3>
            <p style={{ color: "#C5A253", marginBottom: "1em" }}>{p.price}</p>

            <div style={{ display: "flex", justifyContent: "center", gap: "1em" }}>
              {/* ❤️ Favorite toggle */}
              <button
                onClick={() => handleFavorite(p.name)}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  fontSize: "1.3rem",
                  color: isFav ? "red" : "#36454F",
                  transition: "color 0.2s"
                }}
                title="Add to favorites"
              >
                {isFav ? "❤️" : "♡"}
              </button>

              {/* 🛒 Cart button */}
              <button
                onClick={() => handleCart(p)}
                disabled={inCart}
                style={{
                  padding: "0.6em 1.2em",
                  border: "1px solid #C5A253",
                  borderRadius: "4px",
                  cursor: inCart ? "default" : "pointer",
                  background: inCart ? "#C5A25320" : "transparent",
                  color: inCart ? "#999" : "#36454F",
                  transition: "all 0.2s"
                }}
              >
                {inCart ? "Added" : "Add to Cart"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}