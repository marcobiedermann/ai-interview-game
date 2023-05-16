import { useForm } from 'react-hook-form';
import './App.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { isError, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import clsx from 'clsx';
import { Quiz } from './domain/common';
import { askChatGPT } from './services/chatgpt';
import { getPrompt } from './utils';
import { useLocalStorage } from 'react-use';
import { defaultSettings } from './Settings';
import { useChatGPT } from './hooks/chat-gpt';

const formDataSchema = z.object({
  answer: z.string(),
});

type FormData = z.infer<typeof formDataSchema>;

function App() {
  const [settings] = useLocalStorage('settings', defaultSettings);
  const prompt = getPrompt(settings!);
  const { data: questions, error, isError, isLoading } = useChatGPT(prompt, settings?.apiKey!);
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(formDataSchema),
  });
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  if (isLoading) {
    return <div>Loading …</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  function onSubmit(data: FormData) {
    const { answer } = data;

    if (answer === question.answer) {
      console.log('Correct!');
    } else {
      console.log('Wrong Answer');
    }
  }

  function toggleShowAnswer() {
    setShowAnswer(!showAnswer);
  }

  const question = questions.at(currentQuestion)!;

  return (
    <div>
      <h1>AI Interview Quiz</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <fieldset>
          <legend>{question.question}</legend>
          <div className="form__fields">
            {question.options.map((option) => (
              <div
                key={option}
                className={clsx('form__field', {
                  answer: showAnswer && option === question.answer,
                })}
              >
                <label htmlFor={option}>{option}</label>
                <input value={option} id={option} type="radio" {...register('answer')} />
              </div>
            ))}
          </div>
        </fieldset>

        <button type="submit" className="button">
          Submit
        </button>
      </form>

      <div>
        <button
          disabled={currentQuestion + 1 === settings.numberOfQuestions}
          onClick={() => setCurrentQuestion(currentQuestion + 1)}
        >
          skip
        </button>
        {showAnswer ? (
          <button onClick={() => toggleShowAnswer()}>hide answer</button>
        ) : (
          <button onClick={() => toggleShowAnswer()}>show answer</button>
        )}
      </div>

      <p>
        <Link to="/settings">Settings</Link>
      </p>
    </div>
  );
}

export default App;
