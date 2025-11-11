import './CarouselCard.css';
import type { FavoriteCoffee } from '../../../../services/favoriteCoffee.ts';
import { getImgPath } from '../../../../utils/getImagePath.ts';

export function CarouselCard(props: FavoriteCoffee) {
  const { name, description, price } = props;
  const itemPrice = price ? `$${price.toFixed(2)}` : '';

  return (
    <div className="carousel-card">
      <img
        className="img"
        src={getImgPath({ category: 'coffee', name: name })}
        alt="Picture of coffee"
      />
      <div className="details">
        <h3>{name}</h3>
        <p>{description}</p>
        <h3>{itemPrice}</h3>
      </div>
    </div>
  );
}
