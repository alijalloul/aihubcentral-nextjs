import OpenAI from "openai";

const APIKEY = process.env.OPENAI_API_KEY;

if (!APIKEY) {
  throw new Error(
    "API key is missing. Please set OPENAI_API_KEY in your environment."
  );
}

const openai = new OpenAI({
  apiKey: APIKEY,
});

export default openai;
