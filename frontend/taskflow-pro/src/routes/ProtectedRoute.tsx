import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

type Props = {
  children: React.ReactNode;
};

export function ProtectedRoute({ children }: Props) {
  const { user, isAuthLoading } = useAuthStore();

  if (isAuthLoading) {
    return <div>Carregando...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
