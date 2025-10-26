"use client";
import en from "./messages/en.json";
import ar from "./messages/ar.json";

export default function Home() {
  const lang =
    typeof window !== "undefined"
      ? localStorage.getItem("preferredLang") || "en"
      : "en";
  const t = lang === "ar" ? ar : en;

  return (
    <section
      style={{
        padding: "5em 1em",
        textAlign: "center",
        maxWidth: "900px",
        margin: "0 auto",
        direction: lang === "ar" ? "rtl" : "ltr",
      }}
    >
      <h2 style={{ fontSize: "2rem", marginBottom: "0.5em" }}>
        {t.home_title}
      </h2>

      <p style={{ fontSize: "1.1rem", lineHeight: "1.7em" }}>{t.home_text}</p>

      <p style={{ marginTop: "2em", fontWeight: "bold" }}>
        🌿 {lang === "ar" ? "تشكيلة الربيع 2025 – قريبًا" : "Our Spring Line 2025 – Launching Soon"} 🌿
      </p>

<a href="/isdalat" className="viewBtn">        {t.view_button}
      </a>
    </section>
  );
}