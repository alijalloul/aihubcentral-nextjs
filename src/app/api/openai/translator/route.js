import { NextResponse } from "next/server";

import openai from "@/openai";
import fetchTextContentFromUrl from "../../../../functions/fetchTextContentFromUrl.js";

export async function POST(req) {
  const { langFrom, langTo, text } =
    await req.json();

  const chat = [
    {
      role: "user",
      content: `Translte ${text} from ${langFrom} to ${langTo}`,
    },
  ];
  console.log(chat);

  const gptRes =
    await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: chat,
    });

  const chatResponse =
    gptRes?.data?.choices[0].message?.content;

  return NextResponse.json(chatResponse);
}
