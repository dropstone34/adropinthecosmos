"use client";

import { motion } from "framer-motion";

interface MascotProps {
  leanDirection?: "left" | "right" | "none";
  size?: number;
}

export default function Mascot({ leanDirection = "none", size = 120 }: MascotProps) {
  const leanAngle = leanDirection === "left" ? -18 : leanDirection === "right" ? 18 : 0;

  return (
    <motion.div
      style={{ display: "inline-block", position: "relative" }}
      animate={{
        y: [0, -10, 0],
        rotate: leanAngle,
      }}
      transition={{
        y: {
          duration: 3.2,
          repeat: Infinity,
          ease: "easeInOut",
        },
        rotate: {
          duration: 0.4,
          ease: "easeOut",
        },
      }}
    >
      <svg
        width={size}
        height={size * 1.2}
        viewBox="0 0 100 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer glow */}
        <defs>
          <radialGradient id="bodyGlow" cx="50%" cy="60%" r="50%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="bodyFill" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="60%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#4c1d95" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#c4b5fd" />
          </radialGradient>
        </defs>

        {/* Glow halo */}
        <ellipse cx="50" cy="75" rx="38" ry="38" fill="url(#bodyGlow)" />

        {/* Main body — teardrop/stone shape */}
        <path
          d="M50 10 C30 10, 15 30, 15 55 C15 78, 30 95, 50 95 C70 95, 85 78, 85 55 C85 30, 70 10, 50 10 Z"
          fill="url(#bodyFill)"
          filter="url(#glow)"
        />

        {/* Body highlight */}
        <path
          d="M50 18 C36 18, 26 32, 26 50 C26 52, 26.5 54, 27 56"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* Eyes */}
        <circle cx="38" cy="52" r="7" fill="url(#eyeGlow)" />
        <circle cx="62" cy="52" r="7" fill="url(#eyeGlow)" />
        <circle cx="38" cy="52" r="3.5" fill="#1e1b4b" />
        <circle cx="62" cy="52" r="3.5" fill="#1e1b4b" />
        {/* Eye shine */}
        <circle cx="40" cy="50" r="1.2" fill="white" />
        <circle cx="64" cy="50" r="1.2" fill="white" />

        {/* Smile */}
        <path
          d="M42 65 Q50 72 58 65"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Chess crown accessory */}
        <g transform="translate(32, 2)">
          <rect x="0" y="8" width="36" height="6" rx="2" fill="#fbbf24" />
          <rect x="2" y="2" width="6" height="8" rx="1" fill="#fbbf24" />
          <rect x="15" y="0" width="6" height="10" rx="1" fill="#fbbf24" />
          <rect x="28" y="2" width="6" height="8" rx="1" fill="#fbbf24" />
          <circle cx="5" cy="2" r="2" fill="#f59e0b" />
          <circle cx="18" cy="0" r="2" fill="#f59e0b" />
          <circle cx="31" cy="2" r="2" fill="#f59e0b" />
        </g>

        {/* Running shoe — bottom left */}
        <g transform="translate(8, 82)">
          <ellipse cx="12" cy="8" rx="12" ry="5" fill="#10b981" />
          <path d="M4 8 Q8 2 16 3 Q20 3 22 6" stroke="#059669" strokeWidth="1.5" fill="none" />
          <ellipse cx="12" cy="10" rx="12" ry="3" fill="#065f46" />
        </g>

        {/* Carabiner — bottom right */}
        <g transform="translate(72, 80)">
          <ellipse
            cx="10"
            cy="10"
            rx="8"
            ry="10"
            stroke="#f97316"
            strokeWidth="2.5"
            fill="none"
          />
          <line x1="10" y1="0" x2="10" y2="4" stroke="#f97316" strokeWidth="3" />
          <line x1="10" y1="16" x2="10" y2="20" stroke="#f97316" strokeWidth="3" />
        </g>

        {/* Orbiting star particles */}
        <motion.circle
          cx="0"
          cy="0"
          r="2.5"
          fill="#fbbf24"
          opacity="0.9"
          animate={{
            cx: [90, 50, 10, 50, 90],
            cy: [50, 15, 50, 85, 50],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.circle
          cx="0"
          cy="0"
          r="1.8"
          fill="#a78bfa"
          opacity="0.8"
          animate={{
            cx: [10, 50, 90, 50, 10],
            cy: [50, 15, 50, 85, 50],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
            delay: 1.33,
          }}
        />
        <motion.circle
          cx="0"
          cy="0"
          r="2"
          fill="#34d399"
          opacity="0.7"
          animate={{
            cx: [50, 90, 50, 10, 50],
            cy: [15, 50, 85, 50, 15],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
            delay: 2.66,
          }}
        />
      </svg>

      {/* Pulse ring */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: "1px solid rgba(124, 58, 237, 0.4)",
          pointerEvents: "none",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0, 0.4],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}