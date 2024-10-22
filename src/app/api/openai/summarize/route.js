import { NextResponse } from "next/server";

import openai from "@/openai";
import fetchTextContentFromUrl from "../../../../functions/fetchTextContentFromUrl.js";

export async function POST(req) {
  const { url } = await req.json();

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
        content: `Summarize: "${url}" and then translate the summary to its original language. Only give me the original language summarization`,
      },
    ];
  } else if (url.trim().split(" ")[0].includes("http")) {
    chat = [
      {
        role: "user",
        content: `Summarize: "${await fetchTextContentFromUrl(
          url
        )}" and then translate the summary to its original language. Only give me the original language summarization`,
      },
    ];
  } else {
    chat = [
      {
        role: "user",
        content: `Summarize: "${url}" and then translate the summary to its original language. Only give me the original language summarization`,
      },
    ];
  }

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
