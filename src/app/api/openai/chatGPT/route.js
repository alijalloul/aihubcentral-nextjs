import { NextResponse } from "next/server";

import openai from "@/openai";

export async function POST(req) {
  const { chat } = await req.json();

  try {
    const gptRes = await openai.chat.completions.create({
      messages: chat,

      model: "gpt-4o-mini",
    });

    const chatResponse = gptRes?.choices[0]?.message?.content;

    return NextResponse.json({
      chatResponse: chatResponse,
    });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
