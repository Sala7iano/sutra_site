"use client";
import { addToCart, toggleFavorite } from "./storageHelpers";

export default function ProductGrid() {
  const items = [
    { name: "Classic Black Abaya", price: "850 EGP", img: "/images/abaya_black.jpg" },
    { name: "Ivory Grace Abaya", price: "870 EGP", img: "/images/abaya_ivory.jpg" },
    { name: "Soft White Isdal", price: "880 EGP", img: "/images/isdal_white.jpg" }
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "2em",
        padding: "3em"
      }}
    >
      {items.map((p) => (
        <div
          key={p.name}
          style={{
            border: "1px solid #EEE",
            borderRadius: "6px",
            padding: "1em",
            textAlign: "center"
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
            <button
              onClick={() => toggleFavorite(p.name)}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontSize: "1.2rem"
              }}
            >
              ♡
            </button>

            <button
              onClick={() => addToCart(p)}
              style={{
                border: "1px solid #C5A253",
                background: "transparent",
                color: "#36454F",
                borderRadius: "4px",
                padding: ".4em 1em",
                cursor: "pointer"
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}