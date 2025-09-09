// src/pages/BuscarClientes.jsx
import { useState } from "react";

function BuscarClientes() {
  const [filtros, setFiltros] = useState({
    nome: "",
    cidade: "",
    estado: "",
    email: "",
  });
  const [clientes, setClientes] = useState([]);

  // Atualiza os filtros conforme o usuário digita
  const handleChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  // Busca clientes no back-end usando os filtros
  const buscar = async () => {
    const query = new URLSearchParams(filtros).toString();
    try {
      const res = await fetch(`http://localhost:5000/clientes/buscar?${query}`);
      if (!res.ok) throw new Error("Erro ao buscar clientes");
      const data = await res.json();
      setClientes(data);
    } catch (err) {
      console.error(err);
      alert("Erro ao buscar clientes.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Buscar Clientes</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          name="nome"
          placeholder="Nome"
          value={filtros.nome}
          onChange={handleChange}
          style={{ marginRight: "10px" }}
        />
        <input
          name="cidade"
          placeholder="Cidade"
          value={filtros.cidade}
          onChange={handleChange}
          style={{ marginRight: "10px" }}
        />
        <input
          name="estado"
          placeholder="Estado"
          value={filtros.estado}
          onChange={handleChange}
          style={{ marginRight: "10px" }}
        />
        <input
          name="email"
          placeholder="Email"
          value={filtros.email}
          onChange={handleChange}
          style={{ marginRight: "10px" }}
        />
        <button onClick={buscar}>Buscar</button>
      </div>

      {clientes.length === 0 ? (
        <p>Nenhum cliente encontrado</p>
      ) : (
        <table
          border="1"
          cellPadding="8"
          style={{
            borderCollapse: "collapse",
            width: "100%",
            textAlign: "left",
          }}
        >
          <thead style={{ backgroundColor: "#f2f2f2" }}>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Sexo</th>
              <th>Data Nascimento</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th>Endereço</th>
              <th>Data Cadastro</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.nome_completo}</td>
                <td>{c.sexo}</td>
                <td>{c.data_nascimento ? new Date(c.data_nascimento).toLocaleDateString() : ""}</td>
                <td>{c.email}</td>
                <td>{c.telefone}</td>
                <td>{c.cidade}</td>
                <td>{c.estado}</td>
                <td>{c.endereco}</td>
                <td>{c.data_cadastro ? new Date(c.data_cadastro).toLocaleDateString() : ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BuscarClientes;
