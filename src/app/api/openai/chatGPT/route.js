import { NextResponse } from "next/server";

import openai from "../../../../../openai";

export async function POST(req) {
  const { chat } = await req.json();

  console.log(chat);
  try {
    const gptRes = await openai.createChatCompletion({
      model: "gpt-4o",
      messages: chat,
    });

    const chatResponse = gptRes?.data?.choices[0]?.message?.content;

    return NextResponse.json({ chatResponse: chatResponse });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
