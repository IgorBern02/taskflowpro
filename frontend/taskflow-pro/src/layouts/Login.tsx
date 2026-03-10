import { useState } from "react";
import { signIn } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useAuthStore } from "../store/auth.store";
import { motion } from "framer-motion";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  async function handleLogin() {
    try {
      setLoading(true);
      const data = await signIn(email, password);

      setAuth(
        {
          id: data.user.id,
          email: data.user.email,
        },
        data.token,
      );

      navigate("/dashboard");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="w-full"
    >
      <div className="space-y-6">
        {/* Form */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
              Email
            </label>
            <Input
              placeholder="voce@email.com"
              type="text"
              value={email}
              onChange={setEmail}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
              Senha
            </label>
            <Input
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={setPassword}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3 pt-2">
          <Button onClick={handleLogin} disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>

          <Button
            className="w-full text-sm font-medium text-slate-600 hover:text-slate-900 transition"
            onClick={() => navigate("/register")}
          >
            Criar nova conta
          </Button>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400">
            TaskFlow Pro • Organize seu fluxo de trabalho
          </p>
        </div>
      </div>
    </motion.div>
  );
};
