import { create } from 'zustand';

export const menuStore = create<MenuStore>((set) => ({
  menuItems: [],

  addMenuItem: (item) => set((state) => ({ menuItems: [...state.menuItems, item] })),

  removeMenuItem: (idInOrder) => {
    set((state) => {
      const index = state.menuItems.findIndex((item) => item.idInOrder === idInOrder);

      if (index === -1) {
        return state;
      }

      return { menuItems: state.menuItems.splice(index, 1) };
    });
  },

  removeAllMenuItems: () => set(() => ({ menuItems: [] })),
}));

export interface MenuItem {
  idInOrder: string;
  id: number;
  name: string;
  weightInGram: string;
  additiveNames: string[];
  regularPrice: string;
  discountPrice?: string;
  imgSrc: string;
  category: string;
}

interface MenuStore {
  menuItems: MenuItem[];

  addMenuItem: (item: MenuItem) => void;
  removeMenuItem: (idInOrder: string) => void;
  removeAllMenuItems: () => void;
}
