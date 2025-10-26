// app/favorites/page.tsx
"use client";
import { getFavorites, toggleFavorite } from "../components/storageHelpers";
import { useEffect, useState } from "react";

export default function Favorites() {
  const [favs, setFavs] = useState<string[]>([]);

  useEffect(() => { setFavs(getFavorites()); }, []);

  const removeItem = (name: string) => setFavs(toggleFavorite(name));

  return (
    <section style={{ textAlign: "center", padding: "4em 1em" }}>
      <h2>♡ Favorites</h2>

      {favs.length ? (
        <ul style={{ listStyle: "none", padding: 0, maxWidth: 500, margin: "2em auto", textAlign: "left" }}>
          {favs.map((item, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #eee",
                padding: ".5em 0",
              }}
            >
              <span>{item}</span>
              <button
                onClick={() => removeItem(item)}
                style={{ border: "none", background: "transparent", color: "#C00", cursor: "pointer" }}
                title="Remove from favorites"
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorites yet.</p>
      )}
    </section>
  );
}