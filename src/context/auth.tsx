import { createContext, ReactNode, useMemo } from 'react';
import { useLocalStorage } from 'react-use';

interface User {
  apiKey: string;
}

interface AuthContextType {
  user?: User;
  signIn: (newUser: string, callback: VoidFunction) => void;
  signOut: (callback: VoidFunction) => void;
}

const AuthContext = createContext<AuthContextType>({
  signIn: () => ({}),
  signOut: () => ({}),
});

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider(props: AuthProviderProps): JSX.Element {
  const [user, setUser, removeUser] = useLocalStorage<User>('auth');

  function signIn(apiKey: string, callback: VoidFunction) {
    setUser({
      apiKey,
    });
    callback();
  }

  function signOut(callback: VoidFunction): void {
    removeUser();
    callback();
  }

  const value = useMemo(
    () => ({
      user,
      signIn,
      signOut,
    }),
    [],
  );

  return <AuthContext.Provider value={value} {...props} />;
}

export type { AuthProviderProps, AuthContextType };
export { AuthContext };
export default AuthProvider;
