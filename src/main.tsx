import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import RequireAuth from './components/RequireAuth.tsx';
import AuthProvider from './context/auth.tsx';
import './index.css';
import App from './pages/App.tsx';
import LoginPage from './pages/Login.tsx';
import SettingsPage from './pages/Settings.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" />,
  },
  {
    element: <RequireAuth />,
    children: [
      {
        path: '/quiz',
        element: <App />,
      },
      {
        path: '/settings',
        element: <SettingsPage />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);

const isDevelopment = import.meta.env.DEV;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

async function main() {
  if (isDevelopment) {
    const { worker } = await import('./mocks/browser');

    await worker.start();

    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </QueryClientProvider>
      </React.StrictMode>,
    );
  }
}

main();
