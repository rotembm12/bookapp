import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import EditorPage from './pages/Editor/index.tsx';
import './index.css';
import ImageEditor from './pages/Editor/ImageEditor.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <EditorPage />,
    errorElement: <div>Not Found...</div>,
  },
  {
    path: '/editor/img',
    element: <ImageEditor />,
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
