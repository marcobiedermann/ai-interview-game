interface Quiz {
  question: string;
  answer: number;
  options: Record<number, string>;
}

interface Error {
  message: string;
}

export { Quiz, Error };
