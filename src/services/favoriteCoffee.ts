import type { FavoriteCoffeeDto } from '../data-access/coffee-shop-api/coffee-shop-api.repository';

export interface FavoriteCoffee {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
}

export function transformFavoriteCoffeeDtoToFavoriteCoffee(dto: FavoriteCoffeeDto): FavoriteCoffee {
  return {
    id: dto.id,
    name: dto.name,
    description: dto.description,
    price: parseFloat(dto.price),
    discountPrice: dto.discountPrice ? parseFloat(dto.discountPrice) : 0,
  };
}
