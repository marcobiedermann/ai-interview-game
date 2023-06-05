interface Quiz {
  question: string;
  answer: string;
  options: string[];
}

interface Error {
  message: string;
}

export type { Quiz, Error };
