"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Achievement, COSMOS_COLORS } from "@/data/achievements";
import StatsRing from "./StatsRing";
import TravelDots from "./TravelDots";
import CosmosContribution from "./CosmosContribution";

interface AchievementCardProps {
  achievement: Achievement;
  index: number;
  onHover?: (id: string | null) => void;
}

interface LichessData {
  rapid?: number;
  blitz?: number;
  bullet?: number;
  games?: number;
  username?: string;
}

interface StravaData {
  ytd_run_totals?: { distance?: number };
  recent_run_totals?: { distance?: number };
}

export default function AchievementCard({ achievement, index, onHover }: AchievementCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);
  const [lichessData, setLichessData] = useState<LichessData | null>(null);
  const [stravaData, setStravaData] = useState<StravaData | null>(null);
  const [liveLoading, setLiveLoading] = useState(false);

  const cosmosStyle = COSMOS_COLORS[achievement.cosmos];
  const accentColor = achievement.accentColor;

  // Fetch live data
  useEffect(() => {
    if (!achievement.liveData) return;
    setLiveLoading(true);

    if (achievement.liveData === "lichess") {
      fetch("/api/lichess")
        .then((r) => r.json())
        .then((data: LichessData) => {
          setLichessData(data);
          setLiveLoading(false);
        })
        .catch(() => setLiveLoading(false));
    } else if (achievement.liveData === "strava") {
      fetch("/api/strava")
        .then((r) => r.json())
        .then((data: StravaData) => {
          setStravaData(data);
          setLiveLoading(false);
        })
        .catch(() => setLiveLoading(false));
    }
  }, [achievement.liveData]);

  // Compute live display values
  const getLiveDisplay = () => {
    if (achievement.liveData === "lichess" && lichessData) {
      const rating = lichessData.rapid || lichessData.blitz || lichessData.bullet;
      if (rating) {
        return { label: "Live Rating", value: String(rating), color: "#a78bfa" };
      }
    }
    if (achievement.liveData === "strava" && stravaData) {
      const distanceM = stravaData.ytd_run_totals?.distance || 0;
      const distanceKm = (distanceM / 1000).toFixed(1);
      const pct = Math.min(100, (distanceM / 1000 / 250) * 100);
      return { label: `${distanceKm} / 250 km`, value: `${pct.toFixed(0)}%`, color: "#10b981" };
    }
    return null;
  };

  const liveDisplay = getLiveDisplay();

  // Running progress bar
  const runningProgress =
    achievement.liveData === "strava" && stravaData
      ? Math.min(100, ((stravaData.ytd_run_totals?.distance || 0) / 1000 / 250) * 100)
      : 0;

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
        transition: { duration: 0.5, delay: index * 0.06, ease: "easeOut" as const },
    },
  };

  const isWide = achievement.span === "wide";

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      onMouseEnter={() => {
        setHovered(true);
        onHover?.(achievement.id);
      }}
      onMouseLeave={() => {
        setHovered(false);
        onHover?.(null);
      }}
      style={{
        gridColumn: isWide ? "span 2" : "span 1",
        background: "rgba(15, 15, 26, 0.7)",
        backdropFilter: "blur(12px)",
        border: `1px solid ${hovered ? accentColor + "55" : cosmosStyle.border}`,
        borderRadius: "16px",
        padding: "20px",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        transition: "border-color 0.25s ease, box-shadow 0.25s ease",
        boxShadow: hovered
          ? `0 0 28px ${accentColor}22, 0 8px 32px rgba(0,0,0,0.4)`
          : `0 0 0px transparent, 0 4px 16px rgba(0,0,0,0.3)`,
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: `linear-gradient(90deg, ${accentColor}, transparent)`,
          opacity: hovered ? 1 : 0.4,
          transition: "opacity 0.25s ease",
        }}
      />

      {/* Cosmos badge */}
      <div
        style={{
          position: "absolute",
          top: "14px",
          right: "14px",
          fontSize: "9px",
          fontFamily: "var(--font-mono, monospace)",
          letterSpacing: "0.1em",
          color: cosmosStyle.primary,
          background: `${cosmosStyle.primary}18`,
          border: `1px solid ${cosmosStyle.primary}33`,
          borderRadius: "20px",
          padding: "2px 8px",
        }}
      >
        {achievement.cosmos === "inner" ? "🧠" : "🌍"} {achievement.cosmos}
      </div>

      {/* Live indicator */}
      {achievement.liveData && (
        <div
          style={{
            position: "absolute",
            top: "36px",
            right: "14px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <motion.div
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: liveLoading ? "#f59e0b" : "#10b981",
            }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span
            style={{
              fontSize: "9px",
              fontFamily: "var(--font-mono, monospace)",
              color: liveLoading ? "#f59e0b" : "#10b981",
              letterSpacing: "0.08em",
            }}
          >
            {liveLoading ? "fetching" : "live"}
          </span>
        </div>
      )}

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "14px", paddingRight: "80px" }}>
        <span style={{ fontSize: "28px", lineHeight: 1, flexShrink: 0 }}>{achievement.emoji}</span>
        <div>
          <h3
            style={{
              color: "var(--text-primary, #E8E8E8)",
              fontSize: "15px",
              fontWeight: 700,
              fontFamily: "var(--font-mono, monospace)",
              marginBottom: "3px",
              lineHeight: 1.3,
            }}
          >
            {achievement.title}
          </h3>
          <p
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: "11px",
              fontFamily: "var(--font-mono, monospace)",
              lineHeight: 1.4,
            }}
          >
            {achievement.subtitle}
          </p>
        </div>
      </div>

      {/* Description */}
      <p
        style={{
          color: "rgba(255,255,255,0.55)",
          fontSize: "12px",
          lineHeight: "1.7",
          fontFamily: "var(--font-mono, monospace)",
          marginBottom: "16px",
        }}
      >
        {achievement.description}
      </p>

      {/* Travel map for travel card */}
      {achievement.id === "travel" && (
        <div style={{ marginBottom: "14px" }}>
          <TravelDots />
        </div>
      )}

      {/* Live data display */}
      {liveDisplay && (
        <div
          style={{
            marginBottom: "14px",
            padding: "10px 14px",
            background: `${accentColor}0d`,
            border: `1px solid ${accentColor}33`,
            borderRadius: "8px",
          }}
        >
          {achievement.liveData === "strava" ? (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "6px",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    fontFamily: "var(--font-mono, monospace)",
                    color: accentColor,
                  }}
                >
                  {liveDisplay.label}
                </span>
                <span
                  style={{
                    fontSize: "11px",
                    fontFamily: "var(--font-mono, monospace)",
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  {liveDisplay.value}
                </span>
              </div>
              <div
                style={{
                  height: "4px",
                  background: "rgba(255,255,255,0.08)",
                  borderRadius: "2px",
                  overflow: "hidden",
                }}
              >
                <motion.div
                  style={{
                    height: "100%",
                    background: accentColor,
                    borderRadius: "2px",
                    boxShadow: `0 0 6px ${accentColor}`,
                  }}
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${runningProgress}%` } : { width: 0 }}
                  transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                />
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "18px", fontWeight: 700, color: accentColor, fontFamily: "var(--font-mono, monospace)" }}>
                {liveDisplay.value}
              </span>
              <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-mono, monospace)" }}>
                {liveDisplay.label}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Stats rings */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          marginBottom: "14px",
        }}
      >
        {achievement.stats.map((stat) => (
          <StatsRing
            key={stat.label}
            label={stat.label}
            value={stat.value}
            current={stat.current}
            max={stat.max}
            color={accentColor}
            size={64}
          />
        ))}
      </div>

      {/* Tags */}
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "12px" }}>
        {achievement.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: "10px",
              fontFamily: "var(--font-mono, monospace)",
              color: "rgba(255,255,255,0.35)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "20px",
              padding: "2px 8px",
              letterSpacing: "0.04em",
            }}
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* How it shaped me */}
      <CosmosContribution text={achievement.shapedMe} accentColor={accentColor} />
    </motion.div>
  );
}