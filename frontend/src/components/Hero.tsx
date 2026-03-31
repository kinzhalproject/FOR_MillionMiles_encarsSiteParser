"use client";

import { useState, useEffect, useRef } from "react";

function useCountUp(end: number, duration: number = 2000): number {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return count;
}

function Counter({ end, label }: { end: number; label: string }) {
  const count = useCountUp(end);
  return (
    <div className="text-center">
      <div className="text-3xl sm:text-4xl font-heading font-bold text-gold">
        {count.toLocaleString()}
      </div>
      <div className="text-sm text-muted mt-1 uppercase tracking-[0.1em]">
        {label}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-primary z-10" />

      {/* Background image */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Content */}
      <div className="relative z-20 max-w-[1320px] mx-auto px-4 sm:px-6 py-32 text-center">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-bold uppercase tracking-[0.05em] leading-tight text-white">
          Premium service for the search
          <br />
          and delivery of <span className="text-gold">any vehicles</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-muted max-w-2xl mx-auto">
          To any destination worldwide, in the shortest possible time!
        </p>
        <div className="mt-10">
          <a
            href="/expert"
            className="btn-primary inline-block px-10 py-4 text-sm font-semibold"
          >
            Contact Us
          </a>
        </div>

        {/* Counters */}
        <div className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <Counter end={14523} label="Cars sold" />
          <Counter end={19} label="Experts" />
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-heading font-bold text-gold">
              from 2
            </div>
            <div className="text-sm text-muted mt-1 uppercase tracking-[0.1em]">
              Weeks car delivery
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
