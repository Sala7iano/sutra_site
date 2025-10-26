"use client";
import { getFavorites } from "../components/storageHelpers";

export default function Favorites() {
  const favs = getFavorites();

  return (
    <section style={{ textAlign: "center", padding: "4em 1em" }}>
      <h2>♡ Favorites</h2>

      {favs.length > 0 ? (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {favs.map((item: string, i: number) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>
          No favorites yet — tap ♡ on a product to save it.
        </p>
      )}
    </section>
  );
}