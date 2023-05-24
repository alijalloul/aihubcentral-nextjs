import { NextResponse } from 'next/server';

import openai from "../../../../../openai";
import fetchTextContentFromUrl from "../../../../functions/fetchTextContentFromUrl.js";

export async function POST(req: Request) {
    const {chat} = await req.json();

    return NextResponse.json({ chatResponse: chatResponse });
}