import { NextResponse } from "next/server";

import openai from "@/openai";
export async function POST(req) {
  const { prompt, nbImages, resolution } =
    await req.json();

  console.log(prompt);

  const dalleRes = await openai.createImage({
    prompt: prompt,
    n: parseInt(nbImages),
    size: `${resolution}x${resolution}`,
    response_format: "b64_json",
  });
  console.log(dalleRes.data.data.length);

  const images = [];
  dalleRes.data.data.forEach((image) => {
    images.push(
      `data:image/jpeg;base64,${image.b64_json}`
    );
  });

  return NextResponse.json({ images: images });
}
