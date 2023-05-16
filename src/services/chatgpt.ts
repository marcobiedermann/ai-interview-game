import { OpenAIApi, Configuration } from 'openai';
import { Quiz } from './domain/common';
import { z } from 'zod';

let openAiModule = null;

function initializeOpenAiModule(apiKey?: string) {
  openAiModule = new OpenAIApi(
    new Configuration({ apiKey: apiKey ?? import.meta.env.VITE_OPENAPI_API_KEY }),
  );
}

const responseSchema = z.object({});

async function askChatGPT(question: string, apiKey?: string): Promise<Quiz[]> {
  if (openAiModule == null) {
    initializeOpenAiModule(apiKey);
  }

  const quiz = await openAiModule.createCompletion({
    model: 'text-davinci-003',
    prompt: question,
    max_tokens: 4000,
  });
  const res = JSON.parse(quiz.data.data.choices[0].text);
  return res.map((obj) => ({
    question: obj.Question,
    answer: obj[obj.Answer],
    options: [obj.A, obj.B, obj.C, obj.D],
  }));
}

export { askChatGPT };
