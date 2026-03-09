import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

let _openai: OpenAI | null = null;
const DEFAULT_TRANSCRIPTION_MODEL = process.env.OPENAI_TRANSCRIPTION_MODEL || "gpt-4o-mini-transcribe";
const FALLBACK_TRANSCRIPTION_MODEL = "whisper-1";

function getOpenAI() {
  if (!_openai) {
    _openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "" });
  }
  return _openai;
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const audio = form.get("audio");
    const language = "it";

    if (!(audio instanceof File)) {
      return NextResponse.json({ error: "Missing audio file" }, { status: 400 });
    }
    if (audio.size < 512) {
      return NextResponse.json({ error: "Audio too short" }, { status: 400 });
    }
    if (audio.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "Audio too large (max 10MB)" }, { status: 400 });
    }

    const transcribeWithModel = async (model: string, prompt?: string) =>
      getOpenAI().audio.transcriptions.create({
        model,
        file: audio,
        language,
        prompt,
        response_format: "text",
      });

    const transcribe = async (prompt?: string) => {
      try {
        return await transcribeWithModel(DEFAULT_TRANSCRIPTION_MODEL, prompt);
      } catch (error) {
        if (DEFAULT_TRANSCRIPTION_MODEL === FALLBACK_TRANSCRIPTION_MODEL) {
          throw error;
        }
        console.warn(`STT model ${DEFAULT_TRANSCRIPTION_MODEL} failed, retrying with ${FALLBACK_TRANSCRIPTION_MODEL}.`);
        return transcribeWithModel(FALLBACK_TRANSCRIPTION_MODEL, prompt);
      }
    };

    let text = String(await transcribe("Trascrizione in italiano. Non tradurre.") || "").trim();
    if (/[\u0400-\u04FF]/.test(text)) {
      text = String(await transcribe("Solo italiano. Ignora altre lingue e trascrivi foneticamente in italiano.") || "").trim();
    }
    return NextResponse.json({ text });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
