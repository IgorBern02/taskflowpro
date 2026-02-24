import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../services/auth.service";
import { useAuthStore } from "../store/auth.store";
import { Input } from "../components/Input";

import { Button } from "../components/Button";

export function Register() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

      if (!token) {
        throw new Error("Token não retornado");
      }

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
    <section className=" flex items-center justify-center h-screen w-screen">
      <div className=" p-10 rounded  w-full h-full flex items-center justify-center gap-4">
        <p className="uppercase font-bold text-8xl">taskflow pro</p>
      </div>
      <div className=" p-10 rounded  w-full h-full flex items-center justify-center gap-4">
        <form
          onSubmit={handleRegister}
          className="bg-white p-8 rounded shadow-md flex flex-col items-center justify-center gap-4 h-full w-3/4 text-black "
        >
          <Input
            placeholder="Email"
            value={email}
            onChange={setEmail}
            required
          />

          <Input
            placeholder="Senha"
            type="password"
            value={password}
            onChange={setPassword}
            required
          />

          <Input
            placeholder="Confirmar senha"
            type="password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            required
          />

          <Button type="submit" disabled={loading}>
            {loading ? "Registrando..." : "Criar conta"}
          </Button>

          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </section>
  );
}
