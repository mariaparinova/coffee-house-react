import { ROUTES } from './routes.ts';
import App from '../App.tsx';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [],
  },
]);
