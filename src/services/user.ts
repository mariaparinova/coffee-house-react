import type {
  LoginUserDto,
  RegisteredUserDto,
} from '../data-access/coffee-shop-api/coffee-shop-api.repository.ts';

export function transformRegisteredUserDtoToUser(userDto: RegisteredUserDto) {
  return {
    id: userDto.user.id,
    login: userDto.user.login,
    city: userDto.user.city,
    street: userDto.user.street,
    houseNumber: userDto.user.houseNumber,
    paymentMethod: userDto.user.paymentMethod,
  };
}

export function transformLoginUserDtoToUser(userDto: LoginUserDto) {
  return {
    id: userDto.user.id,
    login: userDto.user.login,
    city: userDto.user.city,
    street: userDto.user.street,
    houseNumber: userDto.user.houseNumber,
    paymentMethod: userDto.user.paymentMethod,
  };
}

export interface User {
  id: number;
  login: string;
  city: string;
  street: string;
  houseNumber: number;
  paymentMethod: string;
}
