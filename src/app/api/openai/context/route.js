import { NextResponse } from "next/server";

import openai from "@/openai";
import fetchTextContentFromUrl from "../../../../functions/fetchTextContentFromUrl.js";

export async function POST(req) {
  const { question, url } = await req.json();

  let chat;

  if (
    (url
      .trim()
      .split(" ")[0]
      .includes("wikipedia.org") ||
      url
        .trim()
        .split(" ")[0]
        .includes("openai.com")) &&
    url.trim().split(" ")[0].includes("http") &&
    url.trim().split(" ").length === 1
  ) {
    chat = [
      {
        role: "user",
        content: `From this text: "${url}", ${question}`,
      },
    ];
  } else if (
    url.trim().split(" ")[0].includes("http")
  ) {
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

  const gptRes =
    await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: chat,
    });

  const chatResponse =
    gptRes?.data?.choices[0]?.message?.content;
  console.log(gptRes.data.usage);

  return NextResponse.json(chatResponse);
}
