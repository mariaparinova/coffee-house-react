import { create } from 'zustand';

export const userStore = create<UserStore>((set) => ({
  user: undefined,

  setUser: (user) => set(() => ({ user })),
  removeUser: () => set(() => ({ user: undefined })),
}));

interface User {
  id: number;
  login: string;
  city: string;
  street: string;
  houseNumber: number;
  paymentMethod: string;
}

interface UserStore {
  user: undefined | User;
  setUser: (user: User) => void;
  removeUser: () => void;
}
