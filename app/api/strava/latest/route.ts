import { NextResponse } from "next/server";

export const revalidate = 300;

interface StravaTokenResponse {
  access_token?: string;
  message?: string;
}

interface StravaActivity {
  id: number;
  name: string;
  type: string;
  distance: number;
  moving_time: number;
  start_date: string;
  average_speed?: number;
  external_id?: string;
}

const requiredEnv = ["STRAVA_CLIENT_ID", "STRAVA_CLIENT_SECRET", "STRAVA_REFRESH_TOKEN"] as const;

function missingStravaEnv() {
  return requiredEnv.filter((key) => !process.env[key]);
}

function metersToKm(meters: number) {
  return Number((meters / 1000).toFixed(2));
}

function secondsToMinutes(seconds: number) {
  return Number((seconds / 60).toFixed(1));
}

export async function GET() {
  const missing = missingStravaEnv();

  if (missing.length > 0) {
    return NextResponse.json({
      configured: false,
      service: "strava",
      message: "Strava is ready to connect. Add the required environment variables in Vercel.",
      requiredEnv,
      missing,
    });
  }

  try {
    const tokenResponse = await fetch("https://www.strava.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.STRAVA_CLIENT_ID,
        client_secret: process.env.STRAVA_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: process.env.STRAVA_REFRESH_TOKEN,
      }),
      next: { revalidate: 300 },
    });

    const tokenData = (await tokenResponse.json()) as StravaTokenResponse;

    if (!tokenResponse.ok || !tokenData.access_token) {
      return NextResponse.json(
        {
          configured: true,
          service: "strava",
          error: tokenData.message ?? "Failed to refresh Strava token.",
        },
        { status: 502 }
      );
    }

    const activitiesResponse = await fetch("https://www.strava.com/api/v3/athlete/activities?per_page=1", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
      next: { revalidate: 300 },
    });

    if (!activitiesResponse.ok) {
      return NextResponse.json(
        {
          configured: true,
          service: "strava",
          error: "Failed to fetch Strava activities.",
        },
        { status: 502 }
      );
    }

    const activities = (await activitiesResponse.json()) as StravaActivity[];
    const latest = activities[0];

    if (!latest) {
      return NextResponse.json({
        configured: true,
        service: "strava",
        activity: null,
        message: "No recent activities found.",
      });
    }

    return NextResponse.json({
      configured: true,
      service: "strava",
      activity: {
        id: latest.id,
        name: latest.name,
        type: latest.type,
        distanceKm: metersToKm(latest.distance),
        movingTimeMinutes: secondsToMinutes(latest.moving_time),
        averagePaceMinPerKm: latest.average_speed
          ? Number((1000 / latest.average_speed / 60).toFixed(2))
          : null,
        startDate: latest.start_date,
      },
    });
  } catch {
    return NextResponse.json(
      {
        configured: true,
        service: "strava",
        error: "Strava request failed.",
      },
      { status: 500 }
    );
  }
}