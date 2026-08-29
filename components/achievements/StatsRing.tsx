"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

interface StatsRingProps {
  label: string;
  value: string;
  current?: number;
  max?: number;
  color: string;
  size?: number;
}

export default function StatsRing({
  label,
  value,
  current,
  max,
  color,
  size = 72,
}: StatsRingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const percentage = current !== undefined && max !== undefined ? current / max : null;

  const radius = (size - 10) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = percentage !== null ? circumference * (1 - percentage) : circumference;

  const progress = useMotionValue(circumference);
  const springProgress = useSpring(progress, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (isInView && percentage !== null) {
      progress.set(strokeDashoffset);
    }
  }, [isInView, strokeDashoffset, progress, percentage]);

  if (percentage === null) {
    // Simple badge for non-numeric stats
    return (
      <div
        ref={ref}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
          minWidth: "64px",
        }}
      >
        <div
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            border: `2px solid ${color}44`,
            background: `${color}11`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "11px",
            fontFamily: "var(--font-mono, monospace)",
            color: color,
            fontWeight: 700,
            textAlign: "center",
            padding: "4px",
            lineHeight: 1.2,
          }}
        >
          {value}
        </div>
        <span
          style={{
            fontSize: "10px",
            color: "rgba(255,255,255,0.4)",
            fontFamily: "var(--font-mono, monospace)",
            letterSpacing: "0.05em",
            textAlign: "center",
          }}
        >
          {label}
        </span>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "4px",
        minWidth: "64px",
      }}
    >
      <div style={{ position: "relative", width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={`${color}22`}
            strokeWidth="5"
          />
          {/* Progress */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            style={{ strokeDashoffset: springProgress }}
          />
        </svg>
        {/* Center value */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "10px",
            fontFamily: "var(--font-mono, monospace)",
            color: color,
            fontWeight: 700,
          }}
        >
          {value}
        </div>
      </div>
      <span
        style={{
          fontSize: "10px",
          color: "rgba(255,255,255,0.4)",
          fontFamily: "var(--font-mono, monospace)",
          letterSpacing: "0.05em",
          textAlign: "center",
        }}
      >
        {label}
      </span>
    </div>
  );
}