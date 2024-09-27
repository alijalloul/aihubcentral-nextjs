import { Configuration, OpenAI } from "openai";

const APIKEY = process.env.OPENAI_API_KEY;

const configuration = new Configuration({
  apiKey: APIKEY,
});

const openai = new OpenAI(configuration);

export default openai;
