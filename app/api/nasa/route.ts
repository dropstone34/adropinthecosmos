import { NextResponse } from "next/server";

export const revalidate = 86400; // Cache for 24 hours

export async function GET() {
  try {
    // NASA APOD API — uses demo key for low traffic, replace with real key for production
    const apiKey = process.env.NASA_API_KEY || "DEMO_KEY";
    const res = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`,
      { next: { revalidate: 86400 } }
    );

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch APOD" }, { status: 502 });
    }

    const data = await res.json();

    return NextResponse.json({
      title: data.title,
      date: data.date,
      explanation: data.explanation?.slice(0, 300) + "...",
      url: data.url,
      hdurl: data.hdurl,
      mediaType: data.media_type,
      copyright: data.copyright || "NASA",
    });
  } catch {
    return NextResponse.json({ error: "Network error" }, { status: 500 });
  }
}