import { useNavigate } from "react-router-dom";
import CadastroCliente from "../features/CadastroCliente";

function NovoClientePage() {
  const navigate = useNavigate();

  return (
    <section style={{ padding: "20px" }}>
      <h2> </h2>

     {/* Botão para voltar */}
<button
  onClick={() => navigate("/clientes")}
  style={{
    marginBottom: "15px",
    padding: "8px 20px",
    background: "black", // fundo preto
    color: "white",      // texto branco
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  }}
>
  Voltar para a Lista
</button>

      <CadastroCliente />
    </section>
  );
}

export default NovoClientePage;
