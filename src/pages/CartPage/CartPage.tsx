import './CartPage.css';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../router/routes.ts';
import IconTrash from '../../../src/assets/icons/trash.svg?react';
import { cartStore } from '../../store/cartStore.ts';
import { Prices } from '../../components/Prices/Prices.tsx';
import { userStore } from '../../store/userStore.ts';
import { Button, ButtonStyle } from '../../components/Button/Button.tsx';
import { useState } from 'react';
import { sendOrder } from '../../data-access/coffee-shop-api/coffee-shop-api.repository.ts';
import { Notification } from '../../components/Notification/Notification.tsx';
import { ERROR_MESSAGES } from '../../constants/validation-messages.ts';
import { Spinner } from '../../components/Spinner/Spinner.tsx';

export function CartPage() {
  const { cartItems, removeAllItemsFromCart, removeItemFromCart, prise } = cartStore();
  const { user } = userStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const renderCartItems = () => {
    return cartItems.map((menuItem) => {
      const imagePath = `../../../src/assets/images/${menuItem.category}/${menuItem.name.toLowerCase().replace(/\s+/g, '-')}.jpg`;
      const additivesStr = menuItem.additiveNames.join(', ');

      const handleRemoveMenuItem = () => {
        removeItemFromCart(menuItem.idInOrder);
      };

      return (
        <div key={menuItem.id} className="item">
          <div className="to-trash" onClick={handleRemoveMenuItem}>
            <IconTrash />
          </div>
          <div className="img-container">
            <img className="img" alt={menuItem.name} src={imagePath} />
            <div className="details">
              <h3>{menuItem.name}</h3>
              <span className="size">{menuItem.weightInGram}</span>
              <span className="additives">{additivesStr}</span>
            </div>
          </div>
          <Prices regularPrice={menuItem.regularPrice} discountPrice={menuItem.discountPrice} />
        </div>
      );
    });
  };

  const renderUserData = () => {
    if (!user) {
      return;
    }

    return (
      <div className="user-data">
        <div className="cart-details-item">
          <h3>Address</h3>
          <div className="address-data">
            <h3>{user.city},</h3>
            <h3>{user.street},</h3>
            <h3>{user.houseNumber}</h3>
          </div>
        </div>
        <div className="cart-details-item">
          <h3>Payment method</h3>
          <h3>{user.paymentMethod}</h3>
        </div>
      </div>
    );
  };

  const renderLoginRegisterButtons = () => {
    return (
      <div className="buttons-container">
        <Link to={ROUTES.LOGIN} className="button secondary no-underline">
          Sign In
        </Link>
        <Link to={ROUTES.REGISTER} className="button secondary no-underline">
          Registration
        </Link>
      </div>
    );
  };

  const renderConfirmButton = () => {
    const handleConfirm = async () => {
      const orderItems = cartItems.map((item) => {
        return {
          productId: item.id,
          size: item.weightInGram,
          additives: item.additiveNames,
          quantity: 1,
        };
      });

      const order = {
        items: orderItems,
        totalPrice: prise.discounted || prise.regular,
      };

      try {
        await sendOrder(order);
        removeAllItemsFromCart();
        setIsSuccess(true);
        setIsError(false);
      } catch {
        setIsSuccess(false);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <Button style={ButtonStyle.Secondary} onClick={handleConfirm}>
        Confirm
      </Button>
    );
  };

  return (
    <div className="cart-page">
      {isError && <Notification textContent={ERROR_MESSAGES.SMTH_WENT_WRONG_TRY_AGAIN} />}
      <h2>Cart</h2>
      <div className="ordered-items-container">
        {isLoading && (
          <div className="bg overlay">
            <Spinner />
          </div>
        )}
        {cartItems.length > 0 && renderCartItems()}
        {isSuccess && (
          <p className="success-order-message">
            Thank you for your order! Our manager will contact you shortly
          </p>
        )}
      </div>
      <div className="cart-details">
        <div className="cart-details-item">
          <h3>Total:</h3>
          <Prices regularPrice={prise.regular} discountPrice={prise.discounted} />
        </div>
        {user && renderUserData()}
      </div>
      {!!user && !!cartItems.length && renderConfirmButton()}
      {!user && renderLoginRegisterButtons()}
    </div>
  );
}
