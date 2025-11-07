import './Header.css';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../router/routes.ts';
import IconShoppingBag from '../../../src/assets/icons/shopping-bag.svg?react';
import IconCoffeeCup from '../../../src/assets/icons/coffee-cup.svg?react';
import { menuStore } from '../../store/menuStore.ts';
import { useState } from 'react';
import clsx from 'clsx';

export function Header() {
  const { menuItems } = menuStore();
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const headerClassNames = clsx('header', { 'burger-opened': isBurgerOpen });
  const location = useLocation();
  const menuLinkClassName = location.pathname.includes('menu') ? 'not-active-link' : '';

  function renderHeaderLinks() {
    return (
      <nav>
        <ul className="navigation">
          <li>
            <Link to="#favorite-coffee">Favorite Coffee</Link>
          </li>
          <li>
            <Link to="#about">About</Link>
          </li>
          <li>
            <Link to="#mobile-app">Mobile app</Link>
          </li>
          <li>
            <Link to="#contact-us">Contact us</Link>
          </li>
        </ul>
      </nav>
    );
  }

  function renderHeaderActions() {
    return (
      <div className="actions">
        <Link to={ROUTES.CART} className="item cart">
          <IconShoppingBag />
          <span className="counter">{menuItems.length}</span>
        </Link>
        <Link to={ROUTES.MENU} className={`item menu ${menuLinkClassName}`}>
          Menu
          <IconCoffeeCup />
        </Link>
      </div>
    );
  }

  return (
    <header className={headerClassNames}>
      <Link className="logo no-underline" to={ROUTES.ROOT}>
        <img src="../../../src/assets/icons/logo.svg" alt="logo" />
      </Link>
      {renderHeaderLinks()}
      {renderHeaderActions()}

      <div className="burger-icon" onClick={() => setIsBurgerOpen(!isBurgerOpen)} />
      <div className="burger-content">
        {renderHeaderLinks()}
        {renderHeaderActions()}
      </div>
    </header>
  );
}
