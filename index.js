// Instalações
const express = require("express");
const app = express();
const mysql = require("mysql");

// Conexão ao banco de dados
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "banco_freelancers",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Conectado ao banco de dados MySQL");
});

// Definições
app.use(express.static("src"));
app.set("view engine", "ejs");
app.set("views", "./");
app.use(express.urlencoded({ extended: true }));

// Componentes
//------- Página inicial -------
app.get("/", async (req, res) => {
  try {
    const query = "SELECT * FROM freelancer";
    connection.query(query, (err, rows) => {
      if (err) throw err;
      res.render("index", { rows });
    });
  } catch (err) {
    console.log(err);
  }
});

// ------- Freelancers/Developers -------
app.get("/developers", async (req, res) => {
  try {
    const query = 'SELECT * FROM freelancer WHERE f_profession = "Developer"';
    connection.query(query, (err, rows) => {
      if (err) throw err;
      res.render("src/pages/developers", { rows });
    });
  } catch (err) {
    console.log(err);
  }
});

// ------- Freelancers/Designers -------
app.get("/designers", async (req, res) => {
  try {
    const query = 'SELECT * FROM freelancer WHERE f_profession = "Designer"';
    connection.query(query, (err, rows) => {
      if (err) throw err;
      res.render("src/pages/designers", { rows });
    });
  } catch (err) {
    console.log(err);
  }
});

// ------- Freelancers/Marketing -------
app.get("/marketing", async (req, res) => {
  try {
    const query = 'SELECT * FROM freelancer WHERE f_profession = "Marketing"';
    connection.query(query, (err, rows) => {
      if (err) throw err;
      res.render("src/pages/marketing", { rows });
    });
  } catch (err) {
    console.log(err);
  }
});

// ------- Freelancers/Photographers -------
app.get("/photographers", async (req, res) => {
  try {
    const query = 'SELECT * FROM freelancer WHERE f_profession = "Photographer"';
    connection.query(query, (err, rows) => {
      if (err) throw err;
      res.render("src/pages/photographers", { rows });
    });
  } catch (err) {
    console.log(err);
  }
});

//Criar
app.get("/register", (req, res) => {
  res.render("src/pages/register");
});

app.post("/register", async (req, res) => {
  try {
    const { f_name, f_profession, f_desc, f_price } = req.body;
    const query =
      "INSERT INTO freelancer (f_name, f_profession, f_desc, f_price) VALUES (?, ?, ?, ?)";
    connection.query(query, [f_name, f_profession, f_desc, f_price], (err) => {
      if (err) throw err;
      res.redirect("/");
    });
  } catch (err) {
    console.log(err);
  }
});

//Editar
app.get("/edit/:f_name", (req, res) => {
  try {
    const { f_name } = req.params;
    const query = "SELECT * FROM freelancer WHERE f_name = ? limit 1";
    connection.query(query, [f_name], (err, rows) => {
      if (err) throw err;
      res.render("src/pages/edit", { row: rows[0] });
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/edit/:f_nm", (req, res) => {
  try {
    const { f_nm } = req.params;
    const { f_name, f_profession, f_desc, f_price } = req.body;
    const query =
      "UPDATE freelancer SET f_name = ?, f_profession = ?, f_desc = ?, f_price = ? WHERE f_name = ?";
    connection.query(
      query,
      [f_name, f_profession, f_desc, f_price, f_nm],
      (err, result) => {
        if (err) throw err;
        res.redirect("/");
      }
    );
  } catch (err) {
    console.log(err);
  }
});

//Deletar
app.get("/delete/:f_name", (req, res) => {
  try {
    const { f_name } = req.params;
    const query = "DELETE FROM freelancer WHERE f_name = ? limit 1";

    connection.query(query, [f_name], (err) => {
      if (err) throw err;
      res.redirect("/");
    });
  } catch (err) {
    console.log(err);
  }
});

// Inicialização da página
app.listen(8080, () => {
  console.log("Server On");
});