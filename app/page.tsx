"use client";
import { useState, useEffect } from "react";
import { t, Language } from "../lib/i18n";

type Theme = "light" | "dark" | "emerald";

export default function Home() {
  const [theme, setTheme] = useState<Theme>("light");
  const [lang, setLang] = useState<Language>("en");
  const [langOpen, setLangOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);

  useEffect(function () {
    const saved = localStorage.getItem("portal-theme") as Theme | null;
    if (saved && ["light", "dark", "emerald"].includes(saved)) {
      setTheme(saved);
    }
    const savedLang = localStorage.getItem("portal-lang") as Language | null;
    if (savedLang && ["en", "ar", "fa"].includes(savedLang)) {
      setLang(savedLang);
    }
  }, []);

  useEffect(function () {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portal-theme", theme);
  }, [theme]);

  useEffect(function () {
    document.documentElement.setAttribute("dir", lang === "en" ? "ltr" : "rtl");
    document.documentElement.setAttribute("lang", lang);
    localStorage.setItem("portal-lang", lang);
  }, [lang]);

  const isRtl = lang !== "en";

  const langLabels: Record<Language, string> = { en: "English", ar: "العربية", fa: "فارسی" };
  const themeLabels: { key: Theme; label: string }[] = [
    { key: "light", label: t("theme.light", lang) },
    { key: "dark", label: t("theme.dark", lang) },
    { key: "emerald", label: t("theme.emerald", lang) },
  ];

  function handleTheme(th: Theme) {
    setTheme(th);
    setThemeOpen(false);
  }

  function handleLang(l: Language) {
    setLang(l);
    setLangOpen(false);
  }

  const projects = [
    {
      title: t("mu.title", lang),
      desc: t("mu.desc", lang),
      url: "https://muslim-utility.vercel.app",
      gradient: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
      iconBg: "#2563eb",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
    },
    {
      title: t("qsd.title", lang),
      desc: t("qsd.desc", lang),
      url: "https://quran-studio.vercel.app",
      gradient: "linear-gradient(135deg, #10b981 0%, #0ea5e9 100%)",
      iconBg: "#10b981",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg-primary)" }}>
      {/* Navbar */}
      <nav
        className="flex items-center justify-between px-4 sm:px-8 py-3"
        style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border)" }}
        dir="ltr"
      >
        <div className="font-bold text-lg" style={{ color: "var(--text-primary)" }}>
          Muslim Utilities
        </div>
        <div className="flex items-center gap-2">
          {/* Theme dropdown */}
          <div className="relative">
            <button
              onClick={function () { setThemeOpen(!themeOpen); setLangOpen(false); }}
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
              aria-label="Change theme"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--text-primary)" }}>
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            </button>
            {themeOpen && (
              <div
                className="absolute right-0 top-11 rounded-xl py-1 z-50 min-w-[130px] overflow-hidden"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--card-shadow)" }}
              >
                {themeLabels.map(function (item) {
                  return (
                    <button
                      key={item.key}
                      onClick={function () { handleTheme(item.key); }}
                      className="w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-2"
                      style={{
                        color: theme === item.key ? "var(--accent)" : "var(--text-primary)",
                        background: theme === item.key ? "var(--bg-secondary)" : "transparent",
                        fontWeight: theme === item.key ? 600 : 400,
                      }}
                    >
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{
                          background: item.key === "light" ? "#f8fafc" : item.key === "dark" ? "#1e293b" : "#064e3b",
                          border: "2px solid " + (item.key === "light" ? "#cbd5e1" : item.key === "dark" ? "#475569" : "#10b981"),
                        }}
                      />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Language dropdown */}
          <div className="relative">
            <button
              onClick={function () { setLangOpen(!langOpen); setThemeOpen(false); }}
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
              aria-label="Change language"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--text-primary)" }}>
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </button>
            {langOpen && (
              <div
                className="absolute right-0 top-11 rounded-xl py-1 z-50 min-w-[130px] overflow-hidden"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--card-shadow)" }}
              >
                {(["en", "ar", "fa"] as Language[]).map(function (l) {
                  return (
                    <button
                      key={l}
                      onClick={function () { handleLang(l); }}
                      className="w-full text-left px-4 py-2.5 text-sm transition-colors"
                      style={{
                        color: lang === l ? "var(--accent)" : "var(--text-primary)",
                        background: lang === l ? "var(--bg-secondary)" : "transparent",
                        fontWeight: lang === l ? 600 : 400,
                      }}
                    >
                      {langLabels[l]}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Close dropdowns on click outside */}
      {(themeOpen || langOpen) && (
        <div className="fixed inset-0 z-40" onClick={function () { setThemeOpen(false); setLangOpen(false); }} />
      )}

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 py-16">
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
            {t("site.title", lang)}
          </h1>
          <p className="text-base sm:text-lg" style={{ color: "var(--text-secondary)" }}>
            {t("site.subtitle", lang)}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
          {projects.map(function (p, i) {
            return (
              <a
                key={i}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className={"rounded-2xl p-6 transition-all duration-300 group " + (i === 0 ? "animate-fade-in-up-delay" : "animate-fade-in-up-delay2")}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  boxShadow: "var(--card-shadow)",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={function (e) {
                  (e.currentTarget as HTMLElement).style.boxShadow = "var(--card-hover-shadow)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                }}
                onMouseLeave={function (e) {
                  (e.currentTarget as HTMLElement).style.boxShadow = "var(--card-shadow)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: p.gradient }}
                >
                  {p.icon}
                </div>
                <h2 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                  {p.title}
                </h2>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                  {p.desc}
                </p>
                <span
                  className="inline-flex items-center gap-1.5 text-sm font-medium"
                  style={{ color: "var(--accent)" }}
                >
                  {t("visit", lang)}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform group-hover:translate-x-1"
                    style={{ transform: isRtl ? "scaleX(-1)" : undefined }}
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </a>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer
        className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 px-4 py-6"
        style={{ borderTop: "1px solid var(--border)", background: "var(--bg-secondary)" }}
        dir="ltr"
      >
        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
          {t("footer.built", lang)}{" "}
          <span className="font-semibold" style={{ color: "var(--text-primary)" }}>Ahmad Zia Naziry</span>
        </span>
        <span className="hidden sm:inline" style={{ color: "var(--border)" }}>|</span>
        <a
          href="https://www.tiktok.com/@zia_naziry"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm font-medium transition-colors"
          style={{ color: "var(--accent)" }}
          onMouseEnter={function (e) { (e.currentTarget as HTMLElement).style.opacity = "0.8"; }}
          onMouseLeave={function (e) { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.69a8.28 8.28 0 0 0 4.76 1.51v-3.5a4.84 4.84 0 0 1-1-.01z" />
          </svg>
          @zia_naziry
        </a>
      </footer>
    </div>
  );
}
