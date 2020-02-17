var express = require("express");
var db = require("../db");

const router = express.Router();

router.get("/getList", (req, res) => {
  db((err, conn) => {
    if (err) throw err;
    var sql = "SELECT * FROM pack_list";
    conn.query(sql, (err, rows) => {
      if (err) throw err;
      return res.json({ data: rows });
    });
  });
});

module.exports = router;
