"use client";

import { useState, useEffect } from "react";

const services = [
  { name: "Find a Car", href: "/find-car" },
  { name: "Sell a Car", href: "/sell-car" },
  { name: "Get Insurance", href: "/insurance" },
  { name: "Buy on Lease", href: "/lease-a-car" },
  { name: "Import & Export", href: "/import-and-export" },
  { name: "Logistics", href: "/logistic" },
  { name: "Registration", href: "/registration" },
  { name: "Service & Detailing", href: "/detailing" },
];

const aboutLinks = [
  { name: "Philosophy", href: "/philosophy" },
  { name: "Career", href: "/career" },
  { name: "Become a Dealer", href: "/dealer" },
  { name: "Contacts", href: "/contacts" },
];

const languages = [
  { code: "EN", flag: "🇬🇧" },
  { code: "RU", flag: "🇷🇺" },
  { code: "AR", flag: "🇦🇪" },
  { code: "ZH", flag: "🇨🇳" },
];

const currencies = ["USD", "EUR", "RUB", "AED", "JPY", "KRW"];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [currOpen, setCurrOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [selectedCurr, setSelectedCurr] = useState("USD");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = () => {
      setLangOpen(false);
      setCurrOpen(false);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 border-b border-divider ${
          scrolled ? "bg-black/95 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <span className="text-xl font-heading font-bold tracking-[0.05em] uppercase text-white">
              Million <span className="text-gold">Miles</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <a
              href="#catalog"
              className="text-sm uppercase tracking-[0.1em] text-white hover:text-gold transition-colors duration-300"
            >
              Cars
            </a>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="text-sm uppercase tracking-[0.1em] text-white hover:text-gold transition-colors duration-300 flex items-center gap-1">
                Services
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="currentColor"
                >
                  <path d="M2 4l3 3 3-3" />
                </svg>
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-card border border-divider shadow-xl py-2">
                  {services.map((s) => (
                    <a
                      key={s.href}
                      href={s.href}
                      className="block px-4 py-2.5 text-sm text-white hover:text-gold hover:bg-[#1a1a1a] transition-colors"
                    >
                      {s.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a
              href="/expert"
              className="text-sm uppercase tracking-[0.1em] text-white hover:text-gold transition-colors duration-300"
            >
              Ask an Expert
            </a>

            {/* About Us Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setAboutOpen(true)}
              onMouseLeave={() => setAboutOpen(false)}
            >
              <button className="text-sm uppercase tracking-[0.1em] text-white hover:text-gold transition-colors duration-300 flex items-center gap-1">
                About Us
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="currentColor"
                >
                  <path d="M2 4l3 3 3-3" />
                </svg>
              </button>
              {aboutOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-divider shadow-xl py-2">
                  {aboutLinks.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      className="block px-4 py-2.5 text-sm text-white hover:text-gold hover:bg-[#1a1a1a] transition-colors"
                    >
                      {l.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => {
                  setLangOpen(!langOpen);
                  setCurrOpen(false);
                }}
                className="flex items-center gap-1.5 text-sm text-white hover:text-gold transition-colors"
              >
                <span>{selectedLang.flag}</span>
                <span>{selectedLang.code}</span>
              </button>
              {langOpen && (
                <div className="absolute top-full right-0 mt-2 w-32 bg-card border border-divider shadow-xl py-1">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setSelectedLang(l);
                        setLangOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-white hover:text-gold hover:bg-[#1a1a1a] transition-colors"
                    >
                      <span>{l.flag}</span> {l.code}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Currency */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => {
                  setCurrOpen(!currOpen);
                  setLangOpen(false);
                }}
                className="text-sm text-white hover:text-gold transition-colors"
              >
                {selectedCurr}
              </button>
              {currOpen && (
                <div className="absolute top-full right-0 mt-2 w-24 bg-card border border-divider shadow-xl py-1">
                  {currencies.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setSelectedCurr(c);
                        setCurrOpen(false);
                      }}
                      className="w-full px-3 py-2 text-sm text-white hover:text-gold hover:bg-[#1a1a1a] transition-colors text-left"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 ml-2 pl-4 border-l border-divider">
              <a
                href="#"
                className="text-muted hover:text-gold transition-colors"
                aria-label="Instagram"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="#"
                className="text-muted hover:text-gold transition-colors"
                aria-label="Facebook"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-muted hover:text-gold transition-colors"
                aria-label="TikTok"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78 2.92 2.92 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.57 6.33 6.33 0 0 0 9.37 22a6.33 6.33 0 0 0 6.33-6.33v-7a8.16 8.16 0 0 0 4.29 1.2v-3.4a4.85 4.85 0 0 1-.4.22z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-muted hover:text-gold transition-colors"
                aria-label="YouTube"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
              </a>
            </div>
          </div>

          {/* Mobile Burger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white p-2"
            aria-label="Menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md pt-[72px] overflow-y-auto lg:hidden">
          <nav className="flex flex-col px-6 py-8 gap-6">
            <a
              href="#catalog"
              className="text-lg uppercase tracking-[0.1em] text-white hover:text-gold transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Cars
            </a>

            <div>
              <p className="text-lg uppercase tracking-[0.1em] text-gold mb-3">
                Services
              </p>
              {services.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  className="block py-2 text-white/80 hover:text-gold transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {s.name}
                </a>
              ))}
            </div>

            <a
              href="/expert"
              className="text-lg uppercase tracking-[0.1em] text-white hover:text-gold transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Ask an Expert
            </a>

            <div>
              <p className="text-lg uppercase tracking-[0.1em] text-gold mb-3">
                About Us
              </p>
              {aboutLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="block py-2 text-white/80 hover:text-gold transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {l.name}
                </a>
              ))}
            </div>

            <div className="flex gap-4 pt-4 border-t border-divider">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setSelectedLang(l)}
                  className={`text-sm ${
                    selectedLang.code === l.code
                      ? "text-gold"
                      : "text-white/60"
                  }`}
                >
                  {l.flag} {l.code}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {currencies.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCurr(c)}
                  className={`text-sm ${
                    selectedCurr === c ? "text-gold" : "text-white/60"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
