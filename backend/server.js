const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com MySQL
const db = mysql.createConnection({
  host: "127.0.0.1",      // ou "localhost"
  port: 3306,
  user: "root",
  password: "Projetoimpacta@$", // sua senha do MySQL
  database: "cadastro"
});

// Testar conexão
db.connect(err => {
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

// Listar clientes
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
  const { nome_completo, sexo, data_nascimento, email, telefone, cidade, estado, endereco } = req.body;

  console.log("Recebido do front:", req.body); // Log para depuração

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
      console.log("Cliente inserido com sucesso, ID:", result.insertId);
      res.json({ id: result.insertId, ...req.body });
    }
  );
});

// Rodar servidor
const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT} 🚀`));
