import './Card.css';
import type { MenuItem } from '../../../services/menuItem.ts';
import { Prices } from '../../../components/Prices/Prices.tsx';
import { getImgPath } from '../../../utils/getImagePath.ts';

export function Card(props: MenuItemProps) {
  const { name, description, regularPrice, discountPrice, category, onClick } = props;

  return (
    <div className="card" onClick={onClick}>
      <div className="img-container">
        <img className="img" alt={`Picture of ${name}`} src={getImgPath({ category, name })} />
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
