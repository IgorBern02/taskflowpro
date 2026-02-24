import { useState } from "react";
import { signIn } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const data = await signIn(email, password);
      console.log("Login realizado:", data);
      alert("Login sucesso ✅");
      navigate("/dashboard");
    } catch (error: any) {
      alert(error.message);
    }
  }

  return (
    <div className="flex flex-col gap-4 p-10 max-w-md">
      <input
        className="border p-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2"
        placeholder="Senha"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-black text-white p-2" onClick={handleLogin}>
        Entrar
      </button>
    </div>
  );
}
