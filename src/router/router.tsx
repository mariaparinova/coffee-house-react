import { ROUTES } from './routes.ts';
import { createBrowserRouter } from 'react-router-dom';
import { CartPage } from '../pages/CartPage/CartPage.tsx';
import { HomePage } from '../pages/HomePage/HomePage.tsx';
import { MenuPage } from '../pages/MenuPage/MenuPage.tsx';
import { App } from '../App.tsx';

export const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: ROUTES.CART,
        element: <CartPage />,
      },
      {
        path: ROUTES.MENU,
        element: <MenuPage />,
      },
    ],
  },
]);
