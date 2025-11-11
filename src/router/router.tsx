import { ROUTES } from './routes.ts';
import { createBrowserRouter } from 'react-router-dom';
import { CartPage } from '../pages/CartPage/CartPage.tsx';
import { HomePage } from '../pages/HomePage/HomePage.tsx';
import { MenuPage } from '../pages/MenuPage/MenuPage.tsx';
import { App } from '../App.tsx';
import { RegistrationPage } from '../pages/RegistrationPage/RegistrationPage.tsx';
import { LoginPage } from '../pages/LoginPage/LoginPage.tsx';
import { DetailedCard } from '../pages/MenuPage/DetailedCard/DetailedCard.tsx';

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
        children: [
          {
            path: ROUTES.DETAILED_MENU_ITEM,
            element: <DetailedCard />,
          },
        ],
      },
      { path: ROUTES.REGISTER, element: <RegistrationPage /> },
      { path: ROUTES.LOGIN, element: <LoginPage /> },
    ],
  },
]);
