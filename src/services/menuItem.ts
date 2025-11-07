import type {
  DetailedMenuItemDto,
  MenuItemDto,
} from '../data-access/coffee-shop-api/coffee-shop-api.repository';

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  discountPrice: string;
  imgSrc: string;
  category: string;
}

export interface DetailedMenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  discountPrice: string;
  imgSrc: string;
  category: string;
  sizes: {
    [key: string]: {
      size: string;
      price: string;
      discountPrice?: string;
    };
  };
  additives: additive[];
}

interface additive {
  name: string;
  price: string;
  discountPrice?: string;
}

export function transformMenuItemDtoToMenuItem(dto: MenuItemDto): MenuItem {
  const category = dto.category;

  return {
    id: dto.id,
    name: dto.name,
    description: dto.description,
    price: parseFloat(dto.price).toFixed(2),
    discountPrice: dto.discountPrice ? parseFloat(dto.discountPrice).toFixed(2) : '',
    imgSrc: getImgPath(category, dto.name),
    category: category,
  };
}

export function transformMenuItemDtoToDetailedMenuItem(dto: DetailedMenuItemDto): DetailedMenuItem {
  const category = dto.category;
  let discountPrice = '';

  if (dto.sizes.s.discountPrice) {
    discountPrice = parseFloat(dto.sizes.s.discountPrice).toFixed(2);
  }

  if (dto.discountPrice) {
    discountPrice = parseFloat(dto.discountPrice).toFixed(2);
  }

  return {
    id: dto.id,
    name: dto.name,
    description: dto.description,
    price: parseFloat(dto.sizes.s.price || dto.price).toFixed(2),
    discountPrice: discountPrice,
    imgSrc: getImgPath(category, dto.name),
    category: category,
    sizes: dto.sizes,
    additives: dto.additives,
  };
}

export function getImgPath(category: string, name: string): string {
  const fileName = name.toLowerCase().replace(/\s+/g, '-');
  const imagesPathPrefix =
    import.meta.env.MODE === 'production' ? '/coffee-house-short-track/public' : '';

  return `${imagesPathPrefix}/images/${category}/${fileName}.jpg`;
}
