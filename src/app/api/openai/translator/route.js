import { NextResponse } from "next/server";

import openai from "@/openai";

export async function POST(req) {
  const { langFrom, langTo, text } = await req.json();

  const chat = [
    {
      role: "user",
      content: `Translte ${text} from ${langFrom} to ${langTo}. ONLY GIVE THE TRANSLATION, NOTHING ELSE`,
    },
  ];
  console.log(chat);

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
