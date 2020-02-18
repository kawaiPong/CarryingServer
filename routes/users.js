var express = require("express");
var router = express.Router();
var db = require("../db");

/* GET users listing. */
router.get("/readUser", (req, res) => {
  var uid = "swiVnf2lVWg3KK3nEN9kL62xHsC3" || req.query.uid;

  db((err, conn) => {
    if (err) {
      throw err;
    }
    var sql = "SELECT * FROM user where uid = ?";
    conn.query(sql, uid, (err, rows) => {
      if (err) {
        throw err;
      }
      return res.json({ data: rows }); // 결과는 rows에 담아 전송
    });
  });
});

router.get("/addUser", (req, res) => {
  res.render("post", { title: "INSERT", postUrl: "addUser" });
});

router.post("/addUser", function(req, res) {
  const nickname = req.query.nickname || req.body.nickname;
  const uid = req.query.uid || req.body.uid;
  const gender = req.query.gender || req.body.gender;

  console.log(nickname + " " + uid + " " + gender);
  // const nickname = "박소원";
  // const uid = "swiVnf2lVWg3KK3nEN9kL62xHsasd";
  // const gender = 0;

  var insertData = {
    nickname: nickname,
    uid: uid,
    gender: gender
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
      console.log("insert success");
      res.json({ data: result }); // 결과는 rows에 담아 전송
    });
  });
});

router.get("/updateUser", function(req, res) {
  res.render("post", { title: "UPDATE", postUrl: "updateUser" });
});

router.post("/updateUser", function(req, res) {
  const nickname = req.query.nickname || req.body.nickname;
  const uid = req.query.uid || req.body.uid;
  const gender = req.query.gender || req.body.gender;

  db((err, conn) => {
    if (err) {
      throw err;
    }
    var sql = "UPDATE user SET nickname = ?, gender = ? WHERE uid = ?";
    conn.query(sql, [nickname, gender, uid], (err, result) => {
      if (err) {
        throw err;
      }

      console.log("update success");
      return res.json({ data: result }); // 결과는 rows에 담아 전송
    });
  });
});

router.post("/deleteUser", (req, res) => {
  var uid = "ㅁㄴㅇㅀ";
  // TODO: uid 바꾸기

  db((err, conn) => {
    if (err) throw err;

    var sql = "DELETE FROM user WHERE uid = ?";
    conn.query(sql, uid, (err, result) => {
      if (err) throw err;
      console.log("delete success");
      return res.json({ data: result });
    });
  });
});

module.exports = router;
