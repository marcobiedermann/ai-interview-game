import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { Quiz } from '../domain/common';
import { askChatGPT } from '../services/chatgpt';

interface Error {
  message: string;
}

function useChatGPT(prompt: string, apiKey?: string): UseQueryResult<Quiz[], Error> {
  return useQuery<Quiz[], Error>({
    queryFn: () => askChatGPT(prompt, apiKey),
    queryKey: ['chat-gpt', prompt],
  });
}

export { useChatGPT };
