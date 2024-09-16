import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import EditorPage from './pages/Editor/index.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>Not Found...</div>,
  },
  {
    path: '/editor',
    element: <EditorPage />,
    loader: async () => {
      const bookTree = (await import('@/assets/bookTree.json')).default;
      return bookTree;
    },
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
