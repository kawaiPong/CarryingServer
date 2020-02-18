var express = require("express");
var router = express.Router();
var db = require("../db");

//read User
router.get("/readUser/:uid", (req, res) => {
  var uid = req.params.uid;

  db((err, conn) => {
    if (err) {
      throw err;
    }
    var sql = "SELECT * FROM user where uid = ?";
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

router.get("/addUser", (req, res) => {
  res.render("post", {
    title: "INSERT",
    postUrl: "addUser/박소원/20200723/3"
  });
});

router.post("/addUser/:nickname/:uid/:gender", function(req, res) {
  var nickname = req.params.nickname || req.body.nickname;
  var uid = req.params.uid || req.body.uid;
  var gender = req.params.gender || req.body.gender;

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
      res.send(result); // 결과는 rows에 담아 전송
    });
  });
});

// router.get("/updateUser", function(req, res) {
//   res.render("post", {
//     title: "UPDATE",
//     postUrl: "updateUser/Carrying/20200101/3"
//   });
// });

router.post("/updateUser/:nickname/:uid/:gender", function(req, res) {
  var nickname = req.body.nickname || req.params.nickname;
  var uid = req.body.uid || req.params.uid;
  var gender = req.body.gender || req.params.gender;

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
      // return res.json({ data: result }); // 결과는 rows에 담아 전송
      res.send(result);
    });
  });
});

router.post("/deleteUser/:uid", (req, res) => {
  var uid = req.params.uid;
  // TODO: uid 바꾸기

  db((err, conn) => {
    if (err) throw err;

    var sql = "DELETE FROM user WHERE uid = ?";
    conn.query(sql, uid, (err, result) => {
      if (err) throw err;
      console.log("delete success");
      // return res.json({ data: result });
      res.send(result);
    });
  });
});

module.exports = router;
