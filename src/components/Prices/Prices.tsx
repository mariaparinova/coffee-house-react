import './Prices.css';
import { userStore } from '../../store/userStore.ts';
import clsx from 'clsx';

export function Prices(props: PricesProps) {
  const { regularPrice, discountPrice } = props;
  const { user } = userStore();
  const regularPriceClassNames = clsx('regular-price', { 'old-price': user && discountPrice });

  return (
    <div className="price-container">
      {user && <h3 className="discounted-price">{formatPrice(discountPrice)}</h3>}
      <h3 className={regularPriceClassNames}>{formatPrice(regularPrice)}</h3>
    </div>
  );
}

function formatPrice(price: string | number | undefined): string {
  if (!price) {
    return '';
  }

  if (typeof price === 'number') {
    return `$${price.toFixed(2)}`;
  }

  const priceNumber = Number(price);
  price = priceNumber ? `$${priceNumber.toFixed(2)}` : '';

  return price;
}

interface PricesProps {
  regularPrice: string | number;
  discountPrice?: string | number;
}
