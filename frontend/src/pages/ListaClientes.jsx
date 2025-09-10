import { useEffect, useState } from "react";

function ListaClientes() {
  const [clientes, setClientes] = useState([]);
  const [busca, setBusca] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [clienteEditado, setClienteEditado] = useState({});

  // Cor do botão excluir
  const corBotaoExcluir = "red";

  useEffect(() => {
    fetchClientes();
  }, []);

  // Buscar clientes do back
  const fetchClientes = async () => {
    try {
      const res = await fetch("http://localhost:5000/clientes");
      if (!res.ok) throw new Error("Erro ao buscar clientes");
      const data = await res.json();
      setClientes(data);
    } catch (err) {
      console.error(err);
      alert("Erro ao buscar clientes do banco de dados.");
    }
  };

  // Excluir cliente
  const excluirCliente = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este cliente?")) return;

    try {
      const res = await fetch(`http://localhost:5000/clientes/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Cliente excluído com sucesso!");
        fetchClientes();
      } else {
        alert("Erro ao excluir cliente.");
      }
    } catch (err) {
      console.error("Erro ao excluir cliente:", err);
    }
  };

  // Iniciar edição
  const iniciarEdicao = (cliente) => {
    setEditandoId(cliente.id);
    // Cria uma cópia do cliente para edição
    setClienteEditado({ ...cliente });
    // Ajusta data para formato YYYY-MM-DD
    if (cliente.data_nascimento)
      setClienteEditado((prev) => ({
        ...prev,
        data_nascimento: new Date(cliente.data_nascimento)
          .toISOString()
          .split("T")[0],
      }));
  };

  // Cancelar edição
  const cancelarEdicao = () => {
    setEditandoId(null);
    setClienteEditado({});
  };

  // Salvar edição
  const salvarEdicao = async () => {
    if (!clienteEditado.nome_completo || !clienteEditado.sexo) {
      alert("Preencha os campos obrigatórios: Nome e Sexo");
      return;
    }

    // Formata data corretamente para MySQL (YYYY-MM-DD)
    const dataFormatada = clienteEditado.data_nascimento
      ? new Date(clienteEditado.data_nascimento).toISOString().split("T")[0]
      : null;

    const body = { ...clienteEditado, data_nascimento: dataFormatada };

    try {
      const res = await fetch(`http://localhost:5000/clientes/${clienteEditado.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const error = await res.json();
        alert("Erro ao atualizar cliente: " + (error.error || res.statusText));
        return;
      }

      alert("Cliente atualizado com sucesso!");
      fetchClientes();
      cancelarEdicao();
    } catch (err) {
      console.error("Erro ao atualizar cliente:", err);
      alert("Erro ao atualizar cliente. Veja o console.");
    }
  };

  // Filtrar clientes pelo nome, email ou cidade
  const clientesFiltrados = clientes.filter((c) =>
    (c.nome_completo + c.email + c.cidade)
      .toLowerCase()
      .includes(busca.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Lista de Clientes</h2>

      <input
        type="text"
        placeholder="Buscar cliente por nome, email ou cidade..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        style={{
          marginBottom: "15px",
          padding: "8px",
          width: "100%",
          maxWidth: "400px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      {clientesFiltrados.length === 0 ? (
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
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientesFiltrados.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>
                  {editandoId === c.id ? (
                    <input
                      type="text"
                      value={clienteEditado.nome_completo}
                      onChange={(e) =>
                        setClienteEditado({ ...clienteEditado, nome_completo: e.target.value })
                      }
                      style={{ width: "120px" }}
                    />
                  ) : (
                    c.nome_completo
                  )}
                </td>
                <td>
                  {editandoId === c.id ? (
                    <select
                      value={clienteEditado.sexo}
                      onChange={(e) =>
                        setClienteEditado({ ...clienteEditado, sexo: e.target.value })
                      }
                      style={{ width: "90px" }}
                    >
                      <option value="">Selecione</option>
                      <option value="Masculino">Masculino</option>
                      <option value="Feminino">Feminino</option>
                    </select>
                  ) : (
                    c.sexo
                  )}
                </td>
                <td>
                  {editandoId === c.id ? (
                    <input
                      type="date"
                      value={clienteEditado.data_nascimento || ""}
                      onChange={(e) =>
                        setClienteEditado({ ...clienteEditado, data_nascimento: e.target.value })
                      }
                      style={{ width: "130px" }}
                    />
                  ) : c.data_nascimento ? (
                    new Date(c.data_nascimento).toLocaleDateString("pt-BR")
                  ) : (
                    ""
                  )}
                </td>
                <td>
                  {editandoId === c.id ? (
                    <input
                      type="email"
                      value={clienteEditado.email || ""}
                      onChange={(e) =>
                        setClienteEditado({ ...clienteEditado, email: e.target.value })
                      }
                      style={{ width: "160px" }}
                    />
                  ) : (
                    c.email
                  )}
                </td>
                <td>
                  {editandoId === c.id ? (
                    <input
                      type="text"
                      value={clienteEditado.telefone || ""}
                      onChange={(e) =>
                        setClienteEditado({ ...clienteEditado, telefone: e.target.value })
                      }
                      style={{ width: "120px" }}
                    />
                  ) : (
                    c.telefone
                  )}
                </td>
                <td>
                  {editandoId === c.id ? (
                    <input
                      type="text"
                      value={clienteEditado.cidade || ""}
                      onChange={(e) =>
                        setClienteEditado({ ...clienteEditado, cidade: e.target.value })
                      }
                      style={{ width: "120px" }}
                    />
                  ) : (
                    c.cidade
                  )}
                </td>
                <td>
                  {editandoId === c.id ? (
                    <input
                      type="text"
                      value={clienteEditado.estado || ""}
                      onChange={(e) =>
                        setClienteEditado({ ...clienteEditado, estado: e.target.value })
                      }
                      style={{ width: "60px" }}
                    />
                  ) : (
                    c.estado
                  )}
                </td>
                <td>
                  {editandoId === c.id ? (
                    <input
                      type="text"
                      value={clienteEditado.endereco || ""}
                      onChange={(e) =>
                        setClienteEditado({ ...clienteEditado, endereco: e.target.value })
                      }
                      style={{ width: "140px" }}
                    />
                  ) : (
                    c.endereco
                  )}
                </td>
                <td>
                  {c.data_cadastro
                    ? new Date(c.data_cadastro).toLocaleDateString("pt-BR")
                    : ""}
                </td>
                <td>
                  {editandoId === c.id ? (
                    <>
                      <button
                        onClick={salvarEdicao}
                        style={{
                          background: "green",
                          color: "white",
                          border: "none",
                          padding: "5px 10px",
                          borderRadius: "5px",
                          cursor: "pointer",
                          marginRight: "5px",
                        }}
                      >
                        Salvar
                      </button>
                      <button
                        onClick={cancelarEdicao}
                        style={{
                          background: "gray",
                          color: "white",
                          border: "none",
                          padding: "5px 10px",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => iniciarEdicao(c)}
                        style={{
                          background: "orange",
                          color: "white",
                          border: "none",
                          padding: "5px 10px",
                          borderRadius: "5px",
                          cursor: "pointer",
                          marginRight: "5px",
                        }}
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => excluirCliente(c.id)}
                        style={{
                          background: corBotaoExcluir,
                          color: "white",
                          border: "none",
                          padding: "5px 10px",
                          borderRadius: "5px",
                          cursor: "pointer",
                          transition: "0.3s",
                        }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.background = "#f71919ff")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.background = corBotaoExcluir)
                        }
                      >
                        Excluir
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ListaClientes;
