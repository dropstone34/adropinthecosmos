import { NextResponse } from "next/server";

export const revalidate = 60;

interface SpotifyTokenResponse {
  access_token?: string;
  error?: string;
}

interface SpotifyTrackResponse {
  is_playing?: boolean;
  item?: {
    name?: string;
    external_urls?: {
      spotify?: string;
    };
    artists?: Array<{ name?: string }>;
    album?: {
      name?: string;
      images?: Array<{ url?: string }>;
    };
  };
}

const requiredEnv = ["SPOTIFY_CLIENT_ID", "SPOTIFY_CLIENT_SECRET", "SPOTIFY_REFRESH_TOKEN"] as const;

function missingSpotifyEnv() {
  return requiredEnv.filter((key) => !process.env[key]);
}

export async function GET() {
  const missing = missingSpotifyEnv();

  if (missing.length > 0) {
    return NextResponse.json({
      configured: false,
      service: "spotify",
      message: "Spotify is ready to connect. Add the required environment variables in Vercel.",
      requiredEnv,
      missing,
    });
  }

  try {
    const basic = Buffer.from(
      `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
    ).toString("base64");

    const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: process.env.SPOTIFY_REFRESH_TOKEN ?? "",
      }),
      next: { revalidate: 60 },
    });

    const tokenData = (await tokenResponse.json()) as SpotifyTokenResponse;

    if (!tokenResponse.ok || !tokenData.access_token) {
      return NextResponse.json(
        {
          configured: true,
          service: "spotify",
          error: tokenData.error ?? "Failed to refresh Spotify token",
        },
        { status: 502 }
      );
    }

    const nowPlayingResponse = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
      next: { revalidate: 60 },
    });

    if (nowPlayingResponse.status === 204) {
      return NextResponse.json({
        configured: true,
        service: "spotify",
        isPlaying: false,
        message: "Nothing is playing right now.",
      });
    }

    if (!nowPlayingResponse.ok) {
      return NextResponse.json(
        {
          configured: true,
          service: "spotify",
          error: "Failed to fetch Spotify playback.",
        },
        { status: 502 }
      );
    }

    const data = (await nowPlayingResponse.json()) as SpotifyTrackResponse;

    return NextResponse.json({
      configured: true,
      service: "spotify",
      isPlaying: Boolean(data.is_playing),
      track: data.item?.name ?? null,
      artist: data.item?.artists?.map((artist) => artist.name).filter(Boolean).join(", ") ?? null,
      album: data.item?.album?.name ?? null,
      url: data.item?.external_urls?.spotify ?? null,
      image: data.item?.album?.images?.[0]?.url ?? null,
    });
  } catch {
    return NextResponse.json(
      {
        configured: true,
        service: "spotify",
        error: "Spotify request failed.",
      },
      { status: 500 }
    );
  }
}