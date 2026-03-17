import { useEffect } from "react";
import { useAuthStore } from "./store/auth.store";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  const { setAuth, setAuthLoading, logout } = useAuthStore();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));

        const isExpired = payload.exp * 1000 < Date.now();

        if (isExpired) {
          logout();
          localStorage.removeItem("token");
          return;
        }

        setAuth(
          {
            id: payload.sub,
            email: payload.email,
          },
          token,
        );
      } catch (error) {
        console.error("Token inválido");
        localStorage.removeItem("token");
        logout();
      }
    }

    setAuthLoading(false);
  }, []);

  return <AppRoutes />;
}

export default App;
