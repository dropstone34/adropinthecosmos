import Link from "next/link";

interface ContentCardProps {
  eyebrow: string;
  title: string;
  href: string;
  excerpt: string;
  meta?: string;
  tags?: string[];
}

export default function ContentCard({ eyebrow, title, href, excerpt, meta, tags = [] }: ContentCardProps) {
  return (
    <Link
      href={href}
      style={{
        display: "block",
        border: "1px solid var(--border-dim)",
        borderRadius: "10px",
        padding: "18px",
        background: "rgba(15, 15, 26, 0.62)",
        textDecoration: "none",
        transition: "border-color var(--transition-fast), transform var(--transition-fast)",
      }}
    >
      <div
        style={{
          color: "var(--accent-drop)",
          fontSize: "11px",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          marginBottom: "10px",
        }}
      >
        {eyebrow}
      </div>
      <h2
        style={{
          color: "var(--text-primary)",
          fontSize: "18px",
          lineHeight: 1.35,
          marginBottom: "8px",
        }}
      >
        {title}
      </h2>
      <p style={{ color: "var(--text-muted)", fontSize: "13px", lineHeight: 1.75, marginBottom: "12px" }}>
        {excerpt}
      </p>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
        {meta ? <span style={{ color: "var(--text-dim)", fontSize: "11px" }}>{meta}</span> : null}
        {tags.map((tag) => (
          <span
            key={tag}
            style={{
              color: "var(--text-dim)",
              border: "1px solid var(--border-dim)",
              borderRadius: "999px",
              padding: "2px 8px",
              fontSize: "10px",
            }}
          >
            #{tag}
          </span>
        ))}
      </div>
    </Link>
  );
}