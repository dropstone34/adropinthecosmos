"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CosmosContributionProps {
  text: string;
  accentColor: string;
}

export default function CosmosContribution({ text, accentColor }: CosmosContributionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ marginTop: "12px" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "0",
          color: accentColor,
          fontSize: "11px",
          fontFamily: "var(--font-mono, monospace)",
          letterSpacing: "0.08em",
          opacity: 0.8,
          transition: "opacity 0.15s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}
      >
        <motion.span
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ display: "inline-block", fontSize: "10px" }}
        >
          ▶
        </motion.span>
        HOW IT SHAPED ME
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <p
              style={{
                marginTop: "10px",
                fontSize: "12px",
                lineHeight: "1.75",
                color: "rgba(255,255,255,0.55)",
                fontFamily: "var(--font-mono, monospace)",
                borderLeft: `2px solid ${accentColor}44`,
                paddingLeft: "12px",
              }}
            >
              {text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}