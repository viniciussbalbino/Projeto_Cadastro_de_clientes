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

// Rodar servidor
const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT} 🚀`));
