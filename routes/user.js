const express = require("express");
const db = require("../db/db");

const router = express.Router();

//단 한 명의 사용자를 불러올 수 있음 (프로필)
router.get("/readUser/:uid", (req, res) => {
  let uid = req.params.uid;

  db((err, conn) => {
    if (err) {
      throw err;
    }
    let sql = "SELECT * FROM user where uid = ?";
    conn.query(sql, uid, (err, rows) => {
      if (err) {
        throw err;
      }
      // console.log(JSON.stringify(rows));
      // console.log("what");
      res.setHeader("Content-Type", "application/json");
      res.send(rows[0]);
    });
  });
});

//사용자 추가 (회원 가입)
router.post("/addUser/:uid/:nickname/:email/:password/:gender", (req, res) => {
  let nickname = req.params.nickname;
  let uid = req.params.uid;
  let email = req.params.email;
  let password = req.params.password;
  let gender = req.params.gender;

  console.log(nickname);

  //TODO: 중복체크
  //중복 ID
  //중복 EMAIL

  let insertData = {
    num: 0,
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
    let sql = "INSERT INTO user SET ?;";
    conn.query(sql, insertData, (err, result) => {
      if (err) {
        throw err;
      }
      console.log("insert success");
      res.send(result); // 결과는 rows에 담아 전송
    });
  });
});

//회원 수정 (회원 정보 수정 ) => 이때 중복 체크 확인
router.post(
  "/updateUser/:uid/:nickname/:email/:password/:gender",
  (req, res) => {
    let uid = req.params.uid;
    let nickname = req.params.nickname;
    let email = req.params.email;
    let password = req.params.password;
    let gender = req.params.gender;

    db((err, conn) => {
      if (err) {
        throw err;
      }
      let sql =
        "UPDATE user SET nickname = ?, email = ?, password = ?, gender = ? WHERE uid = ?";
      conn.query(
        sql,
        [nickname, email, password, gender, uid],
        (err, result) => {
          if (err) {
            throw err;
          }

          console.log("update success");
          // return res.json({ data: result }); // 결과는 rows에 담아 전송
          res.send(result);
        }
      );
    });
  }
);

router.post("/updatePassword/:uid/:password", (req, res) => {
  let uid = req.params.uid;
  let password = req.params.password;

  db((err, conn) => {
    if (err) {
      throw err;
    }
    let sql = "UPDATE user SET password = ? WHERE uid = ?";
    conn.query(sql, [password, uid], (err, result) => {
      if (err) {
        throw err;
      }
      console.log("updatePassword success");
      res.send(result);
    });
  });
});

//회원탈퇴
router.post("/deleteUser/:uid", (req, res) => {
  let uid = req.params.uid;

  db((err, conn) => {
    if (err) throw err;

    let sql = "DELETE FROM user WHERE uid = ?";
    conn.query(sql, uid, (err, result) => {
      if (err) throw err;
      console.log("delete success");
      // return res.json({ data: result });
      res.send(result);
    });
  });
});

//비밀번호 찾기 및 변경 Activity에서 이메일이 존재하는지 확인 여부를 묻는 버튼 클릭 시
//반환값 : {"exist" : (true of false)}
router.get("/existEmail/:email", (req, res) => {
  let email = req.params.email;

  db((err, conn) => {
    if (err) throw err;

    let sql = "select count(*) as count from user where email = ?";
    conn.query(sql, email, (err, result) => {
      if (err) throw err;
      if (result[0].count > 0) {
        res.send(JSON.stringify({ exist: true }));
      } else {
        res.send(JSON.stringify({ exist: false }));
      }
    });
  });
});

module.exports = router;
