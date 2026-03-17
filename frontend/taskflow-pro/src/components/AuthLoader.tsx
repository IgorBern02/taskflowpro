// AuthLoader.tsx
import { useAuthStore } from "../store/auth.store";

export function AuthLoader({ children }: { children: React.ReactNode }) {
  const hasHydrated = useAuthStore.persist.hasHydrated();

  if (!hasHydrated) {
    return <div className="p-10">Carregando...</div>;
  }

  return <>{children}</>;
}
