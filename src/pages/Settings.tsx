import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'react-use';
import { z } from 'zod';

const supportedLanguages = [
  {
    id: 'go',
    name: 'Go',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
  },
  {
    id: 'python',
    name: 'Python',
  },
  {
    id: 'rust',
    name: 'Rust',
  },
] as const;

const supportedNumberOfQuestions = [
  {
    id: 5,
    name: '5',
  },
  {
    id: 10,
    name: '10',
  },
  {
    id: 15,
    name: '15',
  },
];

const supportedDifficulties = [
  {
    id: 'easy',
    name: 'Easy',
  },
  {
    id: 'hard',
    name: 'Hard',
  },
] as const;

const formDataSchema = z.object({
  language: z.union([
    z.literal('go'),
    z.literal('javascript'),
    z.literal('python'),
    z.literal('rust'),
  ]),
  numberOfQuestions: z.union([z.literal(5), z.literal(10), z.literal(15)]),
  difficulty: z.union([z.literal('easy'), z.literal('hard')]),
});

type FormData = z.infer<typeof formDataSchema>;

const defaultSettings = {
  language: 'javascript',
  numberOfQuestions: 5,
  difficulty: 'easy',
} as const;

function SettingsPage() {
  const navigate = useNavigate();
  const [settings, setSettings] = useLocalStorage<FormData>('settings', defaultSettings);
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: settings,
    resolver: zodResolver(formDataSchema),
  });

  function onSubmit(data: FormData) {
    setSettings(data);
    navigate('/');
  }

  return (
    <div>
      <h1>Settings</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="form__fields">
          <div className="form__field">
            <label htmlFor="language">Language</label>
            <select id="language" {...register('language')}>
              {supportedLanguages.map((supportedLanguage) => (
                <option key={supportedLanguage.id} value={supportedLanguage.id}>
                  {supportedLanguage.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form__field">
            <label htmlFor="number-of-questions">Number of Questions</label>
            <select
              id="number-of-questions"
              {...register('numberOfQuestions', {
                setValueAs: (value) => parseInt(value, 10),
              })}
            >
              {supportedNumberOfQuestions.map((supportedNumberOfQuestion) => (
                <option key={supportedNumberOfQuestion.id} value={supportedNumberOfQuestion.id}>
                  {supportedNumberOfQuestion.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form__field">
            <label htmlFor="difficulty">Difficulty</label>
            <select id="difficulty" {...register('difficulty')}>
              {supportedDifficulties.map((supportedDifficulty) => (
                <option key={supportedDifficulty.id} value={supportedDifficulty.id}>
                  {supportedDifficulty.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className="button" type="submit">
          Save
        </button>
      </form>

      <p>
        <Link to="/">Back</Link>
      </p>
    </div>
  );
}

export type { FormData };
export { defaultSettings };
export default SettingsPage;
