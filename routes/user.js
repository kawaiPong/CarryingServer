var express = require("express");
var router = express.Router();
var db = require("../db");

var chDupNickname = (nickname, callback) => {
  console.log("none");
  let check;
  db((err, conn) => {
    if (err) throw err;

    var sql = "select count(*) as count from user where nickname = ?";
    conn.query(sql, nickname, (err, result) => {
      if (err) throw err;
      if (result[0].count > 0) {
        callback(true);
      } else {
        callback(false);
      }
    });
  });
};

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

//사용자 추가 (회원 가입)
router.post("/addUser/:uid/:nickname/:email/:password/:gender", (req, res) => {
  var nickname = req.params.nickname;
  var uid = req.params.uid;
  var email = req.params.email;
  var password = req.params.password;
  var gender = req.params.gender;

  console.log("check");
  var check = chDupNickname(nickname, check => {
    console.log(check);
    return check;
  });
  console.log(check);
  res.send(JSON.stringify({ check: `${check}` }));

  // var insertData = {
  //   num: 0,
  //   nickname: nickname,
  //   uid: uid,
  //   email: email,
  //   password: password,
  //   gender: gender
  // };

  // db((err, conn) => {
  //   if (err) {
  //     throw err;
  //   }
  //   var sql = "INSERT INTO user SET ?;";
  //   conn.query(sql, insertData, (err, result) => {
  //     if (err) {
  //       throw err;
  //     }
  //     console.log("insert success");
  //     res.send(result); // 결과는 rows에 담아 전송
  //   });
  // });
});

// router.get("/updateUser", function(req, res) {
//   res.render("post", {
//     title: "UPDATE",
//     postUrl: "updateUser"
//   });
// });

//회원 수정 (회원 정보 수정 ) => 이때 중복 체크 확인
router.post("/updateUser", function(req, res) {
  var nickname = req.body.nickname || req.query.nickname;
  var uid = req.body.uid || req.query.uid;
  var gender = req.body.gender || req.query.gender;

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

router.post("/chDupNickname/:nickname", (req, res) => {
  var check = chDupNickname(req.params.nickname);
  res.send(check);
}); // 이 함수를 라우터로 변환한 후에 render 함수를 이용하여 도중에 리다이렉트 시킨 후 값 받아오기

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
