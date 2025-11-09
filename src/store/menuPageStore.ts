import { create } from 'zustand';

export const menuPageStore = create<MenuPageStore>((set) => ({
  isErrorDuringRenderingDetailedCard: false,
  setIsErrorDuringRenderingDetailedCard: (isError) =>
    set(() => ({ isErrorDuringRenderingDetailedCard: isError })),
}));

interface MenuPageStore {
  isErrorDuringRenderingDetailedCard: boolean;
  setIsErrorDuringRenderingDetailedCard: (isError: boolean) => void;
}
