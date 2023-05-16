import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import SettingsPage from './Settings.tsx';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider, Route, Link } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/settings',
    element: <SettingsPage />,
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
          <RouterProvider router={router} />
        </QueryClientProvider>
      </React.StrictMode>,
    );
  }
}

main();
