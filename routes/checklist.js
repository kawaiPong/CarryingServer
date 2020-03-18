const express = require("express");
const db = require("../db");
const router = express.Router();

router.get("/readAllList/:uid", (req, res) => {
  let uid = req.params.uid;

  db((err, conn) => {
    if (err) {
      throw err;
    }
    let sql = "SELECT * FROM check_list where uid = ?";
    conn.query(sql, uid, (err, rows) => {
      if (err) {
        throw err;
      }
      // console.log(JSON.stringify(rows));
      // console.log("what");
      res.send(rows);
    });
  });
});

router.get("/readSelectedList/:title", (req, res) => {
  let num = req.params.num;

  db((err, conn) => {
    if (err) {
      throw err;
    }
    let sql = "SELECT * FROM user where num = ?";
    conn.query(sql, uid, (err, rows) => {
      if (err) {
        throw err;
      }
      // console.log(JSON.stringify(rows));
      // console.log("what");
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(rows[0]));
    });
  });
});

router.post("/addList", (req, res) => {
  ///:title/:city/:start_date/:finish_date/:uid/:theme
  
  let title = req.params.title;
  let city = req.params.city;
  let start_date = req.params.start_date;
  let finish_date = req.params.finish_date;
  let uid = req.params.uid;
  let theme = req.params.theme;

  // let title = req.query.title;
  // let city = req.query.city;
  // let start_date = req.query.start_date;
  // let finish_date = req.query.finish_date;
  // let uid = req.query.uid;
  // let theme = req.query.theme;

  let insertData = {
    num: 0,
    title: title,
    city: city,
    start_date: start_date,
    finish_date: finish_date,
    uid: uid,
    theme: theme
  };

  db((err, conn) => {
    if (err) {
      throw err;
    }
    let sql = "INSERT INTO check_list SET ?;";
    conn.query(sql, insertData, (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  });
});

router.post("/updateSelectedList/", (req, res) => {});

router.post("/deleteSelectedList/", (req, res) => {});

module.exports = router;
