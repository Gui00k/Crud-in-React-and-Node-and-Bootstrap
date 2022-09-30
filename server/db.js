const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "YOUR PASSWORD",
  host: "localhost",
  port: 5432,
  database: "YOUR DATABASE",
});
module.exports = pool;
