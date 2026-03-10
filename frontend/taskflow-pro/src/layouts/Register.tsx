import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../services/auth.service";
import { useAuthStore } from "../store/auth.store";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { motion } from "framer-motion";
import { Field } from "../components/register/Field";
import { Feature } from "../components/register/Feature";

export const Register = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não conferem");
      setLoading(false);
      return;
    }

    try {
      const { user, token } = await signUp(email, password);

      if (!token) throw new Error("Token não retornado");

      setAuth(
        {
          id: user.id,
          email: user.email,
        },
        token,
      );

      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-screen w-full bg-linear-to-br from-slate-50 to-slate-200 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Hero */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-slate-800">
              Comece no <span className="text-blue-600">TaskFlow Pro</span>
            </h1>

            <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
              Crie sua conta gratuitamente e organize suas tarefas com um fluxo
              simples e eficiente.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Feature>Quadros Kanban</Feature>
            <Feature>Controle de Progresso</Feature>
            <Feature>Produtividade Diária</Feature>
          </div>
        </motion.div>

        {/* Right Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex justify-center"
        >
          <form
            onSubmit={handleRegister}
            className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 p-8 space-y-6"
          >
            <div className="space-y-2 text-center">
              <h2 className="text-2xl font-bold text-slate-800">Criar conta</h2>
              <p className="text-sm text-slate-500">Leva menos de um minuto</p>
            </div>

            <div className="space-y-4">
              <Field label="Email">
                <Input
                  placeholder="voce@email.com"
                  value={email}
                  onChange={setEmail}
                  required
                />
              </Field>

              <Field label="Senha">
                <Input
                  placeholder="••••••••"
                  type="password"
                  value={password}
                  onChange={setPassword}
                  required
                />
              </Field>

              <Field label="Confirmar senha">
                <Input
                  placeholder="••••••••"
                  type="password"
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  required
                />
              </Field>
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-3">
              <Button type="submit" disabled={loading}>
                {loading ? "Criando conta..." : "Criar conta"}
              </Button>

              <button
                type="button"
                onClick={() => navigate("/")}
                className="w-full text-sm font-medium text-slate-600 hover:text-slate-900 transition"
              >
                Já tenho conta
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

/* ---------- Subcomponents ---------- */
