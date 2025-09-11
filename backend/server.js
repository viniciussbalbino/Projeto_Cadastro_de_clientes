// server.js
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com MySQL
const db = mysql.createConnection({
  host: "127.0.0.1", // ou "localhost"
  port: 3306,
  user: "root",
  password: "Projetoimpacta@$", // sua senha do MySQL
  database: "cadastro",
});

// Testar conexão
db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar no MySQL:", err);
  } else {
    console.log("Conectado ao MySQL com sucesso!");
  }
});

// Rota teste
app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

// ========================
// LOGIN
// ========================
app.post("/login", (req, res) => {
  const { nome, senha } = req.body;

  if (!nome || !senha) {
    return res.status(400).json({ message: "Nome e senha são obrigatórios" });
  }

  const sql = "SELECT * FROM usuarios WHERE nome = ? AND senha = ?";
  db.query(sql, [nome, senha], (err, results) => {
    if (err) {
      console.error("Erro ao consultar usuário:", err);
      return res.status(500).json({ message: "Erro no servidor" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Usuário ou senha incorretos" });
    }

    res.json({ message: "Login realizado com sucesso!", usuario: results[0] });
  });
});

// ========================
// CLIENTES
// ========================

// Listar todos os clientes
app.get("/clientes", (req, res) => {
  db.query("SELECT * FROM clientes", (err, results) => {
    if (err) {
      console.error("Erro ao buscar clientes:", err);
      return res.status(500).json(err);
    }
    res.json(results);
  });
});

// Criar cliente
app.post("/clientes", (req, res) => {
  const {
    nome_completo,
    sexo,
    data_nascimento,
    email,
    telefone,
    cidade,
    estado,
    endereco,
  } = req.body;

  const sql = `
    INSERT INTO clientes
    (nome_completo, sexo, data_nascimento, email, telefone, cidade, estado, endereco)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [nome_completo, sexo, data_nascimento, email, telefone, cidade, estado, endereco],
    (err, result) => {
      if (err) {
        console.error("Erro ao inserir cliente:", err);
        return res.status(500).json(err);
      }
      res.json({ id: result.insertId, ...req.body });
    }
  );
});

// Atualizar cliente por ID
app.put("/clientes/:id", (req, res) => {
  const { id } = req.params;
  const {
    nome_completo,
    sexo,
    data_nascimento,
    email,
    telefone,
    cidade,
    estado,
    endereco,
  } = req.body;

  const sql = `
    UPDATE clientes
    SET nome_completo = ?, sexo = ?, data_nascimento = ?, email = ?, telefone = ?, cidade = ?, estado = ?, endereco = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [nome_completo, sexo, data_nascimento, email, telefone, cidade, estado, endereco, id],
    (err, result) => {
      if (err) {
        console.error("Erro ao atualizar cliente:", err);
        return res.status(500).json(err);
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Cliente não encontrado" });
      }

      res.json({ message: "Cliente atualizado com sucesso!" });
    }
  );
});

// Excluir cliente por ID
app.delete("/clientes/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM clientes WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Erro ao excluir cliente:", err);
      return res.status(500).json({ error: "Erro ao excluir cliente" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }

    res.json({ message: "Cliente excluído com sucesso" });
  });
});

// Buscar clientes com filtros
app.get("/clientes/buscar", (req, res) => {
  const { nome, cidade, estado, email } = req.query;

  let query = "SELECT * FROM clientes WHERE 1=1";
  const params = [];

  if (nome) {
    query += " AND nome_completo LIKE ?";
    params.push(`%${nome}%`);
  }
  if (cidade) {
    query += " AND cidade LIKE ?";
    params.push(`%${cidade}%`);
  }
  if (estado) {
    query += " AND estado LIKE ?";
    params.push(`%${estado}%`);
  }
  if (email) {
    query += " AND email LIKE ?";
    params.push(`%${email}%`);
  }

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Erro ao buscar clientes:", err);
      return res.status(500).json(err);
    }
    res.json(results);
  });
});

// ========================
// RODAR SERVIDOR
// ========================
const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT} 🚀`));
