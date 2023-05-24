import { NextResponse } from 'next/server';

import openai from "../../../../../openai";

export async function POST(req) {
    const {chat} = await req.json();

    const gptRes = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: chat
    });

    const chatResponse = gptRes?.data?.choices[0]?.message?.content;

    
    return NextResponse.json({ chatResponse: chatResponse });
}