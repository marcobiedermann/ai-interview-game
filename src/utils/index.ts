interface Attributes {
  numberOfQuestions?: number;
  difficulty?: 'easy' | 'hard';
  language?: 'javascript' | 'go' | 'python';
}

function getPrompt(attributes: Attributes): string {
  const { numberOfQuestions = 5, difficulty = 'easy', language = 'javascript' } = attributes;

  return `Give me ${numberOfQuestions} ${difficulty} ${language} multiple choice interview questions in JSON format`;
}

export { getPrompt };
