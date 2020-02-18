var express = require("express");
var db = require("../db");

const router = express.Router();

router.get("/readListsByUid/:uid", (req, res) => {
  var uid = req.params.uid;

  db((err, conn) => {
    if (err) {
      throw err;
    }
    var sql = "SELECT * FROM check_list where uid = ?";
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

router.get("/readSelectedList/:num", (req, res) => {
  var num = req.params.num;

  db((err, conn) => {
    if (err) {
      throw err;
    }
    var sql = "SELECT * FROM user where num = ?";
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

router.post(
  "/addList/:title/:city/:start_date/:finish_date/:thing_list/:uid",
  (req, res) => {
    var title = req.params.title;
    var city = req.params.city;
    var start_date = req.params.start_date;
    var finish_date = req.params.finish_date;
    var thing_list = req.params.thing_list;
    var uid = req.params.uid;

    var insertData = {
      title: title,
      city: city,
      start_date: start_date,
      finish_date: finish_date,
      thing_list: thing_list,
      uid: uid
    };

    db((err, conn) => {
      if (err) {
        throw err;
      }
      var sql = "INSERT INTO user SET ?;";
      conn.query(sql, insertData, (err, result) => {
        if (err) {
          throw err;
        }
        // console.log(JSON.stringify(rows));
        // console.log("what");
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(result[0]));
      });
    });
  }
);

router.post("/updateSelectedList/", (req, res) => {});

router.post("/deleteSelectedList/", (req, res) => {});
