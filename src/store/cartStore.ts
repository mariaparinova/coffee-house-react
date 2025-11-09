import { create } from 'zustand';

export const cartStore = create<CartStore>((set) => ({
  cartItems: [],

  addItemToCart: (item) => set((state) => ({ cartItems: [...state.cartItems, item] })),

  removeItemFromCart: (idInOrder) => {
    set((state) => {
      const index = state.cartItems.findIndex((item) => item.idInOrder === idInOrder);

      if (index === -1) {
        return state;
      }

      return { cartItems: state.cartItems.splice(index, 1) };
    });
  },

  removeAllItemsFromCart: () => set(() => ({ cartItems: [] })),
}));

export interface CartItem {
  idInOrder: string;
  id: number;
  name: string;
  weightInGram: string;
  additiveNames: string[];
  regularPrice: number;
  discountPrice?: number;
  category: string;
}

interface CartStore {
  cartItems: CartItem[];

  addItemToCart: (item: CartItem) => void;
  removeItemFromCart: (idInOrder: string) => void;
  removeAllItemsFromCart: () => void;
}
