import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

let _openai: OpenAI | null = null;
function getOpenAI() {
  if (!_openai) {
    _openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "" });
  }
  return _openai;
}

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    if (!text?.trim()) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }
    if (text.length > 1000) {
      return NextResponse.json({ error: "Text too long (max 1000 chars)" }, { status: 400 });
    }

    // Strip JSON blocks from text
    const clean = text.replace(/```json[\s\S]*?```/g, "").trim();
    if (!clean) {
      return NextResponse.json({ error: "No speakable text" }, { status: 400 });
    }

    const response = await getOpenAI().audio.speech.create({
      model: "gpt-4o-mini-tts",
      voice: "ash",
      input: `[Speaking naturally in Italian] ${clean}`,
      speed: 1.0,
    });

    const buffer = Buffer.from(await response.arrayBuffer());

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=86400", // cache 24h
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("TTS error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
