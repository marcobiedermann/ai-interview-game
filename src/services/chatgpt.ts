import { Configuration, OpenAIApi } from 'openai';
import { Quiz } from '../domain/common';

let openAiModule: OpenAIApi | null = null;

function initializeOpenAiModule(apiKey?: string) {
  openAiModule = new OpenAIApi(
    new Configuration({ apiKey: apiKey ?? import.meta.env.VITE_OPENAPI_API_KEY }),
  );
}

interface Question {
  Question: string;
  Answer: keyof Question;
  A: string;
  B: string;
  C: string;
  D: string;
}

async function askChatGPT(question: string, apiKey?: string): Promise<Quiz[]> {
  if (!openAiModule) {
    initializeOpenAiModule(apiKey);
  }

  const quiz = await openAiModule!.createCompletion({
    model: 'text-davinci-003',
    prompt: question,
    max_tokens: 4000,
  });
  const res = JSON.parse(quiz.data.choices.at(0)?.text || '') as Question[];

  return res.map((obj) => ({
    question: obj.Question,
    answer: obj[obj.Answer],
    options: [obj.A, obj.B, obj.C, obj.D],
  }));
}

export { askChatGPT };
