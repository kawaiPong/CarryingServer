var express = require("express");
var router = express.Router();
var db = require("../db");

//단 한 명의 사용자를 불러올 수 있음 (프로필)
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

// router.get("/addUser", (req, res) => {
//   res.render("post", {
//     title: "INSERT",
//     postUrl: "addUser"
//   });
// });

//사용자 추가 (회원 가입)
router.post("/addUser", (req, res) => {
  var nickname = req.query.nickname || req.body.nickname;
  var uid = req.query.uid || req.body.uid;
  var email = req.query.email || req.body.email;
  var password = req.query.password || req.body.password;
  var gender = req.query.gender || req.body.gender;

  var insertData = {
    nickname: nickname,
    uid: uid,
    email: email,
    password: password,
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

router.get("/updateUser", function(req, res) {
  res.render("post", {
    title: "UPDATE",
    postUrl: "updateUser"
  });
});

//회원 수정 (회원 정보 수정 ) => 이때 중복 체크 확인
router.post("/updateUser", function(req, res) {
  var nickname = req.body.nickname || req.query.nickname;
  var uid = req.body.uid || req.query.uid;
  var gender = req.body.gender || req.query.gender;

  var chNickname = chDuplicate(uid);

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

//회원탈퇴
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

var chDupNickname = name => {
  db((err, conn) => {
    if (err) throw err;

    var sql = "select nickname from user where nickname = ?";
    conn.query(sql, name, (err, result) => {
      if (err) {
        return;
      }
      if (result[0].nickname == undefined) {
        return true;
      } else {
        return false;
      }
    });
  });
};

var chDupEmail = email => {
  db((err, conn) => {
    if (err) throw err;

    var sql = "select email from user where email = ?";
    conn.query(sql, email, (err, result) => {
      if (err) {
        return;
      }
      if (result[0].email == undefined) {
        return true;
      } else {
        return false;
      }
    });
  });
};

var findPassword = () => {};

module.exports = router;
