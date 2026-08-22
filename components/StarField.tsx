"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { allNodes, ContentNode } from "@/data/index";

interface Star {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  pulsePhase: number;
  pulseSpeed: number;
  node: ContentNode;
  isDiscoverable: boolean;
  discovered: boolean;
}

interface BackgroundStar {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinklePhase: number;
  twinkleSpeed: number;
}

interface Tooltip {
  x: number;
  y: number;
  text: string;
  visible: boolean;
}

interface StarFieldProps {
  onNodeClick: (node: ContentNode) => void;
  activeConstellation: string | null;
  isMobile: boolean;
}

const CONSTELLATION_COLORS: Record<string, string> = {
  drop: "#7B68EE",
  build: "#7B68EE",
  mind: "#FFD700",
  cosmos: "#00D4FF",
  arena: "#00FF88",
};

const DISCOVERABLE_IDS = ["chess-rating", "running", "cosmos-scale", "mans-search", "qualcomm"];

function hexToRgba(hex: string, a: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export default function StarField({ onNodeClick, activeConstellation, isMobile }: StarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const bgStarsRef = useRef<BackgroundStar[]>([]);
  const animFrameRef = useRef<number>(0);
  const hoveredStarRef = useRef<Star | null>(null);
  const activeConstellationRef = useRef<string | null>(activeConstellation);
  const [tooltip, setTooltip] = useState<Tooltip>({ x: 0, y: 0, text: "", visible: false });

  useEffect(() => {
    activeConstellationRef.current = activeConstellation;
  }, [activeConstellation]);

  const initStars = useCallback((width: number, height: number) => {
    const bgCount = Math.floor((width * height) / 8000);
    bgStarsRef.current = Array.from({ length: bgCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.2 + 0.2,
      opacity: Math.random() * 0.5 + 0.1,
      twinklePhase: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.008 + 0.002,
    }));

    const centerX = width / 2;
    const centerY = height / 2;

    const constellationGroups: Record<string, ContentNode[]> = {};
    allNodes.forEach((node) => {
      if (!constellationGroups[node.constellation]) {
        constellationGroups[node.constellation] = [];
      }
      constellationGroups[node.constellation].push(node);
    });

    const constellationPositions: Record<string, { cx: number; cy: number }> = {
      drop: { cx: centerX, cy: centerY },
      build: { cx: centerX + width * 0.28, cy: centerY - height * 0.18 },
      mind: { cx: centerX - width * 0.28, cy: centerY - height * 0.12 },
      cosmos: { cx: centerX + width * 0.05, cy: centerY - height * 0.32 },
      arena: { cx: centerX + width * 0.1, cy: centerY + height * 0.28 },
    };

    const newStars: Star[] = [];
    Object.entries(constellationGroups).forEach(([constellation, nodes]) => {
      const pos = constellationPositions[constellation] || { cx: centerX, cy: centerY };
      const spread = constellation === "drop" ? 60 : 140;

      nodes.forEach((node, i) => {
        const angle = (i / nodes.length) * Math.PI * 2 + Math.random() * 0.5;
        const dist = node.weight < 0.5 ? spread * 0.6 : spread * (0.3 + Math.random() * 0.7);
        const x = pos.cx + Math.cos(angle) * dist * (0.6 + Math.random() * 0.8);
        const y = pos.cy + Math.sin(angle) * dist * (0.6 + Math.random() * 0.8);

        newStars.push({
          id: node.id,
          x: Math.max(40, Math.min(width - 40, x)),
          y: Math.max(40, Math.min(height - 40, y)),
          vx: (Math.random() - 0.5) * 0.08,
          vy: (Math.random() - 0.5) * 0.08,
          radius: 2 + node.weight * 4,
          opacity: 0.4 + node.weight * 0.5,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.015 + Math.random() * 0.01,
          node,
          isDiscoverable: DISCOVERABLE_IDS.includes(node.id),
          discovered: false,
        });
      });
    });

    starsRef.current = newStars;
  }, []);

  // Main animation loop — all in one effect, reads from refs
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars(canvas.width, canvas.height);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    function draw() {
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const { width, height } = canvas;
      const activeCons = activeConstellationRef.current;
      const hovered = hoveredStarRef.current;

      ctx.clearRect(0, 0, width, height);

      // Background stars
      bgStarsRef.current.forEach((star) => {
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = Math.sin(star.twinklePhase) * 0.15;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, star.opacity + twinkle)})`;
        ctx.fill();
      });

      const stars = starsRef.current;

      // Constellation lines
      stars.forEach((star) => {
        if (activeCons && star.node.constellation !== activeCons) return;

        star.node.connections.forEach((connId) => {
          const connStar = stars.find((s) => s.id === connId);
          if (!connStar) return;
          if (activeCons && connStar.node.constellation !== activeCons) return;

          const isHighlighted =
            hovered &&
            (hovered.id === star.id ||
              hovered.id === connId ||
              hovered.node.connections.includes(star.id) ||
              hovered.node.connections.includes(connId));

          const alpha = isHighlighted ? 0.5 : activeCons ? 0.2 : 0.08;
          const color = CONSTELLATION_COLORS[star.node.constellation] || "#7B68EE";

          ctx.beginPath();
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(connStar.x, connStar.y);
          ctx.strokeStyle = hexToRgba(color, alpha);
          ctx.lineWidth = isHighlighted ? 1 : 0.5;
          ctx.stroke();
        });
      });

      // Content stars
      stars.forEach((star) => {
        star.pulsePhase += star.pulseSpeed;
        star.x += star.vx;
        star.y += star.vy;

        if (star.x < 20 || star.x > width - 20) star.vx *= -1;
        if (star.y < 20 || star.y > height - 20) star.vy *= -1;

        const isHovered = hovered?.id === star.id;
        const isConnected =
          hovered &&
          (hovered.node.connections.includes(star.id) ||
            star.node.connections.includes(hovered.id));
        const isInActive = !activeCons || star.node.constellation === activeCons;
        const constellationAlpha = isInActive ? 1 : 0.12;

        const isPulsing = star.isDiscoverable && !star.discovered && !activeCons;
        const pulseScale = isPulsing
          ? 1 + Math.sin(star.pulsePhase) * 0.4
          : isHovered
          ? 1.6
          : isConnected
          ? 1.2
          : 1;

        const baseOpacity = star.opacity * constellationAlpha;
        const finalOpacity = isHovered ? 1 : isConnected ? 0.9 : baseOpacity;

        const color = star.node.color || CONSTELLATION_COLORS[star.node.constellation] || "#7B68EE";
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        const radius = star.radius * pulseScale;

        // Glow
        if (isHovered || isPulsing) {
          const glowRadius = radius * 3;
          const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, glowRadius);
          gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${finalOpacity * 0.4})`);
          gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
          ctx.beginPath();
          ctx.arc(star.x, star.y, glowRadius, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        // Core
        ctx.beginPath();
        ctx.arc(star.x, star.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${finalOpacity})`;
        ctx.fill();

        // Bright center
        ctx.beginPath();
        ctx.arc(star.x, star.y, radius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${finalOpacity * 0.8})`;
        ctx.fill();
      });

      animFrameRef.current = requestAnimationFrame(draw);
    }

    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [initStars]);

  const getStarAtPoint = useCallback((x: number, y: number): Star | null => {
    let closest: Star | null = null;
    let closestDist = 20;

    starsRef.current.forEach((star) => {
      const dx = star.x - x;
      const dy = star.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < closestDist) {
        closestDist = dist;
        closest = star;
      }
    });

    return closest;
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const star = getStarAtPoint(x, y);
      hoveredStarRef.current = star;

      if (star) {
        setTooltip({ x: e.clientX, y: e.clientY, text: star.node.tooltip, visible: true });
        if (canvasRef.current) canvasRef.current.style.cursor = "pointer";
      } else {
        setTooltip((prev) => ({ ...prev, visible: false }));
        if (canvasRef.current) canvasRef.current.style.cursor = "default";
      }
    },
    [getStarAtPoint]
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const star = getStarAtPoint(x, y);
      if (star) {
        star.discovered = true;
        onNodeClick(star.node);
      }
    },
    [getStarAtPoint, onNodeClick]
  );

  const handleMouseLeave = useCallback(() => {
    hoveredStarRef.current = null;
    setTooltip({ x: 0, y: 0, text: "", visible: false });
  }, []);

  if (isMobile) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="star-field-canvas interactive"
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        onMouseLeave={handleMouseLeave}
      />
      {tooltip.visible && (
        <div className="star-tooltip" style={{ left: tooltip.x, top: tooltip.y }}>
          {tooltip.text}
        </div>
      )}
    </>
  );
}