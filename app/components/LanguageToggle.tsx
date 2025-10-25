"use client";

export default function LanguageToggle() {
  function switchLanguage() {
    const current = document.documentElement.lang;
    const next = current === "en" ? "ar" : "en";
    document.documentElement.lang = next;
    localStorage.setItem("preferredLang", next);
    location.reload();
  }

  return (
    <button
      onClick={switchLanguage}
      style={{
        border: "none",
        background: "transparent",
        cursor: "pointer",
        fontSize: "1rem",
        color: "#36454F",
        padding: 0,
      }}
      title="Switch Language"
    >
      🌐
    </button>
  );
}