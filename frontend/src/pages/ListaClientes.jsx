import { useEffect, useState } from "react";

function ListaClientes() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("clientes");
    if (data) {
      setClientes(JSON.parse(data));
    }
  }, []);

  return (
    <div>
      <h2>Clientes cadastrados</h2>
      <ul>
        {clientes.map((c, i) => (
          <li key={i}>
            {c.nome} | {c.genero} | {c.email} | {c.telefone} | {c.cidade}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaClientes;