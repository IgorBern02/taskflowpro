import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  id: string;
  email: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  isAuthLoading: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  setAuthLoading: (loading: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthLoading: true,

      setAuthLoading: (loading) => set({ isAuthLoading: loading }),

      setAuth: (user, token) =>
        set({
          user,
          token,
        }),

      logout: () =>
        set({
          user: null,
          token: null,
        }),
    }),
    {
      name: "auth-storage",

      onRehydrateStorage: () => (state) => {
        state?.setAuthLoading(false);
      },
    },
  ),
);
