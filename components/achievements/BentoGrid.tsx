"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { achievements, CosmosType } from "@/data/achievements";
import AchievementCard from "./AchievementCard";
import CosmosToggle from "./CosmosToggle";

type FilterValue = "all" | CosmosType;

export default function BentoGrid() {
  const [filter, setFilter] = useState<FilterValue>("all");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filtered = filter === "all"
    ? achievements
    : achievements.filter((a) => a.cosmos === filter);

  return (
    <div>
      {/* Filter toggle */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "40px",
        }}
      >
        <CosmosToggle value={filter} onChange={setFilter} />
      </div>

      {/* Count */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "24px",
          fontSize: "11px",
          fontFamily: "var(--font-mono, monospace)",
          color: "rgba(255,255,255,0.25)",
          letterSpacing: "0.1em",
        }}
      >
        {filtered.length} achievement{filtered.length !== 1 ? "s" : ""}
        {filter !== "all" && ` · ${filter} cosmos`}
      </div>

      {/* Grid */}
      <motion.div
        layout
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
          width: "100%",
        }}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((achievement, i) => (
            <motion.div
              key={achievement.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              style={{
                gridColumn: achievement.span === "wide" ? "span 2" : "span 1",
              }}
            >
              <AchievementCard
                achievement={achievement}
                index={i}
                onHover={setHoveredId}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "rgba(255,255,255,0.2)",
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "13px",
          }}
        >
          no achievements in this cosmos yet.
        </div>
      )}

      {/* Unused variable suppression */}
      {hoveredId && null}
    </div>
  );
}