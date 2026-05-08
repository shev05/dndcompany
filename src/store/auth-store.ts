import { create } from 'zustand';

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthStore = {
  user: User | null;
  isAuth: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuth: false,
  setUser: (user) => set({ user, isAuth: !!user }),
  logout: () => {
    set({ user: null, isAuth: false });
  },
}));
