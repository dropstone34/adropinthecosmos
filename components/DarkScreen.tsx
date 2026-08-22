export default function DarkScreen() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#0A0A0F",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      <svg
        width="32"
        height="40"
        viewBox="0 0 32 40"
        style={{
          filter: "drop-shadow(0 0 12px rgba(123, 104, 238, 0.8))",
          animation: "drop-fall 3s ease-in-out infinite",
        }}
      >
        <path
          d="M16 2 C16 2, 28 18, 28 26 C28 33.2, 22.6 38, 16 38 C9.4 38, 4 33.2, 4 26 C4 18, 16 2, 16 2 Z"
          fill="rgba(123, 104, 238, 0.1)"
          stroke="#7B68EE"
          strokeWidth="1.5"
        />
      </svg>
      <div
        style={{
          color: "#2A2A4A",
          fontSize: "11px",
          marginTop: "16px",
          letterSpacing: "0.2em",
        }}
      >
        dropstone.in
      </div>
    </div>
  );
}