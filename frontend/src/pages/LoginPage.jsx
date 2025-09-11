import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!nome || !senha) {
      alert("Preencha nome e senha!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, senha }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Erro ao logar");
        return;
      }

      // Login bem-sucedido
      navigate("/clientes"); // redireciona para a lista de clientes
    } catch (err) {
      console.error(err);
      alert("Erro ao conectar com o servidor");
    }
  };

  return (
    <div style={{ padding: "50px", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        style={{ display: "block", margin: "10px 0", width: "100%", padding: "8px" }}
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        style={{ display: "block", margin: "10px 0", width: "100%", padding: "8px" }}
      />
      <button onClick={handleLogin} style={{ padding: "10px 20px", cursor: "pointer" }}>
        Entrar
      </button>
    </div>
  );
}

export default LoginPage;
