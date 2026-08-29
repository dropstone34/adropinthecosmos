"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Approximate SVG coordinates for destinations on a simplified world map
// Map viewBox: 0 0 800 380 — all destinations in India/SE Asia cluster
const DESTINATIONS = [
  { name: "Andaman", x: 628, y: 222, color: "#06b6d4" },
  { name: "Coorg", x: 552, y: 218, color: "#22c55e" },
  { name: "Thailand", x: 618, y: 210, color: "#f97316" },
  { name: "Pondicherry", x: 562, y: 224, color: "#fbbf24" },
  { name: "Gokarna", x: 545, y: 214, color: "#a78bfa" },
  { name: "Uttarakhand", x: 558, y: 183, color: "#f472b6" },
];

// Simplified world map path (very minimal outline)
const WORLD_PATH = `
M 80 120 L 120 100 L 160 95 L 200 100 L 220 115 L 200 130 L 180 140 L 160 135 L 140 130 Z
M 230 105 L 280 90 L 340 85 L 380 95 L 400 110 L 390 130 L 360 140 L 320 145 L 280 140 L 250 130 L 230 115 Z
M 410 100 L 460 90 L 510 85 L 540 95 L 560 110 L 570 130 L 550 150 L 520 160 L 490 155 L 460 145 L 430 130 L 415 115 Z
M 580 90 L 640 80 L 700 85 L 740 100 L 760 120 L 750 140 L 720 150 L 680 155 L 640 150 L 600 140 L 580 120 Z
M 100 160 L 140 155 L 160 165 L 150 185 L 130 195 L 110 190 L 95 175 Z
M 200 155 L 260 150 L 300 160 L 310 180 L 290 200 L 260 210 L 230 205 L 210 190 L 200 170 Z
M 320 160 L 380 155 L 420 165 L 430 185 L 410 205 L 380 215 L 350 210 L 330 195 L 320 175 Z
M 440 165 L 500 160 L 540 170 L 550 190 L 530 210 L 500 220 L 470 215 L 450 200 L 440 180 Z
M 560 170 L 620 165 L 660 175 L 670 195 L 650 215 L 620 225 L 590 220 L 570 205 L 560 185 Z
M 680 175 L 740 170 L 770 180 L 775 200 L 755 220 L 720 230 L 690 225 L 675 210 L 680 190 Z
M 120 220 L 160 215 L 180 225 L 175 245 L 155 255 L 135 250 L 120 235 Z
M 200 220 L 250 215 L 270 225 L 265 250 L 240 265 L 215 260 L 200 240 Z
M 300 225 L 350 220 L 370 235 L 360 260 L 335 270 L 310 265 L 300 245 Z
M 440 230 L 490 225 L 510 240 L 500 265 L 475 275 L 450 270 L 440 250 Z
M 560 235 L 610 230 L 630 245 L 620 270 L 595 280 L 570 275 L 560 255 Z
M 680 240 L 730 235 L 750 250 L 740 275 L 715 285 L 690 280 L 680 260 Z
M 160 290 L 200 285 L 215 300 L 205 320 L 185 325 L 165 320 L 160 305 Z
M 220 295 L 260 290 L 275 305 L 265 325 L 245 330 L 225 325 L 220 310 Z
M 560 300 L 600 295 L 615 310 L 605 330 L 585 335 L 565 330 L 560 315 Z
M 620 305 L 660 300 L 675 315 L 665 335 L 645 340 L 625 335 L 620 320 Z
`;

export default function TravelDots() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <div ref={ref} style={{ width: "100%", position: "relative" }}>
      <svg
        viewBox="0 0 800 380"
        style={{ width: "100%", height: "auto", maxHeight: "160px" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Ocean background */}
        <rect width="800" height="380" fill="rgba(0,0,0,0)" />

        {/* Landmasses */}
        <path
          d={WORLD_PATH}
          fill="rgba(255,255,255,0.06)"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="0.5"
        />

        {/* Grid lines */}
        {[100, 200, 300].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="800"
            y2={y}
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="0.5"
          />
        ))}
        {[200, 400, 600].map((x) => (
          <line
            key={x}
            x1={x}
            y1="0"
            x2={x}
            y2="380"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="0.5"
          />
        ))}

        {/* Destination dots */}
        {DESTINATIONS.map((dest, i) => (
          <g key={dest.name}>
            {/* Pulse ring */}
            {isInView && (
              <motion.circle
                cx={dest.x}
                cy={dest.y}
                r={12}
                fill="none"
                stroke={dest.color}
                strokeWidth="1"
                initial={{ opacity: 0.6, scale: 0.5 }}
                animate={{ opacity: 0, scale: 2 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeOut",
                }}
              />
            )}
            {/* Core dot */}
            <motion.circle
              cx={dest.x}
              cy={dest.y}
              r={5}
              fill={dest.color}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ delay: i * 0.15 + 0.3, duration: 0.4, type: "spring" }}
            />
            {/* Glow */}
            <motion.circle
              cx={dest.x}
              cy={dest.y}
              r={8}
              fill={dest.color}
              opacity={0.2}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.2 } : { opacity: 0 }}
              transition={{ delay: i * 0.15 + 0.3 }}
            />
            {/* Label */}
            <motion.text
              x={dest.x + 8}
              y={dest.y - 6}
              fontSize="8"
              fill={dest.color}
              fontFamily="monospace"
              opacity={0.8}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.8 } : { opacity: 0 }}
              transition={{ delay: i * 0.15 + 0.5 }}
            >
              {dest.name}
            </motion.text>
          </g>
        ))}
      </svg>
    </div>
  );
}