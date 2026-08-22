import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "a drop in the cosmos",
  description:
    "Software Engineer at Qualcomm (Agentic AI & Bluetooth). Reader, runner, chess player, astrophysics enthusiast. Exploring the intersection of technology, philosophy, and the cosmos.",
  keywords: [
    "Prakhar",
    "Dropstone",
    "Software Engineer",
    "Qualcomm",
    "Agentic AI",
    "Bluetooth",
    "Chess",
    "Astrophysics",
    "Philosophy",
    "Nietzsche",
    "Cruyff",
    "Running",
    "dropstone.in",
  ],
  metadataBase: new URL("https://dropstone.in"),
  authors: [{ name: "Prakhar" }],
  creator: "Prakhar",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://dropstone.in",
    siteName: "dropstone.in",
    title: "a drop in the cosmos",
    description:
      "Prakhar — Software Engineer at Qualcomm. Reader, runner, chess player. A drop in the cosmos.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "dropstone.in — a drop in the cosmos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "a drop in the cosmos",
    description:
      "Software Engineer at Qualcomm. Reader, runner, chess player. A drop in the cosmos.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0F",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Prakhar",
              url: "https://dropstone.in",
              jobTitle: "Software Engineer",
              worksFor: {
                "@type": "Organization",
                name: "Qualcomm",
              },
              description:
                "Software Engineer at Qualcomm working on Agentic AI and Bluetooth. Passionate about astrophysics, philosophy, chess, and literature.",
              sameAs: [
                "https://lichess.org/@/Dropstone34",
                "https://ratings.fide.com/profile/531000363",
                "https://github.com/dropstone34",
                "https://www.linkedin.com/in/prakhar34",
              ],
              knowsAbout: [
                "Agentic AI",
                "Bluetooth Engineering",
                "Astrophysics",
                "Philosophy",
                "Chess",
                "Literature",
              ],
            }),
          }}
        />
      </head>
      <body className="scanlines">
        {children}
      </body>
    </html>
  );
}