import './CartPage.css';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../router/routes.ts';

export function CartPage() {
  return (
    <div>
      CartPage
      <Link to={ROUTES.REGISTER}>Register</Link>
      <Link to={ROUTES.LOGIN}>Login</Link>
    </div>
  );
}
