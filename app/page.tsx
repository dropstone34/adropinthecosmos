"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { ContentNode } from "@/data/index";
import DarkScreen from "@/components/DarkScreen";
import MobileView from "@/components/MobileView";

const BootSequence = dynamic(() => import("@/components/BootSequence"), {
  ssr: false,
  loading: () => <DarkScreen />,
});

const DesktopExperience = dynamic(() => import("@/components/DesktopExperience"), {
  ssr: false,
  loading: () => <DarkScreen />,
});

const ConstellationPanel = dynamic(() => import("@/components/ConstellationPanel"), {
  ssr: false,
  loading: () => null,
});

function SEOContent() {
  return (
    <div
      aria-hidden="false"
      style={{
        position: "absolute",
        width: "1px",
        height: "1px",
        overflow: "hidden",
        clip: "rect(0,0,0,0)",
        whiteSpace: "nowrap",
      }}
    >
      <h1>Prakhar — Software Engineer, a drop in the cosmos</h1>
      <p>
        Software Engineer at Qualcomm working on Agentic AI and Bluetooth systems.
        Chess player on Lichess (Dropstone34). Runner. Reader of Nietzsche, Dostoevsky,
        Frankl, Orwell, Pessoa. Interested in astrophysics, philosophy, geopolitics,
        tiki-taka football, Formula 1, and the Fermi Paradox.
      </p>
      <nav>
        <a href="/hire">Hire Prakhar</a>
        <a href="/about">About</a>
      </nav>
    </div>
  );
}

export default function Home() {
  const [booted, setBooted] = useState(false);
  const [activeNode, setActiveNode] = useState<ContentNode | null>(null);
  const [activeConstellation, setActiveConstellation] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [lichessRating, setLichessRating] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [mounted]);

  useEffect(() => {
    fetch("/api/lichess")
      .then((r) => r.json())
      .then((data) => {
        if (data.rapid) setLichessRating(data.rapid);
        else if (data.blitz) setLichessRating(data.blitz);
      })
      .catch(() => {});
  }, []);

  const handleNodeOpen = useCallback((node: ContentNode) => {
    setActiveNode(node);
    setActiveConstellation(node.constellation);
  }, []);

  const handlePanelClose = useCallback(() => {
    setActiveNode(null);
    setActiveConstellation(null);
  }, []);

  const handleConstellationFocus = useCallback((constellation: string | null) => {
    setActiveConstellation(constellation);
  }, []);

  const handleBootComplete = useCallback(() => setBooted(true), []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handlePanelClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handlePanelClose]);

  if (!mounted) return <DarkScreen />;

  if (isMobile) {
    return (
      <>
        <SEOContent />
        <MobileView onNodeOpen={handleNodeOpen} />
        <ConstellationPanel node={activeNode} onClose={handlePanelClose} lichessRating={lichessRating} />
      </>
    );
  }

  return (
    <>
      <SEOContent />

      {!booted && <BootSequence onComplete={handleBootComplete} />}

      {booted && (
        <>
          <DesktopExperience
            onNodeOpen={handleNodeOpen}
            onConstellationFocus={handleConstellationFocus}
            activeConstellation={activeConstellation}
            onClose={handlePanelClose}
            lichessRating={lichessRating}
          />
          <ConstellationPanel
            node={activeNode}
            onClose={handlePanelClose}
            lichessRating={lichessRating}
          />
        </>
      )}
    </>
  );
}