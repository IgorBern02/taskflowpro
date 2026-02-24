import { useEffect } from "react";
import { supabase } from "./services/supabase";
import { useAuthStore } from "./store/auth.store";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  const setSession = useAuthStore((state) => state.setSession);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });
  }, []);

  return <AppRoutes />;
}

export default App;
