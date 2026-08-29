"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Mascot from "./Mascot";

const QUOTE = "Open your eyes and see what you can before they close forever";
const SUBTITLE = "a drop in the cosmos — achievements across inner and outer worlds";

export default function AchievementsHero() {
  const [displayedQuote, setDisplayedQuote] = useState("");
  const [quoteComplete, setQuoteComplete] = useState(false);

  // Typewriter effect for the quote
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < QUOTE.length) {
        setDisplayedQuote(QUOTE.slice(0, i + 1));
        i++;
      } else {
        setQuoteComplete(true);
        clearInterval(interval);
      }
    }, 38);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        textAlign: "center",
        padding: "60px 20px 48px",
        position: "relative",
      }}
    >
      {/* Background radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "300px",
          background:
            "radial-gradient(ellipse, rgba(124, 58, 237, 0.12) 0%, rgba(245, 158, 11, 0.06) 50%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Mascot */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ marginBottom: "28px", display: "inline-block" }}
        >
          <Mascot size={110} />
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            fontSize: "11px",
            fontFamily: "var(--font-mono, monospace)",
            letterSpacing: "0.2em",
            color: "var(--accent-drop, #7B68EE)",
            textTransform: "uppercase",
            marginBottom: "20px",
          }}
        >
          ◈ achievements · dropstone
        </motion.p>

        {/* Quote — typewriter */}
        <div
          style={{
            maxWidth: "680px",
            margin: "0 auto 20px",
            minHeight: "72px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(20px, 3.5vw, 36px)",
              fontFamily: "var(--font-mono, monospace)",
              fontWeight: 700,
              color: "var(--text-primary, #E8E8E8)",
              lineHeight: 1.3,
              letterSpacing: "-0.02em",
            }}
          >
            &ldquo;{displayedQuote}
            {!quoteComplete && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity }}
                style={{
                  display: "inline-block",
                  width: "2px",
                  height: "1em",
                  background: "var(--accent-drop, #7B68EE)",
                  marginLeft: "2px",
                  verticalAlign: "text-bottom",
                }}
              />
            )}
            {quoteComplete && <>&rdquo;</>}
          </h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: quoteComplete ? 1 : 0, y: quoteComplete ? 0 : 8 }}
          transition={{ duration: 0.5 }}
          style={{
            fontSize: "13px",
            fontFamily: "var(--font-mono, monospace)",
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.04em",
            marginBottom: "32px",
          }}
        >
          {SUBTITLE}
        </motion.p>

        {/* Cosmos legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: quoteComplete ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "24px",
            flexWrap: "wrap",
          }}
        >
          {[
            { label: "🧠 Inner Cosmos", desc: "mind, discipline, craft", color: "#7c3aed" },
            { label: "🌍 Outer Cosmos", desc: "body, world, presence", color: "#f59e0b" },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                background: `${item.color}12`,
                border: `1px solid ${item.color}30`,
                borderRadius: "20px",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontFamily: "var(--font-mono, monospace)",
                  color: item.color,
                  fontWeight: 600,
                }}
              >
                {item.label}
              </span>
              <span
                style={{
                  fontSize: "11px",
                  fontFamily: "var(--font-mono, monospace)",
                  color: "rgba(255,255,255,0.3)",
                }}
              >
                — {item.desc}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}