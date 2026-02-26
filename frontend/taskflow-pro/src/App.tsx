import { useEffect } from "react";
import { useAuthStore } from "./store/auth.store";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // 🔥 opcionalmente você pode validar token no backend
      // mas por enquanto apenas restaura estado

      const payload = JSON.parse(atob(token.split(".")[1]));

      setAuth(
        {
          id: payload.sub,
          email: payload.email,
        },
        token,
      );
    }
  }, []);

  return <AppRoutes />;
}

export default App;
