import "./globals.css";
import { Cairo } from "next/font/google";
import LanguageToggle from "./components/LanguageToggle";

const cairo = Cairo({
  weight: ["300", "400", "700"],
  subsets: ["latin", "arabic"],
  display: "swap",
});

export const metadata = {
  title: "سُترة | Luxury Modesty Wear",
  description:
    "سُترة — abaya and isdal designs blending contemporary elegance with traditional comfort.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cairo.className}
        style={{
          backgroundColor: "#ffffff",
          color: "#36454F",
          fontFamily: "Cairo, sans-serif",
          margin: 0,
          padding: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* ===== HEADER (appears on all pages) ===== */}
        <header
          style={{
            borderBottom: "0.5px solid #C5A25360",
            padding: "1.2em 1.5em",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            position: "sticky",
            top: 0,
            background: "#fff",
            zIndex: 10,
          }}
        >
          {/* Brand */}
          <a href="/" style={{ textDecoration: "none", color: "#36454F" }}>
            <div style={{ textAlign: "center" }}>
              <h1 style={{ fontSize: "1.7rem", margin: 0 }}>سُترة</h1>
              <p style={{ margin: 0, fontSize: ".9rem" }}>
                Luxury Modesty Wear
              </p>
            </div>
          </a>

          {/* Navigation */}
          <nav
            style={{
              display: "flex",
              gap: "2em",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <a href="/" className="navLink">Home</a>
            <a href="/abayas" className="navLink">Abayas</a>
            <a href="/isdalat" className="navLink">Isdalat</a>
            <a href="/contact" className="navLink">Contact</a>
          </nav>

          {/* Icons */}
          <div style={{ display: "flex", gap: "1em", fontSize: "1.3rem" }}>
            <a href="/favorites" title="Favorites">♡</a>
            <a href="/cart" title="Cart">🛒</a>
            <a href="/profile" title="Profile">👤</a>
            <LanguageToggle />
          </div>
        </header>

        {/* ===== PAGE CONTENT ===== */}
        <main style={{ flexGrow: 1 }}>{children}</main>

        {/* ===== FOOTER ===== */}
        <footer
          style={{
            borderTop: "1px solid #C5A253",
            padding: "1em 0",
            fontSize: ".9rem",
            textAlign: "center",
          }}
        >
          <p style={{ margin: 0 }}>سُترة © 2025 — All Rights Reserved</p>
          <p style={{ margin: "0.3em 0 0" }}>
            Instagram | Facebook | WhatsApp
          </p>
        </footer>
      </body>
    </html>
  );
}