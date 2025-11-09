import './CarouselCard.css';
import type { FavoriteCoffee } from '../../../../services/favoriteCoffee.ts';

export function CarouselCard(props: FavoriteCoffee) {
  const { name, description, price } = props;
  const itemPrice = price ? `$${price.toFixed(2)}` : '';

  return (
    <div className="carousel-card">
      <img
        className="img"
        src={`../../../src/assets/images/coffee/${name.toLowerCase().replace(/\s+/g, '-')}.jpg`}
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
