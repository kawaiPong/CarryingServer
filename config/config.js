var mysql = require("mysql");

var conn = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "mirim2",
  database: "carrying",
  charset: "utf-8",
  debug: false
});

module.exports = conn;
