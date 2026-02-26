import { useEffect } from "react";
import { useAuthStore } from "./store/auth.store";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  const { setAuth, setAuthLoading } = useAuthStore();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));

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
      }
    }

    setAuthLoading(false);
  }, []);

  return <AppRoutes />;
}

export default App;
