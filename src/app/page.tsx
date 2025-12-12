"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles, Shield, Wrench, Gauge, Palette, Crown } from "lucide-react";

/**
 * Crown Customs Wrapped — single-file demo
 * - Story-like slide progression (tap/click, arrows, swipe)
 * - Fun motion + progress pills
 * - Placeholder stats + mixed vehicle examples (exotics/luxury/everyday)
 *
 * Drop this into a Next.js App Router page (e.g. app/page.tsx) or a client component.
 */

type Stat = {
  label: string;
  value: string;
  helper?: string;
};

type Slide = {
  id: string;
  kicker?: string;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  theme: {
    bg: string; // tailwind gradient classes
    accent: string; // tailwind text class
    pill: string; // tailwind pill bg
  };
  stats?: Stat[];
  list?: { heading: string; items: string[] }[];
  highlight?: {
    label: string;
    value: string;
    note?: string;
  };
  footerNote?: string;
};

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

function formatKicker(i: number, total: number) {
  const num = String(i + 1).padStart(2, "0");
  return `${num} / ${String(total).padStart(2, "0")}`;
}

export default function CrownCustomsWrappedDemo() {
  const slides: Slide[] = useMemo(
    () => [
      {
        id: "intro",
        kicker: "Crown Customs",
        title: "Wrapped: Year in Motion",
        subtitle: "A story-style recap you can populate with real shop stats.",
        icon: <Crown className="h-7 w-7" />,
        theme: {
          bg: "bg-gradient-to-br from-zinc-950 via-zinc-900 to-neutral-800",
          accent: "text-white",
          pill: "bg-white/10",
        },
        stats: [
          { label: "Vehicles Customized", value: "1,842", helper: "(placeholder)" },
          { label: "Customers Served", value: "1,215", helper: "(placeholder)" },
          { label: "Returning Customers", value: "38%", helper: "(placeholder)" },
        ],
        footerNote: "Tap / click to advance • Swipe on mobile • Arrow keys on desktop",
      },
      {
        id: "garage",
        title: "Your Garage, By the Numbers",
        subtitle: "Exotics, luxury, and everyday — all dialed in.",
        icon: <Sparkles className="h-7 w-7" />,
        theme: {
          bg: "bg-gradient-to-br from-indigo-950 via-fuchsia-900 to-zinc-900",
          accent: "text-white",
          pill: "bg-white/10",
        },
        stats: [
          { label: "Teslas Customized", value: "300" },
          { label: "Porsches Customized", value: "12" },
          { label: "BMW / Audi / MB", value: "420" },
        ],
        list: [
          {
            heading: "Most-played builds",
            items: [
              "Tesla Model Y (PPF + Tint + Ceramic)",
              "Porsche 911 (Track-ready PPF + alignment)",
              "Mercedes G-Wagon (Full wrap + wheel finish)",
              "Toyota Camry (Tint + ceramic maintenance)",
            ],
          },
        ],
      },
      {
        id: "services",
        title: "Top Services on Repeat",
        subtitle: "What customers came back for — again and again.",
        icon: <Wrench className="h-7 w-7" />,
        theme: {
          bg: "bg-gradient-to-br from-emerald-950 via-teal-900 to-zinc-900",
          accent: "text-white",
          pill: "bg-white/10",
        },
        list: [
          {
            heading: "Top 5 services (ranked)",
            items: [
              "1) Paint Protection Film (PPF)",
              "2) Ceramic Coating",
              "3) Window Tint",
              "4) Wheel Repair + Refinish",
              "5) Wraps + Accents",
            ],
          },
        ],
        highlight: {
          label: "PPF Applied",
          value: "1,400 times",
          note: "(placeholder — swap with real count)",
        },
      },
      {
        id: "protection",
        title: "Protection Era",
        subtitle: "Keeping paint clean, glossy, and chip-resistant.",
        icon: <Shield className="h-7 w-7" />,
        theme: {
          bg: "bg-gradient-to-br from-sky-950 via-blue-900 to-zinc-900",
          accent: "text-white",
          pill: "bg-white/10",
        },
        stats: [
          { label: "Full Front PPF", value: "62%" },
          { label: "Full Body PPF", value: "14%" },
          { label: "Ceramic Top-Coats", value: "980" },
        ],
        list: [
          {
            heading: "Most protected rides",
            items: [
              "Rivian R1T (full front + ceramic)",
              "Lamborghini Huracán (full body stealth PPF)",
              "Audi RS6 (track pack + PPF)",
              "Honda Civic (front clip PPF)",
            ],
          },
        ],
      },
      {
        id: "style",
        title: "Finish & Style Preferences",
        subtitle: "Aesthetic trends that owned the year.",
        icon: <Palette className="h-7 w-7" />,
        theme: {
          bg: "bg-gradient-to-br from-rose-950 via-orange-900 to-zinc-900",
          accent: "text-white",
          pill: "bg-white/10",
        },
        stats: [
          { label: "Hyper Black Wheels", value: "n", helper: "(placeholder)" },
          { label: "Gloss Wraps", value: "41%" },
          { label: "Satin / Matte", value: "33%" },
        ],
        list: [
          {
            heading: "Most requested looks",
            items: [
              "Hyper Black wheel finish",
              "Smoked tail lights + tint to match",
              "Satin gray + black accents",
              "OEM+ clean (no badges, just details)",
            ],
          },
        ],
        highlight: {
          label: "Top Finish",
          value: "Hyper Black",
          note: "Swap with your actual #1 finish",
        },
      },
      {
        id: "wheelculture",
        title: "Wheel Culture",
        subtitle: "From curb rash to concours-ready.",
        icon: <Gauge className="h-7 w-7" />,
        theme: {
          bg: "bg-gradient-to-br from-zinc-950 via-slate-900 to-zinc-900",
          accent: "text-white",
          pill: "bg-white/10",
        },
        stats: [
          { label: "Wheels Refinished", value: "620" },
          { label: "Repairs (Curb Rash)", value: "410" },
          { label: "Custom Colors Mixed", value: "58" },
        ],
        list: [
          {
            heading: "Best-of wheel moments",
            items: [
              "Porsche Turbo S — factory match refinish",
              "Range Rover — gloss black + ceramic",
              "C8 Corvette — hyper black + caliper detail",
              "Subaru WRX — bronze refinish + tire mount",
            ],
          },
        ],
      },
      {
        id: "extremes",
        title: "The Extremes",
        subtitle: "Quirky stats that make it feel like Wrapped.",
        icon: <Sparkles className="h-7 w-7" />,
        theme: {
          bg: "bg-gradient-to-br from-violet-950 via-purple-900 to-zinc-900",
          accent: "text-white",
          pill: "bg-white/10",
        },
        list: [
          {
            heading: "Fun contrasts",
            items: [
              "Fastest turnaround: 2.5 hours (tint)",
              "Longest build: 9 days (full body wrap + PPF)",
              "Farthest customer drive: 312 miles",
              "Wildest combo: stealth PPF + neon calipers",
            ],
          },
        ],
        footerNote: "Replace these with your real shop superlatives.",
      },
      {
        id: "community",
        title: "Built with the Community",
        subtitle: "The referrals, repeats, and love that keep the shop moving.",
        icon: <Crown className="h-7 w-7" />,
        theme: {
          bg: "bg-gradient-to-br from-amber-950 via-yellow-900 to-zinc-900",
          accent: "text-white",
          pill: "bg-white/10",
        },
        stats: [
          { label: "Referral Builds", value: "n", helper: "(placeholder)" },
          { label: "Repeat Visits", value: "n", helper: "(placeholder)" },
          { label: "5★ Reviews", value: "n", helper: "(placeholder)" },
        ],
        list: [
          {
            heading: "Customer shoutouts (examples)",
            items: [
              "“Saved my wheels — looked brand new.”",
              "“PPF install was flawless.”",
              "“My daily looks better than ever.”",
            ],
          },
        ],
      },
      {
        id: "outro",
        kicker: "Next up",
        title: "Let’s Populate the Real Stats",
        subtitle: "This page is the template. We just need your numbers.",
        icon: <Sparkles className="h-7 w-7" />,
        theme: {
          bg: "bg-gradient-to-br from-zinc-950 via-zinc-900 to-neutral-800",
          accent: "text-white",
          pill: "bg-white/10",
        },
        list: [
          {
            heading: "Data to gather",
            items: [
              "# vehicles by make/model",
              "# installs by service type",
              "Top finishes/colors",
              "Fastest/longest builds",
              "Referral + repeat rate",
            ],
          },
        ],
        footerNote: "Add your logo, swap gradients, and export as a shareable link.",
      },
    ],
    []
  );

  const total = slides.length;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const goTo = useCallback(
    (next: number) => {
      const clamped = clamp(next, 0, total - 1);
      setDirection(clamped > index ? 1 : -1);
      setIndex(clamped);
    },
    [index, total]
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Home") goTo(0);
      if (e.key === "End") goTo(total - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, goTo, total]);

  // Tap/click to advance (left third goes back)
  const onTapAdvance = useCallback(
    (e: React.MouseEvent) => {
      const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
      const x = e.clientX - rect.left;
      if (x < rect.width * 0.33) prev();
      else next();
    },
    [next, prev]
  );

  const active = slides[index];

  // Motion variants
  const variants = {
    enter: (dir: 1 | -1) => ({
      x: dir === 1 ? 40 : -40,
      opacity: 0,
      filter: "blur(8px)",
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      transition: { type: "spring", stiffness: 320, damping: 30 },
    },
    exit: (dir: 1 | -1) => ({
      x: dir === 1 ? -40 : 40,
      opacity: 0,
      filter: "blur(8px)",
      scale: 0.98,
      transition: { duration: 0.18 },
    }),
  };

  return (
    <div
      ref={containerRef}
      className={`min-h-[100svh] ${active.theme.bg} text-white relative overflow-hidden`}
    >
      {/* Ambient animated glow */}
      <motion.div
        aria-hidden
        className="absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full bg-white/10 blur-3xl"
        animate={{
          x: [0, 30, -10, 0],
          y: [0, 20, 40, 0],
          scale: [1, 1.08, 0.98, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-48 -right-48 h-[520px] w-[520px] rounded-full bg-white/10 blur-3xl"
        animate={{
          x: [0, -20, 10, 0],
          y: [0, -20, -40, 0],
          scale: [1, 0.96, 1.06, 1],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Top progress */}
      <div className="absolute top-0 left-0 right-0 z-20 px-4 pt-4">
        <div className="flex gap-1.5">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full ${
                i <= index ? "bg-white/80" : "bg-white/20"
              }`}
            />
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-xs text-white/70">
            {formatKicker(index, total)}
            {active.kicker ? ` • ${active.kicker}` : ""}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              className="rounded-full bg-white/10 hover:bg-white/15 active:bg-white/20 transition px-3 py-1.5 text-xs flex items-center gap-1"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-4 w-4" />
              Prev
            </button>
            <button
              onClick={next}
              className="rounded-full bg-white/10 hover:bg-white/15 active:bg-white/20 transition px-3 py-1.5 text-xs flex items-center gap-1"
              aria-label="Next slide"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Click layer for IG-style tapping */}
      <div
        className="absolute inset-0 z-10"
        onClick={onTapAdvance}
        role="button"
        tabIndex={0}
        aria-label="Tap to advance (left side goes back)"
      />

      {/* Slide content */}
      <div className="relative z-20 flex min-h-[100svh] items-center justify-center px-5 py-16">
        <div className="w-full max-w-xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) next();
                if (info.offset.x > 60) prev();
              }}
              className="rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl p-6 sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-white/80 border border-white/10 bg-white/5">
                    <span className="inline-flex items-center gap-2">
                      <span className={`inline-flex items-center justify-center h-6 w-6 rounded-full ${active.theme.pill}`}>
                        <span className="text-white">{active.icon}</span>
                      </span>
                      Crown Customs Wrapped
                    </span>
                  </div>
                  <h1 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight">
                    {active.title}
                  </h1>
                  {active.subtitle && (
                    <p className="mt-2 text-white/75 text-base sm:text-lg leading-relaxed">
                      {active.subtitle}
                    </p>
                  )}
                </div>
              </div>

              {active.stats && (
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {active.stats.map((s) => (
                    <motion.div
                      key={s.label}
                      whileHover={{ y: -2 }}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <div className="text-xs text-white/70">{s.label}</div>
                      <div className="mt-1 text-2xl font-semibold">{s.value}</div>
                      {s.helper && <div className="mt-1 text-xs text-white/55">{s.helper}</div>}
                    </motion.div>
                  ))}
                </div>
              )}

              {active.highlight && (
                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="text-xs text-white/70">{active.highlight.label}</div>
                  <div className="mt-1 text-3xl sm:text-4xl font-semibold">{active.highlight.value}</div>
                  {active.highlight.note && (
                    <div className="mt-2 text-sm text-white/65">{active.highlight.note}</div>
                  )}
                </div>
              )}

              {active.list && (
                <div className="mt-6 space-y-4">
                  {active.list.map((block) => (
                    <div key={block.heading} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                      <div className="text-sm font-medium text-white/85">{block.heading}</div>
                      <ul className="mt-3 space-y-2">
                        {block.items.map((it) => (
                          <li key={it} className="text-white/75 text-sm leading-relaxed flex gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/60" />
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {active.footerNote && (
                <div className="mt-6 text-xs text-white/60">{active.footerNote}</div>
              )}

              <div className="mt-7 flex items-center justify-between">
                <div className="text-xs text-white/55">
                  Tip: replace placeholders with metrics from your POS/CRM/job tracking.
                </div>
                <div className="flex items-center gap-2">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={prev}
                    className="rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition px-4 py-2 text-sm"
                  >
                    Back
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={next}
                    className="rounded-full border border-white/10 bg-white/10 hover:bg-white/15 transition px-4 py-2 text-sm"
                  >
                    Next
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom small “category chips” (purely vibes) */}
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {[
              { label: "Exotics", icon: <Sparkles className="h-4 w-4" /> },
              { label: "Luxury", icon: <Crown className="h-4 w-4" /> },
              { label: "Everyday", icon: <Wrench className="h-4 w-4" /> },
              { label: "Protection", icon: <Shield className="h-4 w-4" /> },
            ].map((c) => (
              <div
                key={c.label}
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs text-white/70 border border-white/10 bg-white/5"
              >
                {c.icon}
                {c.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Corner watermark */}
      <div className="absolute bottom-4 right-4 z-20 text-[11px] text-white/45">
        Template • Populate with real Crown Customs stats
      </div>
    </div>
  );
}
