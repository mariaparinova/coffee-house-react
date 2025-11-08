import { transformFavoriteCoffeeDtoToFavoriteCoffee } from '../../services/favoriteCoffee';
import {
  transformMenuItemDtoToDetailedMenuItem,
  transformMenuItemDtoToMenuItem,
} from '../../services/menuItem.ts';
import {
  transformLoginUserDtoToUser,
  transformRegisteredUserDtoToUser,
} from '../../services/user.ts';

const BASE_URL = 'https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com';

export async function getFavoriteCoffee() {
  try {
    const response: Response = await fetch(`${BASE_URL}/products/favorites`);
    const data: FavoriteCoffeeResponse = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data.data?.map((dto) => transformFavoriteCoffeeDtoToFavoriteCoffee(dto));
  } catch (error) {
    console.error('Error fetching favorite coffee:', error);
    throw error;
  }
}

export async function getMenu() {
  try {
    const response: Response = await fetch(`${BASE_URL}/products`);
    const data: MenuItemResponse = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data.data!.map((dto) => transformMenuItemDtoToMenuItem(dto));
  } catch (error) {
    console.error('Error fetching menu:', error);
    throw error;
  }
}

export async function getMenuItemById(id: number) {
  try {
    const response: Response = await fetch(`${BASE_URL}/products/${id}`);
    const data: MenuDetailedItemResponse = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    const dto = data.data;

    if (!dto) {
      throw new Error('Menu item not found');
    }

    return transformMenuItemDtoToDetailedMenuItem(dto);
  } catch (error) {
    console.error('Error fetching menu item by id:', error);
    throw error;
  }
}

export async function registerUser(user: RegistrationUserData) {
  try {
    const response: Response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(user),
    });

    const data: RegistrationUserResponse = await response.json();

    if (data.error) {
      const message = Array.isArray(data.error) ? data.error.join(', ') : data.error;
      throw new Error(message);
    }

    if (data.data) {
      return transformRegisteredUserDtoToUser(data.data);
    }
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}

export async function loginUser(user: LoginUserData) {
  try {
    const response: Response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(user),
    });

    const data: LoginUserResponse = await response.json();

    if (data.error) {
      const message = Array.isArray(data.error) ? data.error.join(', ') : data.error;
      throw new Error(message);
    }

    if (data.data) {
      return transformLoginUserDtoToUser(data.data);
    }
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
}

export async function sendOrder(order: Order) {
  try {
    const response: Response = await fetch(`${BASE_URL}/orders/confirm`, {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(order),
    });

    const data: OrderResponse = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    if (data.data) {
      return data.data;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error sending order:', error.message);
      throw error;
    }

    if (typeof error === 'string') {
      console.error('Error sending order:', error);
      throw new Error(error);
    }

    throw new Error('Unknown error sending order');
  }
}

interface OrderResponse {
  data?: {
    message: string;
    orderId: string;
  };
  message?: string;
  error?: string;
}

export interface OrderItem {
  productId: number;
  size: string;
  additives: string[];
  quantity: number;
}

export interface Order {
  items: OrderItem[];
  totalPrice: number;
}

interface MenuDetailedItemResponse {
  data?: DetailedMenuItemDto;
  error?: string;
}

export interface FavoriteCoffeeDto {
  id: number;
  name: string;
  description: string;
  price: string;
  discountPrice: string;
  category: string;
}

interface FavoriteCoffeeResponse {
  data?: FavoriteCoffeeDto[];
  error?: string;
}

export interface MenuItemDto {
  id: number;
  name: string;
  description: string;
  price: string;
  discountPrice: string;
  category: string;
}

interface MenuItemResponse {
  data?: MenuItemDto[];
  error?: string;
}

export interface DetailedMenuItemDto {
  id: number;
  name: string;
  description: string;
  price: string;
  discountPrice: string;
  category: string;
  sizes: {
    s: {
      size: string;
      price: string;
      discountPrice?: string;
    };
    m: {
      size: string;
      price: string;
      discountPrice?: string;
    };
    l: {
      size: string;
      price: string;
      discountPrice?: string;
    };
  };
  additives: [
    {
      name: string;
      price: string;
      discountPrice?: string;
    },
    {
      name: string;
      price: string;
      discountPrice?: string;
    },
    {
      name: string;
      price: string;
      discountPrice?: string;
    },
  ];
}

export interface RegistrationUserData {
  login: string;
  password: string;
  confirmPassword: string;
  city: string;
  street: string;
  houseNumber: number;
  paymentMethod: string;
}

export interface RegisteredUserDto {
  access_token: string;
  user: {
    login: string;
    city: string;
    street: string;
    houseNumber: number;
    paymentMethod: string;
    id: number;
    createdAt: string; // "2025-10-22T11:30:01.000Z"
  };
}

interface RegistrationUserResponse {
  data?: RegisteredUserDto;
  error?: string;
  message: string | string[];
}

export interface LoginUserData {
  login: string;
  password: string;
}

interface LoginUserResponse {
  data?: LoginUserDto;
  error?: string;
  message: string | string[];
}

export interface LoginUserDto {
  access_token: string;
  user: {
    id: number;
    login: string;
    city: string;
    street: string;
    houseNumber: number;
    paymentMethod: string;
    createdAt: string; // 2025-10-15T19:08:29.000Z
  };
}
