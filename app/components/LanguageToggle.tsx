"use client";
import { useEffect, useState } from "react";

export default function LanguageToggle() {
  const [lang, setLang] = useState("en");

  // Read saved preference once when component mounts
  useEffect(() => {
    const saved = localStorage.getItem("preferredLang") || "en";
    document.documentElement.lang = saved;
    setLang(saved);
  }, []);

  const switchLanguage = () => {
    const next = lang === "en" ? "ar" : "en";
    localStorage.setItem("preferredLang", next);
    document.documentElement.lang = next;
    setLang(next);
    location.reload(); // reload so that all texts use the new language
  };

  return (
    <button
      onClick={switchLanguage}
      style={{
        border: "none",
        background: "transparent",
        cursor: "pointer",
        fontSize: ".9rem",
        color: "#36454F",
        padding: "0 .3em",
        textTransform: "uppercase",
      }}
      title="Switch Language"
    >
      {lang === "en" ? "AR" : "EN"}
    </button>
  );
}