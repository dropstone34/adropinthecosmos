"use client";

import { motion } from "framer-motion";
import { CosmosType } from "@/data/achievements";

type FilterValue = "all" | CosmosType;

interface CosmosToggleProps {
  value: FilterValue;
  onChange: (v: FilterValue) => void;
}

const OPTIONS: { value: FilterValue; label: string }[] = [
  { value: "all", label: "All" },
  { value: "inner", label: "🧠 Inner" },
  { value: "outer", label: "🌍 Outer" },
];

export default function CosmosToggle({ value, onChange }: CosmosToggleProps) {
  return (
    <div
      style={{
        display: "inline-flex",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "40px",
        padding: "4px",
        gap: "2px",
        position: "relative",
      }}
    >
      {OPTIONS.map((opt) => {
        const isActive = value === opt.value;
        const activeColor =
          opt.value === "inner"
            ? "#7c3aed"
            : opt.value === "outer"
            ? "#f59e0b"
            : "rgba(255,255,255,0.15)";

        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            style={{
              position: "relative",
              padding: "8px 20px",
              borderRadius: "36px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontSize: "13px",
              fontFamily: "var(--font-mono, monospace)",
              fontWeight: isActive ? 600 : 400,
              color: isActive ? "#fff" : "rgba(255,255,255,0.45)",
              transition: "color 0.2s ease",
              zIndex: 1,
              letterSpacing: "0.02em",
            }}
          >
            {isActive && (
              <motion.div
                layoutId="cosmos-pill"
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "36px",
                  background: activeColor,
                  zIndex: -1,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}