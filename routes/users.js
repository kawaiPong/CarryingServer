var express = require("express");
var router = express.Router();
var db = require("../db");

/* GET users listing. */
router.get("/", function(req, res) {
  db((err, conn) => {
    if (err) {
      throw err;
    }
    console.log("error");
    conn.query("SELECT * FROM user", (err, rows) => {
      conn.release(); // 연결세션 반환.
      if (err) {
        throw err;
      }

      return res.json({ data: rows }); // 결과는 rows에 담아 전송
    });
  });
});

module.exports = router;
