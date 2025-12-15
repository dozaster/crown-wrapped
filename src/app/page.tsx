"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Shield,
  Wrench,
  Gauge,
  Palette,
  Crown,
  Share2,
} from "lucide-react";

/**
 * Crown Customs Wrapped — Vertical Scroll Edition (Spotify-like)
 * - Full-screen vertical sections
 * - CSS scroll-snap for “page” snapping
 * - Subtle on-view motion
 * - Share button per page (Web Share API + clipboard fallback)
 *
 * Paste into: src/app/page.tsx
 */

type Stat = {
  label: string;
  value: string;
  helper?: string;
};

type Slide = {
  id: string;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  theme: {
    bg: string; // tailwind gradient classes
    pill: string; // icon pill background
  };
  stats?: Stat[];
  list?: { heading: string; items: string[] }[];
  highlight?: { label: string; value: string; note?: string };
  footer?: string;
};

function safeTitle(s: string) {
  return s.replace(/\s+/g, " ").trim();
}

export default function Page() {
  const slides: Slide[] = useMemo(
    () => [
      {
        id: "intro",
        title: "Crown Customs Wrapped",
        subtitle: "Your year in motion — scroll to progress like Spotify Wrapped.",
        icon: <Crown className="h-5 w-5" />,
        theme: {
          bg: "bg-gradient-to-b from-zinc-950 via-zinc-900 to-neutral-900",
          pill: "bg-white/10",
        },
        stats: [
          { label: "Vehicles Customized", value: "1,842", helper: "(mock)" },
          { label: "Customers Served", value: "1,215", helper: "(mock)" },
          { label: "Returning Customers", value: "38%", helper: "(mock)" },
        ],
        footer: "Tip: replace mock stats with real numbers from your job tracking.",
      },
      {
        id: "garage",
        title: "Your Garage, By the Numbers",
        subtitle: "Exotics, luxury, and everyday — all dialed in.",
        icon: <Sparkles className="h-5 w-5" />,
        theme: {
          bg: "bg-gradient-to-b from-indigo-950 via-fuchsia-900 to-zinc-950",
          pill: "bg-white/10",
        },
        stats: [
          { label: "Teslas Customized", value: "300", helper: "(mock)" },
          { label: "Porsches Customized", value: "12", helper: "(mock)" },
          { label: "BMW/Audi/MB", value: "420", helper: "(mock)" },
        ],
        list: [
          {
            heading: "Most-played builds (examples)",
            items: [
              "Tesla Model Y — PPF + Tint + Ceramic",
              "Porsche 911 — Track-ready PPF package",
              "Mercedes G-Wagon — Wrap accents + wheel finish",
              "Toyota Camry — Tint + ceramic maintenance",
            ],
          },
        ],
      },
      {
        id: "services",
        title: "Top Services on Repeat",
        subtitle: "What customers came back for — again and again.",
        icon: <Wrench className="h-5 w-5" />,
        theme: {
          bg: "bg-gradient-to-b from-emerald-950 via-teal-900 to-zinc-950",
          pill: "bg-white/10",
        },
        list: [
          {
            heading: "Top services (ranked — mock)",
            items: [
              "1) Paint Protection Film (PPF)",
              "2) Window Tint",
              "3) Ceramic Coating",
              "4) Wheel Repair / Refinish",
              "5) Wraps + Accents",
            ],
          },
        ],
        highlight: {
          label: "PPF Applied",
          value: "1,400 installs",
          note: "(mock — swap with real count)",
        },
      },
      {
        id: "wraps",
        title: "Wraps Wrapped",
        subtitle: "Colors, vehicles, and materials that owned the year.",
        icon: <Palette className="h-5 w-5" />,
        theme: {
          bg: "bg-gradient-to-b from-rose-950 via-orange-900 to-zinc-950",
          pill: "bg-white/10",
        },
        stats: [
          { label: "Total Wrap Jobs", value: "265", helper: "(mock)" },
          { label: "Full Wraps", value: "61%", helper: "(mock)" },
          { label: "Accents / Partial", value: "39%", helper: "(mock)" },
        ],
        list: [
          {
            heading: "Most popular wrap colors (mock)",
            items: [
              "Satin Black",
              "Nardo Gray (Satin/Matte)",
              "Gloss White",
              "Satin Dark Gray",
              "Color-Shift (oil slick / teal-purple)",
            ],
          },
          {
            heading: "Most wrapped vehicle (mock)",
            items: ["Tesla Model Y (x44 wrap jobs)"],
          },
          {
            heading: "Top wrap manufacturer (mock)",
            items: ["3M (followed by Avery Dennison)"],
          },
        ],
        highlight: {
          label: "Trend of the year",
          value: "Satin + stealth aesthetics",
          note: "Pairing wraps with tint + blackout details.",
        },
      },
      {
        id: "protection",
        title: "Protection Era",
        subtitle: "Keeping paint clean, glossy, and chip-resistant.",
        icon: <Shield className="h-5 w-5" />,
        theme: {
          bg: "bg-gradient-to-b from-sky-950 via-blue-900 to-zinc-950",
          pill: "bg-white/10",
        },
        stats: [
          { label: "Full Front PPF", value: "62%", helper: "(mock)" },
          { label: "Full Body PPF", value: "14%", helper: "(mock)" },
          { label: "Ceramic Top-Coats", value: "980", helper: "(mock)" },
        ],
        list: [
          {
            heading: "Most protected rides (examples)",
            items: [
              "Rivian R1T — full front + ceramic",
              "Lamborghini Huracán — full body stealth PPF",
              "Audi RS6 — track pack + PPF",
              "Honda Civic — front clip PPF",
            ],
          },
        ],
      },
      {
        id: "wheels",
        title: "Wheel Culture",
        subtitle: "From curb rash to concours-ready.",
        icon: <Gauge className="h-5 w-5" />,
        theme: {
          bg: "bg-gradient-to-b from-zinc-950 via-slate-900 to-zinc-950",
          pill: "bg-white/10",
        },
        stats: [
          { label: "Wheels Refinished", value: "620", helper: "(mock)" },
          { label: "Curb Rash Repairs", value: "410", helper: "(mock)" },
          { label: "Hyper Black Wheels", value: "n", helper: "(placeholder)" },
        ],
        list: [
          {
            heading: "Best-of wheel moments (examples)",
            items: [
              "Porsche Turbo S — factory-match refinish",
              "Range Rover — gloss black + ceramic",
              "C8 Corvette — hyper black + caliper detail",
              "Subaru WRX — bronze refinish + tire mount",
            ],
          },
        ],
      },
      {
        id: "outro",
        title: "Next Up: Populate Real Stats",
        subtitle: "This is the template — now we plug in your actual numbers.",
        icon: <Crown className="h-5 w-5" />,
        theme: {
          bg: "bg-gradient-to-b from-black via-zinc-950 to-black",
          pill: "bg-white/10",
        },
        list: [
          {
            heading: "Data to gather",
            items: [
              "# vehicles by make/model",
              "# installs by service type",
              "Top finishes + wrap colors",
              "Top wrap manufacturer share",
              "Fastest/longest builds",
              "Referral + repeat rate",
            ],
          },
        ],
        footer: "Scroll back up and imagine these filled with your real shop metrics.",
      },
    ],
    []
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const shareSlide = useCallback((slide: Slide) => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const title = `Crown Customs Wrapped — ${safeTitle(slide.title)}`;
    const text = slide.subtitle
      ? `${slide.subtitle}\n\n${url}`
      : `Check out our year in review.\n\n${url}`;

    // Web Share API (mobile friendly)
    if (typeof navigator !== "undefined" && "share" in navigator) {
      (navigator as any)
        .share({ title, text, url })
        .catch(() => {
          // user cancelled share; ignore
        });
      return;
    }

    // Clipboard fallback
    const toCopy = `${title}\n${text}`;
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      navigator.clipboard
        .writeText(toCopy)
        .then(() => alert("Copied share text + link to clipboard."))
        .catch(() => alert("Could not copy. You can manually copy the URL."));
    } else {
      alert("Sharing not supported here. Copy the URL from your address bar.");
    }
  }, []);

  // Observe sections to update active index (progress UI)
  useEffect(() => {
    const els = sectionRefs.current.filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        // Pick the entry with the highest intersection ratio
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (!visible) return;
        const idx = Number((visible.target as HTMLElement).dataset.index);
        if (!Number.isNaN(idx)) setActiveIndex(idx);
      },
      {
        root: null,
        threshold: [0.35, 0.5, 0.65],
      }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [slides.length]);

  const scrollToIndex = useCallback((i: number) => {
    const el = sectionRefs.current[i];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="relative">
      {/* Sticky header (progress + quick nav) */}
      <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 pointer-events-none">
        <div className="mx-auto max-w-3xl">
          <div className="pointer-events-auto rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs text-white/70">
                {activeIndex + 1} / {slides.length}
              </div>
              <div className="flex-1 flex gap-1.5">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToIndex(i)}
                    className={`h-1 flex-1 rounded-full transition ${
                      i <= activeIndex ? "bg-white/80" : "bg-white/20"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
              <div className="text-xs text-white/70 hidden sm:block">
                Scroll • Snap • Share
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll container */}
      <main
        className="
          h-[100svh] overflow-y-auto
          snap-y snap-mandatory
          scroll-smooth
        "
      >
        {slides.map((slide, idx) => (
          <section
            key={slide.id}
            ref={(el) => {
              sectionRefs.current[idx] = el;
            }}
            data-index={idx}
            className={`snap-start min-h-[100svh] ${slide.theme.bg} text-white flex items-center justify-center px-5 py-16 relative overflow-hidden`}
          >
            {/* Soft ambient blobs */}
            <motion.div
              aria-hidden
              className="absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full bg-white/10 blur-3xl"
              animate={{
                x: [0, 28, -8, 0],
                y: [0, 18, 38, 0],
                scale: [1, 1.06, 0.98, 1],
              }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden
              className="absolute -bottom-48 -right-48 h-[520px] w-[520px] rounded-full bg-white/10 blur-3xl"
              animate={{
                x: [0, -18, 8, 0],
                y: [0, -18, -38, 0],
                scale: [1, 0.96, 1.06, 1],
              }}
              transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative z-10 w-full max-w-xl">
              {/* Card */}
              <motion.div
                initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: false, amount: 0.6 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 28,
                }}
                className="rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl p-6 sm:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-white/80 border border-white/10 bg-white/5">
                      <span
                        className={`inline-flex items-center justify-center h-7 w-7 rounded-full ${slide.theme.pill}`}
                      >
                        {slide.icon}
                      </span>
                      Crown Customs Wrapped
                    </div>

                    <h1 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight">
                      {slide.title}
                    </h1>

                    {slide.subtitle && (
                      <p className="mt-2 text-white/75 text-base sm:text-lg leading-relaxed">
                        {slide.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Share button per page */}
                  <button
                    onClick={() => shareSlide(slide)}
                    className="
                      shrink-0
                      inline-flex items-center gap-2
                      rounded-full
                      border border-white/10
                      bg-white/10 hover:bg-white/15 active:bg-white/20
                      transition
                      px-4 py-2
                      text-sm
                    "
                    aria-label={`Share ${slide.title}`}
                    title="Share"
                  >
                    <Share2 className="h-4 w-4" />
                    Share
                  </button>
                </div>

                {slide.stats && (
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {slide.stats.map((s) => (
                      <div
                        key={s.label}
                        className="rounded-2xl border border-white/10 bg-white/5 p-4"
                      >
                        <div className="text-xs text-white/70">{s.label}</div>
                        <div className="mt-1 text-2xl font-semibold">{s.value}</div>
                        {s.helper && (
                          <div className="mt-1 text-xs text-white/55">{s.helper}</div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {slide.highlight && (
                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
                    <div className="text-xs text-white/70">{slide.highlight.label}</div>
                    <div className="mt-1 text-3xl sm:text-4xl font-semibold">
                      {slide.highlight.value}
                    </div>
                    {slide.highlight.note && (
                      <div className="mt-2 text-sm text-white/65">{slide.highlight.note}</div>
                    )}
                  </div>
                )}

                {slide.list && (
                  <div className="mt-6 space-y-4">
                    {slide.list.map((block) => (
                      <div
                        key={block.heading}
                        className="rounded-2xl border border-white/10 bg-white/5 p-5"
                      >
                        <div className="text-sm font-medium text-white/85">
                          {block.heading}
                        </div>
                        <ul className="mt-3 space-y-2">
                          {block.items.map((it) => (
                            <li
                              key={it}
                              className="text-white/75 text-sm leading-relaxed flex gap-2"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/60" />
                              <span>{it}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {slide.footer && (
                  <div className="mt-6 text-xs text-white/60">{slide.footer}</div>
                )}

                {/* Small nav helpers */}
                <div className="mt-7 flex items-center justify-between">
                  <div className="text-xs text-white/55">
                    Scroll to the next page ↓
                  </div>
                  <div className="text-xs text-white/55">
                    Page {idx + 1} of {slides.length}
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        ))}
      </main>

      {/* Optional bottom-right watermark */}
      <div className="fixed bottom-4 right-4 z-50 text-[11px] text-white/45 pointer-events-none">
        Crown Customs Wrapped • Template
      </div>
    </div>
  );
}