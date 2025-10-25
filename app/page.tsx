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
        Each abaya and isdal is designed to speak luxury in its simplest form—
        soft textures, timeless colors, and tailored comfort for the modern woman.
      </p>

      <p style={{ marginTop: "2em", fontWeight: "bold" }}>
        🌿 Our Spring Line 2025 – Launching Soon 🌿
      </p>

      <a
        href="/abayas"
        style={{
          display: "inline-block",
          marginTop: "2em",
          padding: "0.8em 2em",
          border: "1px solid #C5A253",
          color: "#36454F",
          textDecoration: "none",
          borderRadius: "4px",
        }}
        onMouseOver={(e) => (e.currentTarget.style.background = "#C5A25320")}
        onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
      >
        View Collection
      </a>
    </section>
  );
}