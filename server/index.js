const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

// rotas

//create / insert

app.post("/todos", async (req, res) => {
  try {
    //aqui voce declara os argumentos que recebe pelo body em uma variavel
    const { description } = req.body;

    const newCrud = await pool.query(
      "INSERT INTO crud (description) VALUES($1) RETURNING *",
      [description]
    );
    console.log(newCrud);
    res.json(newCrud.rows[0]);
    //ver o que tem no body do conteudo
    console.log(req.body);
  } catch (err) {
    console.log(err.message);
  }
});

//get all

app.get("/todos", async (req, res) => {
  try {
    const GetAll = await pool.query("SELECT * FROM crud");
    res.json(GetAll.rows);
  } catch (err) {
    console.error(err.mensage);
  }
});

//GET ONE
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM crud WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
    console.log(req.params);
  } catch (err) {
    console.error(err.message);
  }
});

//update table

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = await req.body;
    const updateCrud = await pool.query(
      "UPDATE crud SET description = $1 WHERE todo_id =$2",
      [description, id]
    );
    res.json("Crus has update");
  } catch (err) {
    console.log(err.mensage);
  }
});

//delet from table
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCrud = await pool.query("DELETE FROM crud WHERE todo_id = $1", [
      id,
    ]);
    console.log(req.params);
    res.json("Deleted has be sucess");
  } catch (err) {
    console.log(err.mensage);
  }
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
