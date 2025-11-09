import './Prices.css';
import { userStore } from '../../store/userStore.ts';
import clsx from 'clsx';

export function Prices(props: PricesProps) {
  const { regularPrice = 0, discountPrice = 0 } = props;
  const { user } = userStore();
  const isRenderDiscountedPrice = user && discountPrice && discountPrice < regularPrice;
  const regularPriceClassNames = clsx('regular-price', { 'old-price': isRenderDiscountedPrice });

  return (
    <div className="price-container">
      {!!isRenderDiscountedPrice && (
        <h3 className="discounted-price">{formatPrice(discountPrice || regularPrice)}</h3>
      )}
      <h3 className={regularPriceClassNames}>{formatPrice(regularPrice)}</h3>
    </div>
  );
}

function formatPrice(price: string | number | undefined): string {
  if (typeof price === 'number') {
    return `$${price.toFixed(2)}`;
  }

  const priceNumber = Number(price);
  price = priceNumber ? `$${priceNumber.toFixed(2)}` : ` $0.00`;

  return price;
}

interface PricesProps {
  regularPrice: string | number;
  discountPrice?: string | number;
}
