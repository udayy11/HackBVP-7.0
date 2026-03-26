"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

// Typewriter cycles through an array of words
function TypewriterWords({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    if (paused) {
      const t = setTimeout(() => { setPaused(false); setDeleting(true); }, 1800);
      return () => clearTimeout(t);
    }
    if (!deleting && displayed === current) { setPaused(true); return; }
    if (deleting && displayed === "") { setDeleting(false); setIndex(i => i + 1); return; }
    const t = setTimeout(() => {
      setDisplayed(deleting ? current.slice(0, displayed.length - 1) : current.slice(0, displayed.length + 1));
    }, deleting ? 45 : 120);
    return () => clearTimeout(t);
  }, [displayed, deleting, paused, index, words]);

  return (
    <span style={{ color: "var(--primary)" }}>
      {displayed}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity }}
        className="inline-block w-0.5 h-[0.9em] align-middle ml-1"
        style={{ background: "var(--primary)" }}
      />
    </span>
  );
}

export function Hero() {
  const typewriterWords = ["Innovate.", "Build.", "Compete.", "Win."];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">

      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow blobs */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full blur-3xl opacity-10 animate-float pointer-events-none" style={{ background: "var(--primary)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full blur-3xl opacity-10 animate-float pointer-events-none" style={{ background: "var(--secondary)", animationDelay: "4s" }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-medium mb-8"
          style={{ borderColor: "var(--border)", color: "var(--accent)", background: "var(--card-bg)" }}
        >
          {/* TODO: Replace badge text — e.g. "Applications Open · Season 12" */}
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--primary)" }} />
          THEME???
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-4 leading-none"
        >
          {/* TODO: Replace with your hackathon / event name */}
          HackBVP 7.0
        </motion.h1>

        {/* Typewriter line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 h-14 flex items-center justify-center"
        >
          <TypewriterWords words={typewriterWords} />
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-4 leading-relaxed"
          style={{ color: "rgba(232,232,240,0.6)" }}
        >
          {/* TODO: Replace with your event tagline / one-liner description */}
          Tagline maybe?????
        </motion.p>

        {/* Date + location pill */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="inline-flex items-center gap-3 px-5 py-2 rounded-full text-sm font-medium mb-10 border"
          style={{ borderColor: "var(--border)", color: "var(--foreground)", background: "var(--card-bg)" }}
        >
          {/* TODO: Replace date and venue */}
          <span>📅 ?? APRIL – ?? APRIL, 2026</span>
          <span style={{ color: "var(--border)" }}>|</span>
          <span>📍 BVCOE/ Online</span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* TODO: Update href to your registration link */}
          <Link
            href="#register"
            className="px-8 py-3.5 rounded-full font-bold text-white text-base transition-all duration-200 hover:opacity-90 hover:scale-105 shadow-lg"
            style={{ background: "var(--primary)", boxShadow: "0 0 24px rgba(108,127,255,0.3)" }}
          >
            {/* TODO: Replace CTA label */}
            Tracks
          </Link>

          {/* TODO: Update href to your secondary page e.g. /events or /about */}
          <Link
            href="/events"
            className="px-8 py-3.5 rounded-full font-semibold text-base border transition-all duration-200 hover:bg-white/5"
            style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
          >
            {/* TODO: Replace CTA label */}
            Timeline
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
