import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import Editor from './components/Editor.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>Not Found...</div>,
  },
  {
    path: '/album:id',
    // element: <Album />,
  },
  {
    path: '/editor',
    element: <Editor />,
  },
  {
    path: '/album:id/editor',
    element: <Editor />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
