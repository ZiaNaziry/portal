"use client";
import { useState, useEffect, useRef } from "react";
import { t, Language } from "../lib/i18n";

type Theme = "light" | "dark" | "emerald";

export default function Home() {
  const [theme, setTheme] = useState<Theme>("light");
  const [lang, setLang] = useState<Language>("en");
  const [langOpen, setLangOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const particlesRef = useRef<HTMLCanvasElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(function () {
    function handleClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
      if (themeRef.current && !themeRef.current.contains(e.target as Node)) {
        setThemeOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return function () { document.removeEventListener("mousedown", handleClick); };
  }, []);

  useEffect(function () {
    const saved = localStorage.getItem("portal-theme") as Theme | null;
    if (saved && ["light", "dark", "emerald"].indexOf(saved) !== -1) {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
    const savedLang = localStorage.getItem("portal-lang") as Language | null;
    if (savedLang && ["en", "ar", "fa"].indexOf(savedLang) !== -1) {
      setLang(savedLang);
      document.documentElement.setAttribute("dir", savedLang === "en" ? "ltr" : "rtl");
      document.documentElement.setAttribute("lang", savedLang);
    }
    setTimeout(function () { setMounted(true); }, 50);
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

  // Floating particles animation
  useEffect(function () {
    const canvas = particlesRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    const particles: { x: number; y: number; vx: number; vy: number; r: number; o: number }[] = [];

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2.5 + 1,
        o: Math.random() * 0.3 + 0.05,
      });
    }

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#2563eb";
      for (let j = 0; j < particles.length; j++) {
        const p = particles[j];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = accent;
        ctx.globalAlpha = p.o;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    }
    draw();

    return function () {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [theme]);

  const isRtl = lang !== "en";
  const langLabels: Record<Language, string> = { en: "English", ar: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629", fa: "\u0641\u0627\u0631\u0633\u06CC" };
  const themeLabels: { key: Theme; label: string; color: string }[] = [
    { key: "light", label: t("theme.light", lang), color: "#f8fafc" },
    { key: "dark", label: t("theme.dark", lang), color: "#1e293b" },
    { key: "emerald", label: t("theme.emerald", lang), color: "#064e3b" },
  ];
  const themeBorders: Record<string, string> = { light: "#cbd5e1", dark: "#475569", emerald: "#10b981" };

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
      hoverGlow: "rgba(37, 99, 235, 0.15)",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
    },
    {
      title: t("qsd.title", lang),
      desc: t("qsd.desc", lang),
      url: "https://quran-sm-download.vercel.app",
      gradient: "linear-gradient(135deg, #10b981 0%, #0ea5e9 100%)",
      hoverGlow: "rgba(16, 185, 129, 0.15)",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ background: "var(--bg-primary)" }}>
      {/* Floating particles */}
      <canvas
        ref={particlesRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 0.6 }}
      />

      {/* Gradient orbs in background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            width: 400, height: 400,
            top: "-10%", left: "-5%",
            background: "var(--accent)",
            opacity: 0.07,
            animation: "float1 20s ease-in-out infinite",
          }}
        />
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            width: 350, height: 350,
            bottom: "-10%", right: "-5%",
            background: "var(--accent)",
            opacity: 0.05,
            animation: "float2 25s ease-in-out infinite",
          }}
        />
      </div>

      {/* Navbar */}
      <nav
        className="flex items-center justify-between px-4 sm:px-8 py-3 relative z-50"
        style={{
          background: "var(--bg-secondary)",
          borderBottom: "1px solid var(--border)",
          backdropFilter: "blur(12px)",
        }}
        dir="ltr"
      >
        <div
          className="font-bold text-lg"
          style={{
            color: "var(--text-primary)",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateX(0)" : "translateX(-20px)",
            transition: "all 0.5s ease",
          }}
        >
          Muslim Utilities
        </div>
        <div
          className="flex items-center gap-2"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateX(0)" : "translateX(20px)",
            transition: "all 0.5s ease 0.1s",
          }}
        >
          {/* Language dropdown */}
          <div className="relative" ref={langRef}>
            <button
              onClick={function () { setLangOpen(!langOpen); setThemeOpen(false); }}
              className="h-9 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all hover:scale-105 text-xs font-semibold"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}
              aria-label="Change language"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              {langLabels[lang]}
            </button>
            {langOpen && (
              <div
                className="absolute right-0 top-11 rounded-xl py-1 min-w-[130px] overflow-hidden animate-dropdown"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "0 10px 40px rgba(0,0,0,0.15)" }}
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

          {/* Theme dropdown */}
          <div className="relative" ref={themeRef}>
            <button
              onClick={function () { setThemeOpen(!themeOpen); setLangOpen(false); }}
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
              aria-label="Change theme"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-secondary)" }}>
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            </button>
            {themeOpen && (
              <div
                className="absolute right-0 top-11 rounded-xl py-1 min-w-[130px] overflow-hidden animate-dropdown"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "0 10px 40px rgba(0,0,0,0.15)" }}
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
                          background: item.color,
                          border: "2px solid " + (themeBorders[item.key] || "#cbd5e1"),
                        }}
                      />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 py-16 relative z-10">
        {/* Heading */}
        <div className="text-center mb-14">
          <h1
            className="text-4xl sm:text-5xl font-extrabold mb-4"
            style={{
              color: "var(--text-primary)",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
            }}
          >
            {t("site.title", lang)}
          </h1>
          <p
            className="text-lg sm:text-xl max-w-md mx-auto"
            style={{
              color: "var(--text-secondary)",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.35s",
            }}
          >
            {t("site.subtitle", lang)}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-2xl">
          {projects.map(function (p, i) {
            return (
              <a
                key={i}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl p-7 transition-all duration-300 group relative overflow-hidden"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  boxShadow: "var(--card-shadow)",
                  textDecoration: "none",
                  cursor: "pointer",
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0) scale(1)" : "translateY(40px) scale(0.95)",
                  transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) " + (0.4 + i * 0.15) + "s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) " + (0.4 + i * 0.15) + "s, box-shadow 0.3s ease, border-color 0.3s ease",
                }}
                onMouseEnter={function (e) {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = "0 20px 60px " + p.hoverGlow + ", var(--card-shadow)";
                  el.style.transform = "translateY(-6px) scale(1.02)";
                  el.style.borderColor = "var(--accent)";
                }}
                onMouseLeave={function (e) {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = "var(--card-shadow)";
                  el.style.transform = "translateY(0) scale(1)";
                  el.style.borderColor = "var(--border)";
                }}
              >
                {/* Gradient shine on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "linear-gradient(135deg, transparent 0%, " + p.hoverGlow + " 50%, transparent 100%)",
                  }}
                />
                <div className="relative z-10">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                    style={{ background: p.gradient, boxShadow: "0 4px 15px " + p.hoverGlow }}
                  >
                    {p.icon}
                  </div>
                  <h2 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                    {p.title}
                  </h2>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-secondary)" }}>
                    {p.desc}
                  </p>
                  <span
                    className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 group-hover:gap-3"
                    style={{ color: "var(--accent)" }}
                  >
                    {t("visit", lang)}
                    <svg
                      width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                      strokeLinecap="round" strokeLinejoin="round"
                      className="transition-transform duration-200 group-hover:translate-x-1"
                      style={{ transform: isRtl ? "scaleX(-1)" : undefined }}
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer
        className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 px-4 py-6 relative z-10"
        style={{
          borderTop: "1px solid var(--border)",
          background: "var(--bg-secondary)",
          backdropFilter: "blur(12px)",
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.6s ease 0.8s",
        }}
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
          className="flex items-center gap-1.5 text-sm font-medium transition-all duration-200 hover:scale-105"
          style={{ color: "var(--accent)" }}
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
