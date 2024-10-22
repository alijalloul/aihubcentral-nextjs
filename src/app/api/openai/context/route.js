import { NextResponse } from "next/server";

import openai from "@/openai";
import fetchTextContentFromUrl from "../../../../functions/fetchTextContentFromUrl.js";

export async function POST(req) {
  const { question, url } = await req.json();

  let chat;

  if (
    (url.trim().split(" ")[0].includes("wikipedia.org") ||
      url.trim().split(" ")[0].includes("openai.com")) &&
    url.trim().split(" ")[0].includes("http") &&
    url.trim().split(" ").length === 1
  ) {
    chat = [
      {
        role: "user",
        content: `From this text: "${url}", ${question}`,
      },
    ];
  } else if (url.trim().split(" ")[0].includes("http")) {
    chat = [
      {
        role: "user",
        content: `From this text: "${await fetchTextContentFromUrl(
          url
        )}", ${question}`,
      },
    ];
  } else {
    chat = [
      {
        role: "user",
        content: `From this text: "${url}", ${question}`,
      },
    ];
  }

  try {
    const gptRes = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: chat,
    });

    const chatResponse = gptRes?.choices[0]?.message?.content;

    return NextResponse.json({
      chatResponse: chatResponse,
    });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
