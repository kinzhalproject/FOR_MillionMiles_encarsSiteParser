"use client";

export function Footer() {
  return (
    <footer className="border-t border-gold/30 bg-primary">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="text-center md:text-left">
            <span className="text-xl font-heading font-bold tracking-[0.05em] uppercase text-white">
              Million <span className="text-gold">Miles</span>
            </span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-muted hover:text-gold transition-colors duration-300"
              aria-label="Instagram"
            >
              <svg
                width="20"
                height="20"
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
              className="text-muted hover:text-gold transition-colors duration-300"
              aria-label="Facebook"
            >
              <svg
                width="20"
                height="20"
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
              className="text-muted hover:text-gold transition-colors duration-300"
              aria-label="TikTok"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78 2.92 2.92 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.57 6.33 6.33 0 0 0 9.37 22a6.33 6.33 0 0 0 6.33-6.33v-7a8.16 8.16 0 0 0 4.29 1.2v-3.4a4.85 4.85 0 0 1-.4.22z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-muted hover:text-gold transition-colors duration-300"
              aria-label="YouTube"
            >
              <svg
                width="20"
                height="20"
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

          {/* Contact Info */}
          <div className="text-center md:text-right">
            <p className="text-sm text-muted">
              Sara Building Showroom no.1 — Al Quoz 3 — Dubai
            </p>
            <a
              href="/contacts"
              className="text-sm text-gold hover:text-gold-light transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-divider text-center">
          <p className="text-xs text-muted">
            &copy; 2026, MILLION MILES. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
