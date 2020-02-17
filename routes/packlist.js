var express = require("express");
var db = require("../db");

const router = express.Router();

//TODO: theme, gender, weather에 따라 가져오는 JSON 값이 다름.
router.get("/readListAll", (req, res) => {
  db((err, conn) => {
    if (err) throw err;
    var sql = "SELECT * FROM pack_list";
    conn.query(sql, (err, rows) => {
      if (err) throw err;
      return res.json({ data: rows });
    });
  });
});

//insert, update, delete 는 관리자가 할 일.

module.exports = router;
