"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Shield,
  Wrench,
  Gauge,
  Palette,
  Crown,
} from "lucide-react";

/**
 * Crown Customs Wrapped — Vercel-safe build
 * Uses object-based motion props (NO Variants typing)
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
  theme: { bg: string; pill: string };
  stats?: Stat[];
  list?: { heading: string; items: string[] }[];
  highlight?: { label: string; value: string; note?: string };
};

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

export default function Page() {
  const slides: Slide[] = useMemo(
    () => [
      {
        id: "intro",
        title: "Crown Customs Wrapped",
        subtitle: "Your year in motion",
        icon: <Crown />,
        theme: {
          bg: "bg-gradient-to-br from-zinc-950 via-zinc-900 to-neutral-800",
          pill: "bg-white/10",
        },
        stats: [
          { label: "Vehicles Customized", value: "1,842" },
          { label: "Customers Served", value: "1,215" },
          { label: "Returning Customers", value: "38%" },
        ],
      },
      {
        id: "garage",
        title: "Your Garage",
        subtitle: "Exotics, luxury, and everyday",
        icon: <Sparkles />,
        theme: {
          bg: "bg-gradient-to-br from-indigo-950 via-purple-900 to-zinc-900",
          pill: "bg-white/10",
        },
        stats: [
          { label: "Teslas", value: "300" },
          { label: "Porsches", value: "12" },
          { label: "BMW / Audi / MB", value: "420" },
        ],
      },
      {
        id: "services",
        title: "Top Services",
        subtitle: "What customers came back for",
        icon: <Wrench />,
        theme: {
          bg: "bg-gradient-to-br from-emerald-950 via-teal-900 to-zinc-900",
          pill: "bg-white/10",
        },
        highlight: {
          label: "PPF Applied",
          value: "1,400 times",
        },
      },
      {
        id: "style",
        title: "Style Preferences",
        subtitle: "Aesthetic trends",
        icon: <Palette />,
        theme: {
          bg: "bg-gradient-to-br from-rose-950 via-orange-900 to-zinc-900",
          pill: "bg-white/10",
        },
        stats: [
          { label: "Hyper Black Wheels", value: "n" },
          { label: "Gloss Wraps", value: "41%" },
          { label: "Matte / Satin", value: "33%" },
        ],
      },
      {
        id: "wheels",
        title: "Wheel Culture",
        subtitle: "From curb rash to concours",
        icon: <Gauge />,
        theme: {
          bg: "bg-gradient-to-br from-zinc-950 via-slate-900 to-zinc-900",
          pill: "bg-white/10",
        },
        stats: [
          { label: "Wheels Refinished", value: "620" },
          { label: "Curb Rash Repairs", value: "410" },
        ],
      },
      {
        id: "outro",
        title: "Next Up",
        subtitle: "Let’s populate real stats",
        icon: <Crown />,
        theme: {
          bg: "bg-gradient-to-br from-black via-zinc-900 to-black",
          pill: "bg-white/10",
        },
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const total = slides.length;
  const active = slides[index];

  const go = (n: number) => {
    const next = clamp(n, 0, total - 1);
    setDir(next > index ? 1 : -1);
    setIndex(next);
  };

  const next = () => go(index + 1);
  const prev = () => go(index - 1);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index]);

  return (
    <div
      className={`min-h-[100svh] ${active.theme.bg} text-white overflow-hidden`}
      onClick={(e) => {
        const x = e.clientX;
        if (x < window.innerWidth * 0.33) prev();
        else next();
      }}
    >
      {/* Progress */}
      <div className="absolute top-4 left-4 right-4 z-20 flex gap-1">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded ${
              i <= index ? "bg-white/80" : "bg-white/20"
            }`}
          />
        ))}
      </div>

      {/* Slide */}
      <div className="flex items-center justify-center min-h-[100svh] px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{
              opacity: 0,
              x: dir === 1 ? 40 : -40,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 320,
                damping: 30,
              },
            }}
            exit={{
              opacity: 0,
              x: dir === 1 ? -40 : 40,
              scale: 0.98,
              transition: { duration: 0.2 },
            }}
            className="max-w-md w-full rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center ${active.theme.pill}`}
              >
                {active.icon}
              </div>
              <h1 className="text-2xl font-semibold">{active.title}</h1>
            </div>

            {active.subtitle && (
              <p className="text-white/70 mb-4">{active.subtitle}</p>
            )}

            {active.stats && (
              <div className="grid grid-cols-2 gap-3">
                {active.stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl bg-white/5 border border-white/10 p-3"
                  >
                    <div className="text-xs text-white/60">{s.label}</div>
                    <div className="text-xl font-semibold">{s.value}</div>
                  </div>
                ))}
              </div>
            )}

            {active.highlight && (
              <div className="mt-4 rounded-xl bg-white/5 border border-white/10 p-4">
                <div className="text-xs text-white/60">
                  {active.highlight.label}
                </div>
                <div className="text-3xl font-semibold">
                  {active.highlight.value}
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-between text-sm text-white/60">
              <span>Tap to continue</span>
              <span>
                {index + 1} / {total}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}