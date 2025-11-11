import './Header.css';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../router/routes.ts';
import IconShoppingBag from '../../assets/icons/shopping-bag.svg?react';
import IconCoffeeCup from '../../assets/icons/coffee-cup.svg?react';
import { cartStore } from '../../store/cartStore.ts';
import { useState } from 'react';
import clsx from 'clsx';
import { userStore } from '../../store/userStore.ts';
import { Button, ButtonStyle } from '../Button/Button.tsx';
import IconUser from '../../assets/icons/user.svg?react';
import { HashLink } from 'react-router-hash-link';

const navigationLinks = [
  {
    name: 'Favorite Coffee',
    path: '/#favorite-coffee',
  },
  {
    name: 'About',
    path: '/#about',
  },
  {
    name: 'Mobile app',
    path: '/#mobile-app',
  },
  {
    name: 'Contact us',
    path: '#contact-us',
  },
];

export function Header() {
  const { cartItems, removeAllItemsFromCart } = cartStore();
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const headerClassNames = clsx('header', { 'burger-opened': isBurgerOpen });
  const location = useLocation();
  const menuLinkClassName = location.pathname.includes('menu') ? 'active' : '';
  const { user, removeUser } = userStore();
  const [isUserIconOpened, setIsUserIconOpened] = useState(false);

  function renderHeaderLinks() {
    return (
      <nav>
        <ul className="navigation">
          {navigationLinks.map((link) => {
            return (
              <li key={link.name}>
                <HashLink smooth to={link.path} onClick={() => setIsBurgerOpen(false)}>
                  {link.name}
                </HashLink>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }

  function renderHeaderActions() {
    return (
      <div className="actions">
        <Link to={ROUTES.CART} className="item cart" onClick={() => setIsBurgerOpen(false)}>
          <IconShoppingBag />
          <span className="counter">{cartItems.length}</span>
        </Link>
        <Link
          to={ROUTES.MENU.replace(':category', 'coffee')}
          className={`item menu ${menuLinkClassName}`}
          onClick={() => setIsBurgerOpen(false)}
        >
          Menu
          <IconCoffeeCup />
        </Link>
        <div
          className={`user-container ${isUserIconOpened ? 'opened' : ''}`}
          onMouseEnter={() => setIsUserIconOpened(true)}
          onMouseLeave={() => setIsUserIconOpened(false)}
        >
          <IconUser />
          {isUserIconOpened && (
            <div className="buttons-container">
              {!!user && (
                <Button
                  style={ButtonStyle.Secondary}
                  onClick={() => {
                    removeUser();
                    setIsUserIconOpened(false);
                    setIsBurgerOpen(false);
                    removeAllItemsFromCart();
                  }}
                >
                  Sign Out
                </Button>
              )}
              {!user && (
                <>
                  <Link
                    to={ROUTES.LOGIN}
                    className="button secondary no-underline"
                    onClick={() => {
                      setIsUserIconOpened(false);
                      setIsBurgerOpen(false);
                    }}
                  >
                    Sign In
                  </Link>
                  <Link
                    to={ROUTES.REGISTER}
                    className="button secondary no-underline"
                    onClick={() => {
                      setIsUserIconOpened(false);
                      setIsBurgerOpen(false);
                    }}
                  >
                    Registration
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <header className={headerClassNames}>
      <Link className="logo no-underline" to={ROUTES.ROOT}>
        <img src="/logo.svg" alt="logo" />
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
