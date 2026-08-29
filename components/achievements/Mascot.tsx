"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

interface MascotProps {
  leanDirection?: "left" | "right" | "none";
  size?: number;
}

type Interaction = "head" | "face" | "right-arm" | "left-arm" | "body" | "legs" | null;

const REACTIONS: Record<NonNullable<Interaction>, { text: string; emoji: string; color: string }> = {
  head: { text: "Dropstone34 ♟", emoji: "👑", color: "#fbbf24" },
  face: { text: "watching you...", emoji: "😉", color: "#a78bfa" },
  "right-arm": { text: "bench 60kg!", emoji: "💪", color: "#ef4444" },
  "left-arm": { text: "hey there!", emoji: "👋", color: "#34d399" },
  body: { text: "a drop in the cosmos", emoji: "◈", color: "#7c3aed" },
  legs: { text: "250km in 2026!", emoji: "🏃", color: "#10b981" },
};

export default function Mascot({ leanDirection = "none", size = 160 }: MascotProps) {
  const [active, setActive] = useState<Interaction>(null);
  const [winking, setWinking] = useState(false);
  const [doubleFlex, setDoubleFlex] = useState(false);
  const [waving, setWaving] = useState(false);
  const [running, setRunning] = useState(false);
  const [crownSpark, setCrownSpark] = useState(false);
  const [bodyGlow, setBodyGlow] = useState(false);

  const leanAngle = leanDirection === "left" ? -10 : leanDirection === "right" ? 10 : 0;

  const handleInteraction = useCallback((zone: NonNullable<Interaction>) => {
    setActive(zone);
    if (zone === "face") setWinking(true);
    if (zone === "right-arm") setDoubleFlex(true);
    if (zone === "left-arm") setWaving(true);
    if (zone === "legs") setRunning(true);
    if (zone === "head") setCrownSpark(true);
    if (zone === "body") setBodyGlow(true);
  }, []);

  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => {
      setActive(null);
      setWinking(false);
      setDoubleFlex(false);
      setWaving(false);
      setRunning(false);
      setCrownSpark(false);
      setBodyGlow(false);
    }, 2800);
    return () => clearTimeout(t);
  }, [active]);

  const reaction = active ? REACTIONS[active] : null;

  return (
    <div style={{ display: "inline-block", position: "relative", cursor: "pointer" }}>
      {/* Speech bubble */}
      <AnimatePresence>
        {reaction && (
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            style={{
              position: "absolute",
              top: "-56px",
              left: "50%",
              transform: "translateX(-50%)",
              background: `${reaction.color}22`,
              border: `1px solid ${reaction.color}66`,
              borderRadius: "20px",
              padding: "6px 16px",
              whiteSpace: "nowrap",
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "12px",
              color: reaction.color,
              fontWeight: 600,
              letterSpacing: "0.04em",
              backdropFilter: "blur(8px)",
              zIndex: 10,
              pointerEvents: "none",
            }}
          >
            {reaction.emoji} {reaction.text}
            <div style={{
              position: "absolute", bottom: "-6px", left: "50%",
              transform: "translateX(-50%) rotate(45deg)",
              width: "10px", height: "10px",
              background: `${reaction.color}22`,
              borderRight: `1px solid ${reaction.color}66`,
              borderBottom: `1px solid ${reaction.color}66`,
            }} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        style={{ display: "inline-block", position: "relative" }}
        animate={{
          y: running ? [0, -20, 0, -20, 0] : [0, -14, 0],
          rotate: leanAngle,
        }}
        transition={{
          y: running
            ? { duration: 0.45, repeat: 4, ease: "easeInOut" }
            : { duration: 3.4, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 0.4, ease: "easeOut" },
        }}
      >
        <svg
          width={size}
          height={size * (220 / 140)}
          viewBox="0 0 140 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          overflow="visible"
        >
          <defs>
            {/* ── 3D HEAD GRADIENT — light from top-left ── */}
            <radialGradient id="head3D" cx="35%" cy="28%" r="65%">
              <stop offset="0%" stopColor="#c4b5fd" />
              <stop offset="35%" stopColor="#8b5cf6" />
              <stop offset="75%" stopColor="#5b21b6" />
              <stop offset="100%" stopColor="#2e1065" />
            </radialGradient>

            {/* ── 3D HOODIE GRADIENT ── */}
            <radialGradient id="hoodie3D" cx="32%" cy="25%" r="72%">
              <stop offset="0%" stopColor="#6d28d9" />
              <stop offset="45%" stopColor="#4c1d95" />
              <stop offset="100%" stopColor="#1e1065" />
            </radialGradient>

            {/* ── HOODIE HIGHLIGHT ── */}
            <radialGradient id="hoodieHighlight" cx="30%" cy="20%" r="50%">
              <stop offset="0%" stopColor="rgba(167,139,250,0.5)" />
              <stop offset="100%" stopColor="rgba(167,139,250,0)" />
            </radialGradient>

            {/* ── 3D ARM GRADIENT (cylinder) ── */}
            <linearGradient id="arm3D" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3730a3" />
              <stop offset="30%" stopColor="#4338ca" />
              <stop offset="60%" stopColor="#6d28d9" />
              <stop offset="100%" stopColor="#1e1b4b" />
            </linearGradient>

            {/* ── 3D LEG GRADIENT ── */}
            <linearGradient id="leg3D" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e1b4b" />
              <stop offset="35%" stopColor="#312e81" />
              <stop offset="65%" stopColor="#3730a3" />
              <stop offset="100%" stopColor="#1e1b4b" />
            </linearGradient>

            {/* ── SHOE GRADIENT ── */}
            <radialGradient id="shoe3D" cx="40%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="60%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#065f46" />
            </radialGradient>

            {/* ── SPECULAR HIGHLIGHT (white gloss) ── */}
            <radialGradient id="specular" cx="30%" cy="25%" r="45%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.75)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.2)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>

            {/* ── SOFT GLOW FILTER ── */}
            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* ── STRONG GLOW (for active state) ── */}
            <filter id="strongGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* ── DROP SHADOW ── */}
            <filter id="dropShadow" x="-15%" y="-5%" width="130%" height="130%">
              <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#1e1065" floodOpacity="0.6" />
            </filter>

            {/* ── AMBIENT OCCLUSION (dark where parts meet) ── */}
            <radialGradient id="ao" cx="50%" cy="100%" r="50%">
              <stop offset="0%" stopColor="rgba(0,0,0,0.4)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>

            {/* ── BODY GLOW (active) ── */}
            <radialGradient id="bodyActiveGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
            </radialGradient>

            {/* ── CROWN GRADIENT ── */}
            <linearGradient id="crown3D" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fde68a" />
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>

          {/* ── GROUND SHADOW ── */}
          <ellipse cx="70" cy="210" rx="38" ry="8" fill="rgba(0,0,0,0.35)" />

          {/* ── AMBIENT BODY GLOW ── */}
          <motion.ellipse
            cx="70" cy="140" rx="55" ry="60"
            fill={bodyGlow ? "url(#bodyActiveGlow)" : "rgba(124,58,237,0.12)"}
            animate={{ opacity: bodyGlow ? [1, 1.4, 1] : 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* ══════════════════════════════════════
              LEGS — 3D cylinders
          ══════════════════════════════════════ */}
          {/* Left leg */}
          <motion.g
            animate={running ? { rotate: [0, 35, 0, -35, 0] } : { rotate: [0, 4, 0, -4, 0] }}
            transition={running
              ? { duration: 0.35, repeat: 6, ease: "easeInOut" }
              : { duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            style={{ transformOrigin: "50px 132px" }}
          >
            {/* Leg cylinder */}
            <rect x="42" y="132" width="18" height="44" rx="9" fill="url(#leg3D)" />
            {/* Leg highlight */}
            <rect x="44" y="134" width="6" height="38" rx="3" fill="rgba(99,102,241,0.35)" />
            {/* Shoe */}
            <ellipse cx="50" cy="178" rx="16" ry="8" fill="url(#shoe3D)" filter="url(#dropShadow)" />
            {/* Shoe highlight */}
            <ellipse cx="46" cy="174" rx="7" ry="3" fill="rgba(167,243,208,0.5)" />
            {/* Shoe sole */}
            <ellipse cx="50" cy="180" rx="16" ry="4" fill="#065f46" opacity="0.7" />
          </motion.g>

          {/* Right leg */}
          <motion.g
            animate={running ? { rotate: [0, -35, 0, 35, 0] } : { rotate: [0, -4, 0, 4, 0] }}
            transition={running
              ? { duration: 0.35, repeat: 6, ease: "easeInOut" }
              : { duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            style={{ transformOrigin: "90px 132px" }}
          >
            <rect x="80" y="132" width="18" height="44" rx="9" fill="url(#leg3D)" />
            <rect x="82" y="134" width="6" height="38" rx="3" fill="rgba(99,102,241,0.35)" />
            <ellipse cx="90" cy="178" rx="16" ry="8" fill="url(#shoe3D)" filter="url(#dropShadow)" />
            <ellipse cx="86" cy="174" rx="7" ry="3" fill="rgba(167,243,208,0.5)" />
            <ellipse cx="90" cy="180" rx="16" ry="4" fill="#065f46" opacity="0.7" />
          </motion.g>

          {/* ══════════════════════════════════════
              HOODIE BODY — 3D blob
          ══════════════════════════════════════ */}
          {/* Main body shape */}
          <motion.path
            d="M28 78 Q20 72 22 62 L38 54 Q48 68 70 70 Q92 68 102 54 L118 62 Q120 72 112 78 L108 136 Q102 144 70 144 Q38 144 32 136 Z"
            fill="url(#hoodie3D)"
            filter="url(#dropShadow)"
            animate={{ opacity: bodyGlow ? [1, 0.85, 1] : 1 }}
            transition={{ duration: 0.4, repeat: bodyGlow ? 3 : 0 }}
          />
          {/* Hoodie highlight overlay */}
          <path
            d="M28 78 Q20 72 22 62 L38 54 Q48 68 70 70 Q92 68 102 54 L118 62 Q120 72 112 78 L108 136 Q102 144 70 144 Q38 144 32 136 Z"
            fill="url(#hoodieHighlight)"
          />
          {/* Hoodie center seam */}
          <path d="M70 70 L70 144" stroke="rgba(109,40,217,0.4)" strokeWidth="1.5" />
          {/* Hoodie fold lines */}
          <path d="M38 54 Q50 80 48 110" stroke="rgba(30,27,75,0.5)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M102 54 Q90 80 92 110" stroke="rgba(30,27,75,0.5)" strokeWidth="1.5" strokeLinecap="round" fill="none" />

          {/* Pocket — 3D inset */}
          <path d="M48 100 Q70 96 92 100 L92 122 Q70 126 48 122 Z" fill="#1e1065" opacity="0.8" />
          <path d="M48 100 Q70 96 92 100" stroke="#6d28d9" strokeWidth="1.5" fill="none" opacity="0.6" />
          {/* Pocket inner shadow */}
          <path d="M50 102 Q70 98 90 102 L90 120 Q70 124 50 120 Z" fill="rgba(0,0,0,0.2)" />

          {/* Drawstrings */}
          <motion.path
            d="M62 72 Q58 82 56 94"
            stroke="#6d28d9" strokeWidth="2" strokeLinecap="round" fill="none"
            animate={{ d: ["M62 72 Q58 82 56 94", "M62 72 Q60 84 58 96", "M62 72 Q58 82 56 94"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M78 72 Q82 82 84 94"
            stroke="#6d28d9" strokeWidth="2" strokeLinecap="round" fill="none"
            animate={{ d: ["M78 72 Q82 82 84 94", "M78 72 Q80 84 82 96", "M78 72 Q82 82 84 94"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* ══════════════════════════════════════
              LEFT ARM — 3D cylinder, relaxed
          ══════════════════════════════════════ */}
          <motion.g
            animate={waving
              ? { rotate: [0, -50, 15, -50, 15, -50, 0] }
              : { rotate: [0, 10, 0, -5, 0] }}
            transition={waving
              ? { duration: 1.2, ease: "easeInOut" }
              : { duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "32px 78px" }}
          >
            {/* Upper arm */}
            <path d="M32 78 Q14 90 12 112" stroke="url(#arm3D)" strokeWidth="16" strokeLinecap="round" fill="none" />
            {/* Upper arm highlight */}
            <path d="M32 78 Q16 90 14 110" stroke="rgba(99,102,241,0.4)" strokeWidth="6" strokeLinecap="round" fill="none" />
            {/* Forearm */}
            <path d="M12 112 Q10 126 18 134" stroke="url(#arm3D)" strokeWidth="14" strokeLinecap="round" fill="none" />
            <path d="M12 112 Q11 124 18 132" stroke="rgba(99,102,241,0.35)" strokeWidth="5" strokeLinecap="round" fill="none" />
            {/* Hand — 3D sphere */}
            <circle cx="20" cy="136" r="10" fill="url(#head3D)" filter="url(#softGlow)" />
            <ellipse cx="17" cy="132" rx="4" ry="3" fill="rgba(196,181,253,0.6)" />
            {/* Fingers */}
            <path d="M12 134 Q14 142 20 144" stroke="#8b5cf6" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.7" />
            <path d="M20 144 Q26 142 28 134" stroke="#8b5cf6" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.7" />
          </motion.g>

          {/* ══════════════════════════════════════
              RIGHT ARM — 3D cylinder, FLEX
          ══════════════════════════════════════ */}
          <motion.g
            animate={doubleFlex
              ? { rotate: [0, -55, -62, -55, -62, -55, 0] }
              : { rotate: [0, -38, -44, -38, 0, 6, 0] }}
            transition={doubleFlex
              ? { duration: 1.5, ease: "easeInOut" }
              : { duration: 4.2, repeat: Infinity, ease: "easeInOut", times: [0, 0.2, 0.35, 0.5, 0.7, 0.85, 1] }}
            style={{ transformOrigin: "108px 78px" }}
          >
            {/* Upper arm */}
            <path d="M108 78 Q126 88 130 106" stroke="url(#arm3D)" strokeWidth="16" strokeLinecap="round" fill="none" />
            <path d="M108 78 Q124 88 128 104" stroke="rgba(99,102,241,0.4)" strokeWidth="6" strokeLinecap="round" fill="none" />
            {/* Forearm */}
            <motion.path
              d="M130 106 Q134 120 126 128"
              stroke="url(#arm3D)"
              strokeWidth="14"
              strokeLinecap="round"
              fill="none"
              animate={{ d: doubleFlex
                ? ["M130 106 Q134 120 126 128", "M130 106 Q126 96 118 90", "M130 106 Q126 96 118 90", "M130 106 Q134 120 126 128"]
                : ["M130 106 Q134 120 126 128", "M130 106 Q128 96 120 92", "M130 106 Q128 96 120 92", "M130 106 Q134 120 126 128"]
              }}
              transition={{ duration: doubleFlex ? 1.5 : 4.2, repeat: doubleFlex ? 0 : Infinity, ease: "easeInOut", times: [0, 0.25, 0.5, 1] }}
            />
            {/* Fist */}
            <motion.circle
              cx="124" cy="130" r="10"
              fill="url(#head3D)"
              filter="url(#softGlow)"
              animate={{ cx: doubleFlex ? [124, 116, 116, 124] : [124, 118, 118, 124], cy: doubleFlex ? [130, 88, 88, 130] : [130, 90, 90, 130] }}
              transition={{ duration: doubleFlex ? 1.5 : 4.2, repeat: doubleFlex ? 0 : Infinity, ease: "easeInOut", times: [0, 0.25, 0.5, 1] }}
            />
            {/* Fist highlight */}
            <motion.ellipse
              cx="121" cy="126" rx="4" ry="3"
              fill="rgba(196,181,253,0.55)"
              animate={{ cx: doubleFlex ? [121, 113, 113, 121] : [121, 115, 115, 121], cy: doubleFlex ? [126, 84, 84, 126] : [126, 86, 86, 126] }}
              transition={{ duration: doubleFlex ? 1.5 : 4.2, repeat: doubleFlex ? 0 : Infinity, ease: "easeInOut", times: [0, 0.25, 0.5, 1] }}
            />
            {/* Knuckles */}
            <motion.g
              animate={{ x: doubleFlex ? [0, -8, -8, 0] : [0, -6, -6, 0], y: doubleFlex ? [0, -42, -42, 0] : [0, -40, -40, 0] }}
              transition={{ duration: doubleFlex ? 1.5 : 4.2, repeat: doubleFlex ? 0 : Infinity, ease: "easeInOut", times: [0, 0.25, 0.5, 1] }}
            >
              <circle cx="118" cy="127" r="3" fill="#c4b5fd" opacity="0.6" />
              <circle cx="125" cy="126" r="3" fill="#c4b5fd" opacity="0.6" />
              <circle cx="128" cy="132" r="3" fill="#c4b5fd" opacity="0.6" />
            </motion.g>
          </motion.g>

          {/* ══════════════════════════════════════
              HOOD — 3D fabric
          ══════════════════════════════════════ */}
          {/* Hood back */}
          <path
            d="M40 50 Q38 16 70 12 Q102 16 100 50 Q100 72 70 76 Q40 72 40 50 Z"
            fill="#3730a3"
          />
          {/* Hood depth/shadow */}
          <path
            d="M44 50 Q44 22 70 18 Q96 22 96 50"
            fill="#2e1065"
            opacity="0.6"
          />
          {/* Hood rim highlight */}
          <path
            d="M42 50 Q42 20 70 16 Q98 20 98 50"
            stroke="rgba(99,102,241,0.4)"
            strokeWidth="2"
            fill="none"
          />
          {/* Hood fabric folds */}
          <path d="M44 30 Q50 50 46 68" stroke="rgba(30,27,75,0.5)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M96 30 Q90 50 94 68" stroke="rgba(30,27,75,0.5)" strokeWidth="1.5" strokeLinecap="round" fill="none" />

          {/* ══════════════════════════════════════
              HEAD — 3D sphere
          ══════════════════════════════════════ */}
          <motion.circle
            cx="70" cy="44" r="28"
            fill="url(#head3D)"
            filter="url(#dropShadow)"
            animate={{ scale: active === "head" ? [1, 1.07, 1] : 1 }}
            transition={{ duration: 0.4, repeat: active === "head" ? 2 : 0 }}
            style={{ transformOrigin: "70px 44px" }}
          />
          {/* Head specular highlight — the key 3D effect */}
          <ellipse cx="58" cy="34" rx="12" ry="9" fill="url(#specular)" />
          {/* Secondary rim light (opposite side) */}
          <path
            d="M88 30 Q96 44 90 58"
            stroke="rgba(167,139,250,0.2)"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          {/* Ambient occlusion at neck */}
          <ellipse cx="70" cy="70" rx="22" ry="6" fill="rgba(0,0,0,0.25)" />

          {/* ══════════════════════════════════════
              FACE
          ══════════════════════════════════════ */}
          {/* Eyes — 3D recessed */}
          <motion.g
            animate={winking
              ? { scaleY: [1, 0.08, 1, 0.08, 1] }
              : { scaleY: [1, 1, 0.08, 1, 1] }}
            transition={winking
              ? { duration: 0.55, ease: "easeInOut" }
              : { duration: 4.5, repeat: Infinity, times: [0, 0.44, 0.5, 0.56, 1] }}
            style={{ transformOrigin: "70px 42px" }}
          >
            {/* Eye sockets (depth) */}
            <ellipse cx="58" cy="42" rx="7" ry="6.5" fill="rgba(30,27,75,0.4)" />
            <ellipse cx="82" cy="42" rx="7" ry="6.5" fill="rgba(30,27,75,0.4)" />
            {/* Eyeballs */}
            <circle cx="58" cy="42" r="5.5" fill="#1e1b4b" />
            <circle cx="82" cy="42" r="5.5" fill="#1e1b4b" />
            {/* Iris */}
            <circle cx="58" cy="42" r="3" fill="#4c1d95" />
            <circle cx="82" cy="42" r="3" fill="#4c1d95" />
            {/* Pupil */}
            <circle cx="58" cy="42" r="1.5" fill="#0f0a1e" />
            <circle cx="82" cy="42" r="1.5" fill="#0f0a1e" />
            {/* Eye shine — 3D gloss */}
            <circle cx="60" cy="39" r="2" fill="white" opacity="0.9" />
            <circle cx="84" cy="39" r="2" fill="white" opacity="0.9" />
            <circle cx="56" cy="44" r="1" fill="white" opacity="0.4" />
            <circle cx="80" cy="44" r="1" fill="white" opacity="0.4" />
          </motion.g>

          {/* Eyebrows — 3D raised */}
          <motion.g
            animate={{ y: (doubleFlex || running) ? [0, -5, -5, 0] : [0, -3, -3, 0] }}
            transition={{ duration: doubleFlex ? 1.5 : 4.2, repeat: doubleFlex ? 0 : Infinity, ease: "easeInOut", times: [0, 0.25, 0.5, 1] }}
          >
            <path d="M51 32 Q58 28 65 31" stroke="#1e1b4b" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M75 31 Q82 28 89 32" stroke="#1e1b4b" strokeWidth="3" strokeLinecap="round" fill="none" />
            {/* Brow highlight */}
            <path d="M52 31 Q58 27 64 30" stroke="rgba(196,181,253,0.3)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M76 30 Q82 27 88 31" stroke="rgba(196,181,253,0.3)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          </motion.g>

          {/* Nose — subtle 3D bump */}
          <ellipse cx="70" cy="52" rx="3.5" ry="2.5" fill="rgba(91,33,182,0.5)" />
          <ellipse cx="69" cy="51" rx="1.5" ry="1" fill="rgba(196,181,253,0.3)" />

          {/* Smile — 3D depth */}
          <motion.path
            d="M58 60 Q70 68 82 60"
            stroke="#1e1b4b"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            animate={{
              d: (doubleFlex || running || waving)
                ? ["M58 60 Q70 68 82 60", "M54 58 Q70 72 86 58", "M54 58 Q70 72 86 58", "M58 60 Q70 68 82 60"]
                : ["M58 60 Q70 68 82 60", "M56 59 Q70 70 84 59", "M56 59 Q70 70 84 59", "M58 60 Q70 68 82 60"]
            }}
            transition={{ duration: doubleFlex ? 1.5 : 4.2, repeat: doubleFlex ? 0 : Infinity, ease: "easeInOut", times: [0, 0.25, 0.5, 1] }}
          />
          {/* Smile inner shadow */}
          <motion.path
            d="M58 60 Q70 68 82 60"
            stroke="rgba(30,27,75,0.6)"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            animate={{
              d: (doubleFlex || running || waving)
                ? ["M58 60 Q70 68 82 60", "M54 58 Q70 72 86 58", "M54 58 Q70 72 86 58", "M58 60 Q70 68 82 60"]
                : ["M58 60 Q70 68 82 60", "M56 59 Q70 70 84 59", "M56 59 Q70 70 84 59", "M58 60 Q70 68 82 60"]
            }}
            transition={{ duration: doubleFlex ? 1.5 : 4.2, repeat: doubleFlex ? 0 : Infinity, ease: "easeInOut", times: [0, 0.25, 0.5, 1] }}
          />

          {/* Cheeks — 3D blush */}
          <motion.ellipse cx="48" cy="52" rx="7" ry="4.5" fill="#f9a8d4"
            animate={{ opacity: (waving || winking) ? [0.35, 0.7, 0.35] : 0.35 }}
            transition={{ duration: 0.5, repeat: (waving || winking) ? 3 : 0 }}
          />
          <motion.ellipse cx="92" cy="52" rx="7" ry="4.5" fill="#f9a8d4"
            animate={{ opacity: (waving || winking) ? [0.35, 0.7, 0.35] : 0.35 }}
            transition={{ duration: 0.5, repeat: (waving || winking) ? 3 : 0 }}
          />

          {/* ══════════════════════════════════════
              CHESS CROWN — 3D gold
          ══════════════════════════════════════ */}
          <motion.g
            transform="translate(44, 12)"
            animate={{ y: crownSpark ? [0, -8, 0, -5, 0] : 0 }}
            transition={{ duration: 0.6, repeat: crownSpark ? 2 : 0, ease: "easeInOut" }}
          >
            {/* Crown base */}
            <rect x="0" y="9" width="52" height="8" rx="3" fill="url(#crown3D)" />
            {/* Crown base highlight */}
            <rect x="2" y="10" width="48" height="3" rx="1.5" fill="rgba(253,230,138,0.5)" />
            {/* Crown spikes */}
            <rect x="2" y="2" width="9" height="10" rx="2" fill="url(#crown3D)" />
            <rect x="21" y="0" width="9" height="12" rx="2" fill="url(#crown3D)" />
            <rect x="40" y="2" width="9" height="10" rx="2" fill="url(#crown3D)" />
            {/* Spike highlights */}
            <rect x="3" y="3" width="4" height="5" rx="1" fill="rgba(253,230,138,0.6)" />
            <rect x="22" y="1" width="4" height="6" rx="1" fill="rgba(253,230,138,0.6)" />
            <rect x="41" y="3" width="4" height="5" rx="1" fill="rgba(253,230,138,0.6)" />
            {/* Crown gems */}
            <circle cx="6.5" cy="2" r="3.5" fill="#f59e0b" />
            <circle cx="25.5" cy="0" r="3.5" fill="#f59e0b" />
            <circle cx="44.5" cy="2" r="3.5" fill="#f59e0b" />
            {/* Gem highlights */}
            <circle cx="5.5" cy="1" r="1.5" fill="rgba(253,230,138,0.8)" />
            <circle cx="24.5" cy="-1" r="1.5" fill="rgba(253,230,138,0.8)" />
            <circle cx="43.5" cy="1" r="1.5" fill="rgba(253,230,138,0.8)" />
            {/* Crown glow */}
            <motion.ellipse
              cx="26" cy="6" rx="26" ry="8" fill="#fbbf24" opacity="0"
              animate={{ opacity: crownSpark ? [0, 0.5, 0, 0.3, 0] : [0, 0.25, 0] }}
              transition={{ duration: crownSpark ? 0.8 : 2.5, repeat: crownSpark ? 2 : Infinity, ease: "easeInOut" }}
            />
          </motion.g>

          {/* Crown sparks */}
          <AnimatePresence>
            {crownSpark && ["♟", "★", "✦", "♛", "◈"].map((sym, i) => (
              <motion.text
                key={sym}
                x={48 + i * 12}
                y={14}
                fontSize="11"
                fill="#fbbf24"
                textAnchor="middle"
                initial={{ opacity: 1, y: 14 }}
                animate={{ opacity: 0, y: -25 + i * -4 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, delay: i * 0.08 }}
              >
                {sym}
              </motion.text>
            ))}
          </AnimatePresence>

          {/* ── FLEX ENERGY SPARKS ── */}
          <motion.g
            animate={{ opacity: doubleFlex ? [0, 1, 1, 0] : [0, 0, 1, 1, 0] }}
            transition={{ duration: doubleFlex ? 1.5 : 4.2, repeat: doubleFlex ? 0 : Infinity, times: doubleFlex ? [0, 0.1, 0.7, 1] : [0, 0.2, 0.3, 0.5, 0.6] }}
          >
            <motion.text x="118" y="72" fontSize="16" fill="#fbbf24"
              animate={{ y: [72, 54, 36], opacity: [1, 0.6, 0] }}
              transition={{ duration: 1.1, repeat: Infinity, delay: 0.4 }}
            >⚡</motion.text>
            <motion.text x="126" y="88" fontSize="11" fill="#f97316"
              animate={{ y: [88, 70, 52], opacity: [1, 0.5, 0] }}
              transition={{ duration: 0.9, repeat: Infinity, delay: 0.7 }}
            >✦</motion.text>
          </motion.g>

          {/* Running dust */}
          <AnimatePresence>
            {running && [0, 1, 2, 3].map((i) => (
              <motion.circle
                key={i}
                cx={42 - i * 12}
                cy={184}
                r={4 - i * 0.7}
                fill="#10b981"
                initial={{ opacity: 0.7 }}
                animate={{ opacity: 0, x: -25 - i * 10, y: -8 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
              />
            ))}
          </AnimatePresence>

          {/* ── ORBITING PARTICLES ── */}
          <motion.circle r="3.5" fill="#fbbf24" opacity="0.9"
            animate={{ cx: [128, 70, 12, 70, 128], cy: [70, 12, 70, 128, 70] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
          />
          <motion.circle r="2.5" fill="#a78bfa" opacity="0.7"
            animate={{ cx: [12, 70, 128, 70, 12], cy: [70, 12, 70, 128, 70] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "linear", delay: 1.83 }}
          />
          <motion.circle r="3" fill="#34d399" opacity="0.8"
            animate={{ cx: [70, 128, 70, 12, 70], cy: [12, 70, 128, 70, 12] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "linear", delay: 3.67 }}
          />

          {/* ── INVISIBLE CLICK ZONES ── */}
          <circle cx="70" cy="36" r="30" fill="transparent" style={{ cursor: "pointer" }} onClick={() => handleInteraction("head")} />
          <rect x="52" y="36" width="36" height="22" fill="transparent" style={{ cursor: "pointer" }} onClick={(e) => { e.stopPropagation(); handleInteraction("face"); }} />
          <rect x="100" y="68" width="38" height="68" fill="transparent" style={{ cursor: "pointer" }} onClick={() => handleInteraction("right-arm")} />
          <rect x="2" y="68" width="38" height="68" fill="transparent" style={{ cursor: "pointer" }} onClick={() => handleInteraction("left-arm")} />
          <rect x="36" y="72" width="68" height="64" fill="transparent" style={{ cursor: "pointer" }} onClick={() => handleInteraction("body")} />
          <rect x="36" y="132" width="68" height="58" fill="transparent" style={{ cursor: "pointer" }} onClick={() => handleInteraction("legs")} />
        </svg>

        {/* Pulse ring */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "1px solid rgba(124, 58, 237, 0.3)",
            pointerEvents: "none",
          }}
          animate={{ scale: [1, 1.22, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 0 : 0.28 }}
        transition={{ delay: 2.5 }}
        style={{
          textAlign: "center",
          fontSize: "9px",
          fontFamily: "var(--font-mono, monospace)",
          color: "rgba(255,255,255,0.28)",
          letterSpacing: "0.12em",
          marginTop: "4px",
          pointerEvents: "none",
        }}
      >
        click me
      </motion.div>
    </div>
  );
}