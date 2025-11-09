import type {
  DetailedMenuItemDto,
  MenuItemDto,
} from '../data-access/coffee-shop-api/coffee-shop-api.repository';

export function transformMenuItemDtoToMenuItem(dto: MenuItemDto): MenuItem {
  const category = dto.category;

  return {
    id: dto.id,
    name: dto.name,
    description: dto.description,
    regularPrice: parseFloat(dto.price).toFixed(2),
    discountPrice: dto.discountPrice ? parseFloat(dto.discountPrice).toFixed(2) : '',
    category: category,
  };
}

export function transformMenuItemDtoToDetailedMenuItem(dto: DetailedMenuItemDto): DetailedMenuItem {
  const category = dto.category;
  const regularPrice = parseFloat(dto.sizes.s.price || dto.price);
  let discountPrice = regularPrice;

  if (dto.sizes.s.discountPrice) {
    discountPrice = parseFloat(dto.sizes.s.discountPrice);
  }

  if (dto.discountPrice) {
    discountPrice = parseFloat(dto.discountPrice);
  }

  return {
    id: dto.id,
    name: dto.name,
    description: dto.description,
    regularPrice,
    discountPrice,
    category: category,
    sizes: dto.sizes,
    additives: dto.additives,
  };
}

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  regularPrice: string;
  discountPrice: string;
  category: string;
}

export interface DetailedMenuItem {
  id: number;
  name: string;
  description: string;
  regularPrice: number;
  discountPrice: number;
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
