import { useEffect } from "react";
import { useAuthStore } from "./store/auth.store";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // opcional: futuramente validar token no backend
      setAuth({ id: "temp", email: "temp" }, token);
    }
  }, []);

  return <AppRoutes />;
}

export default App;
