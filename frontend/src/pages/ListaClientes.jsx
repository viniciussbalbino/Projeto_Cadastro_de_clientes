// src/pages/ListaClientes.jsx
import { useEffect, useState } from "react";

function ListaClientes() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const res = await fetch("http://localhost:5000/clientes"); // endpoint do back-end
        if (!res.ok) throw new Error("Erro ao buscar clientes");
        const data = await res.json();
        setClientes(data);
      } catch (err) {
        console.error(err);
        alert("Erro ao buscar clientes do banco de dados.");
      }
    };

    fetchClientes();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Clientes cadastrados</h2>

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
                <td>{c.data_nascimento}</td>
                <td>{c.email}</td>
                <td>{c.telefone}</td>
                <td>{c.cidade}</td>
                <td>{c.estado}</td>
                <td>{c.endereco}</td>
                <td>{new Date(c.data_cadastro).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ListaClientes;
