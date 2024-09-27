import { NextResponse } from "next/server";

import openai from "@/openai";
export async function POST(req) {
  const { prompt, nbImages, resolution } =
    await req.json();

  console.log(prompt);

  const dalleRes = await openai.images.generate({
    model: "dall-e-2",
    prompt: prompt,
    n: parseInt(nbImages),
    size: `${resolution}x${resolution}`,
    response_format: "b64_json",
  });

  const images = [];
  dalleRes.data.forEach((image) => {
    images.push(
      `data:image/jpeg;base64,${image.b64_json}`
    );
  });

  return NextResponse.json({ images: images });
}
