import { NextResponse } from "next/server";
import { getQuoteOfTheDay } from "@/lib/content";

export async function GET() {
  return NextResponse.json(getQuoteOfTheDay());
}