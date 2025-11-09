import { create } from 'zustand';

export const cartStore = create<CartStore>((set) => ({
  cartItems: [],
  prise: {
    regular: 0,
    discounted: 0,
  },

  addItemToCart: (item) =>
    set((state) => {
      return {
        cartItems: [...state.cartItems, item],
        prise: {
          regular: state.prise.regular + item.regularPrice,
          discounted: state.prise.discounted + (item.discountPrice || item.regularPrice),
        },
      };
    }),

  removeItemFromCart: (idInOrder) => {
    set((state) => {
      const itemToRemove = state.cartItems.find((item) => item.idInOrder === idInOrder);
      if (!itemToRemove) {
        return state;
      }

      const updatedCart = state.cartItems.filter((item) => item.idInOrder !== idInOrder);

      return {
        cartItems: updatedCart,
        prise: {
          regular: state.prise.regular - itemToRemove.regularPrice,
          discounted:
            state.prise.discounted - (itemToRemove.discountPrice ?? itemToRemove.regularPrice),
        },
      };
    });
  },

  removeAllItemsFromCart: () =>
    set(() => {
      return { cartItems: [], prise: { regular: 0, discounted: 0 } };
    }),
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
  prise: {
    regular: number;
    discounted: number;
  };

  addItemToCart: (item: CartItem) => void;
  removeItemFromCart: (idInOrder: string) => void;
  removeAllItemsFromCart: () => void;
}
