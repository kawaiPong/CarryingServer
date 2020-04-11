const express = require("express");
const db = require("../db/db");
const router = express.Router();

//해당 uid를 갖고 있는 회원의 체크리스트를 불러옴
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

//TODO:이름 중복 방지를 위해 같은 이름이 있으면 (1), (2), ... 등이 생길 수 있도록 하자
router.get("/readSelectedList/:uid/:title", (req, res) => {
  let uid = req.params.uid;
  let title = req.params.title;
  let params = [uid, title];

  db((err, conn) => {
    if (err) {
      throw err;
    }
    let sql = "SELECT * FROM check_list where uid = ? and title = ?";
    conn.query(sql, params, (err, rows) => {
      if (err) {
        throw err;
      }
      // console.log(JSON.stringify(rows));
      // console.log("what");
      console.log(rows);
      res.send(rows);
    });
  });
});

//생성된 체크리스트 저장
/* INSERT INTO CHECKLIST VALUES (0, TITLE, TIME, THEME, ...) */
router.post(
  "/addList/:title/:city/:start_date/:finish_date/:uid/:theme",
  (req, res) => {
    ///:title/:city/:start_date/:finish_date/:uid/:theme

    console.log(req.params);

    let title = req.params.title;
    let city = req.params.city;
    let start_date = req.params.start_date;
    let finish_date = req.params.finish_date;
    let uid = req.params.uid;
    let theme = req.params.theme;

    let insertData = {
      num: 0,
      title: title,
      city: city,
      start_date: start_date,
      finish_date: finish_date,
      uid: uid,
      theme: theme,
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
  }
);

//체크리스트 정보 수정
/* UPDATE CHECKLIST SET ... = ? */
//TODO: 근데 저희 체크리스트 정보는 수정이 안 되는 것 같은데요 ..? 우선 이건 보류합니당
router.post("/updateSelectedList/", (req, res) => {});

//체크리스트 삭제
/* DELETE * FROM CHECKLIST WHERE NUM = ? */
router.post("/deleteSelectedList/:uid/:title", (req, res) => {
  let uid = req.params.uid;
  let title = req.params.title;
  let params = [uid, title];

  //select해서 우선 지울 것의 번호를 가져옴
  //이후 그 리스트 delete
  //redirect를 통해 넘긴 리스트 번호를 이용하여 리스트 아이템까지 삭제

  db((err, conn) => {
    if (err) throw err;
    let sql = "delete from check_list where uid = ? and title = ?";
    conn.query(sql, params, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
  });
});
// 여기에 한 번에 리스트와 그 안의 물품을 다 지우고 싶은데 그러면 이상하게 얽힘.
//리스트 지우고 지운 리스트의 num 값을 받아와서 해당 num 값의 체크리스트 물품을 지워야함.

module.exports = router;
