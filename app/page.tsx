export default function Home() {
  return (
    <section
      style={{
        padding: "5em 1em",
        textAlign: "center",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <h2 style={{ fontSize: "2rem", marginBottom: "0.5em" }}>
        Elegance Re‑Imagined
      </h2>

      <p style={{ fontSize: "1.1rem", lineHeight: "1.7em" }}>
        سُترة brings elegance and modesty together.  
        Each abaya and isdal is designed to speak luxury in its simplest form —
        soft textures, timeless colors, and tailored comfort for the modern woman.
      </p>

      <p style={{ marginTop: "2em", fontWeight: "bold" }}>
        🌿 Our Spring Line 2025 – Launching Soon 🌿
      </p>

      {/* === Call‑to‑Action button === */}
      <a href="/abayas" className="viewBtn">
        View Collection
      </a>
    </section>
  );
}