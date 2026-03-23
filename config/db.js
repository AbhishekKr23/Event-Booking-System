require("dotenv").config();
const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Qwerty@123",
  database: "event_db",
});

module.exports = pool;