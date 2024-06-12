import { Configuration, OpenAIApi } from "openai";

const APIKEY = process.env.OPENAI_API_KEY;

const configuration = new Configuration({
  apiKey: APIKEY,
});

const openai = new OpenAIApi(configuration);

export default openai;
