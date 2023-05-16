import { rest } from 'msw';

const response = {
  data: {
    id: 'cmpl-7Go9peuDuQkCM9wHF94ZKSz2LVlhW',
    object: 'text_completion',
    created: 1684240409,
    model: 'text-davinci-003',
    choices: [
      {
        text: '\n\n[\n  {\n    "Question": "What are the advantages of using JavaScript?",\n    "A": "It runs on the client side",\n    "B": "It is an interpreted language",\n    "C": "It is an object-oriented programming language",\n    "D": "All of the above",\n    "Answer": "D"\n  },\n  {\n    "Question": "What keyword is used to define a function in JavaScript?",\n    "A": "func",\n    "B": "create",\n    "C": "function",\n    "D": "define",\n    "Answer": "C"\n  },\n  {\n    "Question": "What type of data structure is an array in JavaScript?",\n    "A": "String",\n    "B": "Object",\n    "C": "Number",\n    "D": "Collection",\n    "Answer": "D"\n  },\n  {\n    "Question": "What keyword is used to compose a conditional statement in JavaScript?",\n    "A": "compare",\n    "B": "if",\n    "C": "select",\n    "D": "switch",\n    "Answer": "B"\n  },\n  {\n    "Question": "How do you call a function from another file in JavaScript?",\n    "A": "Include the file and call the function",\n    "B": "Declare the function globally",\n    "C": "Use the function keyword",\n    "D": "Import the function into the current file",\n    "Answer": "D"\n  }\n]',
        index: 0,
        logprobs: null,
        finish_reason: 'stop',
      },
    ],
    usage: {
      prompt_tokens: 11,
      completion_tokens: 359,
      total_tokens: 370,
    },
  },
  status: 200,
  statusText: '',
  headers: {
    'cache-control': 'no-cache, must-revalidate',
    'content-type': 'application/json',
  },
  config: {
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false,
    },
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'User-Agent': 'OpenAI/NodeJS/3.2.1',
      Authorization: 'Bearer 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',
    },
    method: 'post',
    data: '{"model":"text-davinci-003","prompt":"Give me 5 JavaScript multiple choice interview questions in JSON format","max_tokens":4000}',
    url: 'https://api.openai.com/v1/completions',
  },
  request: {},
};

export const handlers = [
  rest.post('https://api.openai.com/v1/completions', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(response));
  }),
];

// [
//   {
//     Question: 'What are the advantages of using JavaScript?',
//     A: 'It runs on the client side',
//     B: 'It is an interpreted language',
//     C: 'It is an object-oriented programming language',
//     D: 'All of the above',
//     Answer: 'D'
//   },
//   {
//     Question: 'What keyword is used to define a function in JavaScript?',
//     A: 'func',
//     B: 'create',
//     C: 'function',
//     D: 'define',
//     Answer: 'C'
//   },
//   {
//     Question: 'What type of data structure is an array in JavaScript?',
//     A: 'String',
//     B: 'Object',
//     C: 'Number',
//     D: 'Collection',
//     Answer: 'D'
//   },
//   {
//     Question: 'What keyword is used to compose a conditional statement in JavaScript?',
//     A: 'compare',
//     B: 'if',
//     C: 'select',
//     D: 'switch',
//     Answer: 'B'
//   },
//   {
//     Question: 'How do you call a function from another file in JavaScript?',
//     A: 'Include the file and call the function',
//     B: 'Declare the function globally',
//     C: 'Use the function keyword',
//     D: 'Import the function into the current file',
//     Answer: 'D'
//   }
// ]
