const express = require("express");
const db = require("../db");
const router = express.Router();

router.get("/getCheckListItems/:uid", (req, res) => {
  let uid = req.params.uid;

  db((err, conn) => {
    if (err) throw err;

    let sql = "";
    conn.query(sql, uid, (err, result) => {
      if (err) throw err;
      res.send(result[0]);
    });
  });
});
