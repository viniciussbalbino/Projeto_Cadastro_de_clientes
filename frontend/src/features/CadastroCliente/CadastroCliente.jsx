import "./CadastroCliente.css";
import { useState } from "react";

const CadastroCliente = () => {
  const [form, setForm] = useState({
    nome: "",
    genero: "",
    data_nascimento: "",
    email: "",
    telefone: "",
    cidade: "",
    estado: "",
    endereco: ""
  });

  // Atualiza valores do formulário
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validação de todos os campos obrigatórios
  const validaPreenchimento = () => {
    const camposObrigatorios = [
      "nome",
      "genero",
      "data_nascimento",
      "email",
      "telefone",
      "cidade",
      "estado",
      "endereco"
    ];

    for (let campo of camposObrigatorios) {
      if (!form[campo] || form[campo].trim() === "") {
        alert(`Preencha o campo obrigatório: ${campo}`);
        return false;
      }
    }

    return true;
  };

  // Envia cliente para o backend se a validação passar
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validaPreenchimento()) return;

    try {
      const response = await fetch("http://localhost:5000/clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome_completo: form.nome,
          sexo: form.genero,
          data_nascimento: form.data_nascimento,
          email: form.email,
          telefone: form.telefone,
          cidade: form.cidade,
          estado: form.estado,
          endereco: form.endereco
        })
      });

      if (response.ok) {
        alert("Cliente cadastrado com sucesso!");
        // Limpa o formulário
        setForm({
          nome: "",
          genero: "",
          data_nascimento: "",
          email: "",
          telefone: "",
          cidade: "",
          estado: "",
          endereco: ""
        });
      } else {
        alert("Erro ao cadastrar cliente.");
      }
    } catch (err) {
      console.error(err);
      alert("Erro de rede.");
    }
  };

  return (
    <form className="form-cadastro-cliente" onSubmit={handleSubmit}>
      <fieldset className="linha-formulario-titulo">
        <legend className="cabecalho">
          <b>Cadastro de Clientes</b>
        </legend>

        <div className="linha-formulario">
          <label htmlFor="nome">Nome Completo: </label>
          <input
            type="text"
            name="nome"
            id="nome"
            className="inputUser"
            placeholder="Digite seu nome"
            value={form.nome}
            onChange={handleChange}
          />
        </div>

        <div className="sexo">
          <p>Sexo:</p>
          <input
            type="radio"
            id="feminino"
            name="genero"
            value="Feminino"
            checked={form.genero === "Feminino"}
            onChange={handleChange}
          />
          <label htmlFor="feminino">Feminino</label>

          <input
            type="radio"
            id="masculino"
            name="genero"
            value="Masculino"
            checked={form.genero === "Masculino"}
            onChange={handleChange}
          />
          <label htmlFor="masculino">Masculino</label>

          <input
            type="radio"
            id="outros"
            name="genero"
            value="Outro"
            checked={form.genero === "Outro"}
            onChange={handleChange}
          />
          <label htmlFor="outros">Outro</label>
        </div>

        <div className="linha-formulario">
          <label htmlFor="data_nascimento">Data de Nascimento:</label>
          <input
            type="date"
            name="data_nascimento"
            id="data_nascimento"
            value={form.data_nascimento}
            onChange={handleChange}
          />
        </div>

        <div className="linha-formulario">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            className="inputUser"
            placeholder="Digite seu email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="linha-formulario">
          <label htmlFor="telefone">Telefone: </label>
          <input
            type="tel"
            name="telefone"
            id="telefone"
            className="inputUser"
            placeholder="Digite seu telefone"
            value={form.telefone}
            onChange={handleChange}
          />
        </div>

        <div className="linha-formulario">
          <label htmlFor="cidade">Cidade: </label>
          <input
            type="text"
            name="cidade"
            id="cidade"
            className="inputUser"
            placeholder="Digite sua cidade"
            value={form.cidade}
            onChange={handleChange}
          />
        </div>

        <div className="linha-formulario">
          <label htmlFor="estado">Estado: </label>
          <input
            type="text"
            name="estado"
            id="estado"
            className="inputUser"
            placeholder="Digite seu estado"
            value={form.estado}
            onChange={handleChange}
          />
        </div>

        <div className="linha-formulario">
          <label htmlFor="endereco">Endereço:</label>
          <input
            type="text"
            name="endereco"
            id="endereco"
            className="inputUser"
            placeholder="Digite seu endereço"
            value={form.endereco}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="botao-confirmar">
          <b>Cadastrar-se</b>
        </button>
      </fieldset>
    </form>
  );
};

export default CadastroCliente;
