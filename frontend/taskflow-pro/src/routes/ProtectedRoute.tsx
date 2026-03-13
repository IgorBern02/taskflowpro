import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

type Props = {
  children: React.ReactNode;
};

export function ProtectedRoute({ children }: Props) {
  const { user, isAuthLoading } = useAuthStore();
  const token = useAuthStore((state) => state.token);

  if (isAuthLoading) {
    return <div>Carregando...</div>;
  }

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
