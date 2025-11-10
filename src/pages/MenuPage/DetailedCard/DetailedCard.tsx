import './DetailedCard.css';
import { getMenuItemById } from '../../../data-access/coffee-shop-api/coffee-shop-api.repository.ts';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '../../../components/Spinner/Spinner.tsx';
import { Prices } from '../../../components/Prices/Prices.tsx';
import { ROUTES } from '../../../router/routes.ts';
import { Button, ButtonStyle } from '../../../components/Button/Button.tsx';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { menuPageStore } from '../../../store/menuPageStore.ts';
import { cartStore } from '../../../store/cartStore.ts';
import { getImgPath } from '../../../utils/getImagePath.ts';

export function DetailedCard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { category } = useParams();
  const [totalPrice, setTotalPrice] = useState({
    previousSizeRegularPrice: 0,
    previousSizeDiscountPrice: 0,
    totalRegularPrice: 0,
    totalDiscountedPrice: 0,
  });

  const { isPending, isError, data } = useQuery({
    queryKey: ['menu-item', id],
    queryFn: () => getMenuItemById(Number(id)),
    retry: false,
  });

  const [activeSize, setActiveSize] = useState<string>('');
  const [activeAdditives, setActiveAdditives] = useState<string[]>([]);

  const { setIsErrorDuringRenderingDetailedCard } = menuPageStore();
  const { addItemToCart } = cartStore();

  useEffect(() => {
    if (data) {
      const sizes = Object.entries(data.sizes);

      setActiveSize(sizes[0][0]);

      const newSizeRegularPrice = +sizes[0][1].price;
      const newSizeDiscountPrice = sizes[0][1].discountPrice
        ? +sizes[0][1].discountPrice
        : newSizeRegularPrice;

      setTotalPrice({
        previousSizeRegularPrice: newSizeRegularPrice,
        previousSizeDiscountPrice: newSizeDiscountPrice,
        totalRegularPrice: newSizeRegularPrice,
        totalDiscountedPrice: newSizeDiscountPrice,
      });
    }
  }, [data]);

  useEffect(() => {
    if (isError && !data) {
      setIsErrorDuringRenderingDetailedCard(true);
      navigate(ROUTES.MENU.replace(':category', category as string));
    }
  }, [isError]);

  const renderSpinner = () => {
    return (
      <div className="bg overlay">
        <Spinner />
      </div>
    );
  };

  const renderSizes = () => {
    if (!data) {
      return;
    }

    const sizes = Object.entries(data.sizes);

    return (
      <div className="item details-sizes">
        <p>Sizes</p>
        <div className="sizes-list">
          {sizes.map(([key, size]) => {
            const sizeClassName = clsx('sizes-list-item', activeSize === key && 'active');

            const handleClick = () => {
              setActiveSize(key);

              setTotalPrice((prevState) => {
                const newSizeRegularPrice = +size.price;

                const newSizeDiscountPrice = size.discountPrice
                  ? +size.discountPrice
                  : newSizeRegularPrice;

                const totalRegularPrice =
                  prevState.totalRegularPrice -
                  prevState.previousSizeRegularPrice +
                  newSizeRegularPrice;

                const totalDiscountedPrice =
                  prevState.totalDiscountedPrice -
                  prevState.previousSizeDiscountPrice +
                  newSizeDiscountPrice;

                return {
                  previousSizeRegularPrice: newSizeRegularPrice,
                  previousSizeDiscountPrice: newSizeDiscountPrice,
                  totalRegularPrice,
                  totalDiscountedPrice,
                };
              });
            };

            return (
              <div key={key} className={sizeClassName} onClick={handleClick}>
                <div className="size round">{key}</div>
                <span>{size.size}</span>
                <div className="tooltip">
                  <Prices regularPrice={size.price} discountPrice={size.discountPrice} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderAdditives = () => {
    if (!data) {
      return;
    }

    return (
      <div className="item details-additives">
        <p>Additives</p>
        <div className="additives-list">
          {data.additives.map((additive, i) => {
            const additiveClassName = clsx(
              'additives-list-item',
              activeAdditives.includes(additive.name) && 'active'
            );
            const handleClick = () => {
              setActiveAdditives((prevState: string[]) => {
                if (prevState.includes(additive.name)) {
                  return prevState.filter((name) => name !== additive.name);
                } else {
                  return [...prevState, additive.name];
                }
              });

              setTotalPrice((prevState) => {
                const wasAdditiveActive = activeAdditives.includes(additive.name);
                let newTotalRegularPrice = prevState.totalRegularPrice;
                let newTotalDiscountedPrice = prevState.totalDiscountedPrice;

                if (wasAdditiveActive) {
                  newTotalRegularPrice -= +additive.price;
                  newTotalDiscountedPrice -= additive.discountPrice
                    ? +additive.discountPrice
                    : +additive.price;
                } else {
                  newTotalRegularPrice += +additive.price;
                  newTotalDiscountedPrice += additive.discountPrice
                    ? +additive.discountPrice
                    : +additive.price;
                }

                return {
                  ...prevState,
                  totalRegularPrice: newTotalRegularPrice,
                  totalDiscountedPrice: newTotalDiscountedPrice,
                };
              });
            };

            return (
              <div key={additive.name} className={additiveClassName} onClick={handleClick}>
                <div className="additive round">{i}</div>
                <span>{additive.name}</span>
                <div className="tooltip">
                  <Prices regularPrice={additive.price} discountPrice={additive.discountPrice} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const closeDetailsCard = () => {
    navigate(ROUTES.MENU.replace(':category', category as string));
  };

  const renderDetailedCard = () => {
    if (!data) {
      return;
    }

    const handleAddToCart = () => {
      addItemToCart({
        idInOrder: window.crypto.randomUUID(),
        id: data.id,
        name: data.name,
        weightInGram: (data.sizes as Record<string, { size: string }>)[activeSize]?.size,
        additiveNames: activeAdditives,
        regularPrice: totalPrice.totalRegularPrice,
        discountPrice: totalPrice.totalDiscountedPrice,
        category: data.category,
      });

      closeDetailsCard();
    };

    return (
      <>
        <div className="bg overlay" onClick={closeDetailsCard} />
        <div className="detailed-card">
          <div className="img-container">
            <img
              className="img"
              alt={`Picture of ${data.name}`}
              src={getImgPath({ category: data.category, name: data.name })}
            />
          </div>
          <div className="details">
            <div className="item details-header">
              <h3>{data.name}</h3>
              <p className="item details-description info">{data.description}</p>
            </div>
            {renderSizes()}
            {renderAdditives()}
            <div className="item details-total-price">
              <h3>Total</h3>
              <Prices
                regularPrice={totalPrice.totalRegularPrice}
                discountPrice={totalPrice.totalDiscountedPrice}
              />
            </div>
            <Button style={ButtonStyle.Secondary} onClick={handleAddToCart}>
              Add to cart
            </Button>
            <Link
              className="button round close no-underline"
              to={ROUTES.MENU.replace(':category', category as string)}
            >
              x
            </Link>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {isPending && renderSpinner()}
      {data && renderDetailedCard()}
    </>
  );
}
