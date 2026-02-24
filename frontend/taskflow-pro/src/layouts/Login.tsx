import { useState } from "react";
import { signIn } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const data = await signIn(email, password);
      console.log("Login realizado:", data);

      navigate("/dashboard");
    } catch (error: any) {
      alert(error.message);
    }
  }

  return (
    <div className="bg-white p-8 rounded shadow-md flex flex-col items-center justify-center gap-4 h-full w-3/4 text-black ">
      <Input
        placeholder="Email"
        type="email"
        value={email}
        onChange={setEmail}
      />

      <Input
        placeholder="Senha"
        type="password"
        value={password}
        onChange={setPassword}
      />

      <Button onClick={handleLogin}>Entrar</Button>
      <Button onClick={() => navigate("/register")}>Criar conta</Button>
    </div>
  );
}
