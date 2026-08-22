import { NextResponse } from "next/server";

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  try {
    const res = await fetch("https://lichess.org/api/user/Dropstone34", {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch" }, { status: 502 });
    }

    const data = await res.json();

    const rating = {
      username: data.username,
      title: data.title || null,
      blitz: data.perfs?.blitz?.rating || null,
      rapid: data.perfs?.rapid?.rating || null,
      bullet: data.perfs?.bullet?.rating || null,
      classical: data.perfs?.classical?.rating || null,
      puzzle: data.perfs?.puzzle?.rating || null,
      games: data.count?.all || 0,
      online: data.online || false,
    };

    return NextResponse.json(rating);
  } catch {
    return NextResponse.json({ error: "Network error" }, { status: 500 });
  }
}