import "./globals.css";

export const metadata = {
  title: "سُترة | Luxury Modesty Wear",
  description: "Elegant abayas and isdalat by سُترة",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
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
        {/* HEADER (visible on all pages) */}
        <header
          style={{
            borderBottom: "1px solid #C5A253",
            padding: "1.2em 2em",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {/* Left — brand */}
          <div style={{ textAlign: "center" }}>
            <a href="/" style={{ textDecoration: "none", color: "#36454F" }}>
              <h1 style={{ fontSize: "1.7rem", margin: 0 }}>سُترة</h1>
              <p style={{ margin: 0, fontSize: ".9rem" }}>Luxury Modesty Wear</p>
            </a>
          </div>

          {/* Center — nav links */}
          <nav
            style={{
              display: "flex",
              gap: "2em",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <a href="/" style={{ textDecoration: "none", color: "#36454F" }}>Home</a>
            <a href="/abayas" style={{ textDecoration: "none", color: "#36454F" }}>Abayas</a>
            <a href="/isdalat" style={{ textDecoration: "none", color: "#36454F" }}>Isdalat</a>
            <a href="/contact" style={{ textDecoration: "none", color: "#36454F" }}>Contact</a>
          </nav>

          {/* Right — icons */}
          <div style={{ display: "flex", gap: "1em", fontSize: "1.3rem" }}>
            <a href="/favorites" style={{ textDecoration: "none", color: "#36454F" }}>♡</a>
            <a href="/cart" style={{ textDecoration: "none", color: "#36454F" }}>🛒</a>
            <a href="/profile" style={{ textDecoration: "none", color: "#36454F" }}>👤</a>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flexGrow: 1 }}>{children}</main>

        {/* FOOTER (visible on all pages) */}
        <footer
          style={{
            borderTop: "1px solid #C5A253",
            padding: "1em 0",
            fontSize: ".9rem",
            textAlign: "center",
          }}
        >
          © 2025 سُترة / SUTRA — All rights reserved.
        </footer>
      </body>
    </html>
  );
}