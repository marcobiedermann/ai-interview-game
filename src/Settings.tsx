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
    id: '5',
    name: '5',
  },
  {
    id: '10',
    name: '10',
  },
  {
    id: '15',
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
  apiKey: z.string(),
  language: z.union(supportedLanguages.map((supportedLanguage) => z.literal(supportedLanguage.id))),
  numberOfQuestions: z.number().int(),
  difficulty: z.union(
    supportedDifficulties.map((supportedDifficulty) => z.literal(supportedDifficulty.id)),
  ),
});

type FormData = z.infer<typeof formDataSchema>;

const defaultSettings = {
  apiKey: import.meta.env.VITE_OPENAPI_API_KEY,
  language: 'javascript',
  numberOfQuestions: 5,
  difficulty: 'easy',
} as const;

function SettingsPage() {
  const navigate = useNavigate();
  const [settings, setSettings] = useLocalStorage<FormData>('settings', defaultSettings);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: settings,
    resolver: zodResolver(formDataSchema),
  });

  console.log({ errors });

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
            <label htmlFor="api-key">API Key</label>
            <input id="api-key" type="text" className="form__input--text" {...register('apiKey')} />
          </div>

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

export { defaultSettings };
export default SettingsPage;
