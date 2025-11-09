import './Card.css';
import type { MenuItem } from '../../../services/menuItem.ts';
import { Prices } from '../../../components/Prices/Prices.tsx';

export function Card(props: MenuItemProps) {
  const { name, description, regularPrice, discountPrice, category, onClick } = props;
  const imgPath = `../../../src/assets/images/${category}/${name.toLowerCase().replace(/\s+/g, '-')}.jpg`;

  return (
    <div className="card" onClick={onClick}>
      <div className="img-container">
        <img className="img" alt={`Picture of ${name}`} src={imgPath} />
      </div>
      <div className="description">
        <h3>{name}</h3>
        <p className="text">{description}</p>
        <Prices regularPrice={regularPrice} discountPrice={discountPrice} />
      </div>
    </div>
  );
}

interface MenuItemProps extends MenuItem {
  onClick?: () => void;
}
