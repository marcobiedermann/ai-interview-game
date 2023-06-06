import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import useAuth from '../hooks/auth';
import { useLocalStorage } from 'react-use';

const formDataSchema = z.object({
  apiKey: z.string(),
  isMocked: z.boolean(),
});

type FormData = z.infer<typeof formDataSchema>;

function LoginPage() {
  const navigate = useNavigate();
  const { signIn, user } = useAuth();
  const [settings, setSettings] = useLocalStorage<Pick<FormData, 'isMocked'>>('settings');
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      apiKey: user?.apiKey,
    },
    resolver: zodResolver(formDataSchema),
  });

  function onSubmit(data: FormData) {
    const { apiKey, isMocked } = data;

    signIn(apiKey, () => {
      navigate('/quiz');
    });
    setSettings({
      ...settings,
      isMocked,
    });
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="form__fields">
          <div className="form__field">
            <label htmlFor="api-key">API Key</label>
            <input id="api-key" type="text" className="form__input--text" {...register('apiKey')} />
          </div>

          <div className="form__field">
            <label htmlFor="is-mocked">Mock API</label>
            <input
              id="is-mocked"
              type="checkbox"
              className="form__input--text"
              {...register('isMocked')}
            />
          </div>
        </div>
        <button className="button" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
