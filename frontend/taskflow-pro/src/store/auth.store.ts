import { create } from "zustand";

type User = {
  id: string;
  email: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  isAuthLoading: boolean;
  setAuthLoading: (loading: boolean) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthLoading: true,
  setAuthLoading: (loading) => {
    set({ isAuthLoading: loading });
  },

  setAuth: (user, token) => {
    localStorage.setItem("token", token);

    set({
      user,
      token,
    });
  },

  logout: async () => {
    localStorage.removeItem("token");

    (set({
      user: null,
      token: null,
    }),
      {
        name: "auth-storage",
      });
  },
}));
