import { create } from "zustand";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "../services/supabase";

type AuthState = {
  user: User | null;
  session: Session | null;
  setSession: (session: Session | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  setSession: (session) =>
    set({
      session,
      user: session?.user ?? null,
    }),
}));

// Listener global
supabase.auth.onAuthStateChange((_event, session) => {
  useAuthStore.getState().setSession(session);
});
