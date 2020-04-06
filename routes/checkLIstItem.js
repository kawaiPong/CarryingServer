const express = require("express");
const db = require("./db/db");
const router = express.Router();

//생성 시 체크리스트의 테마에 맞게 물건 불러오기
/* SELECT * FROM PACKLIST WHERE THEME = ? 
   INSERT INTO CHECKLISTITEM VALUES (0, NAME, THEME, ...) */
//체크리스트 읽기
/* SELECT NAME FROM CHECKLISTITEM WHERE NUM = ? */
//TODO:불러온 상태로 편집할 때 -> 추가할 때, 삭제할 때
/* 추가
   INSERT INTO */
//해당 물건 체크 및 미체크
/* UPDATE CHECKLISTITEM SET STATE = ? WHERE NUM = ? */
//체크리스트 삭제
/* DELETE * FROM CHECKLISTITEM WHERE NUM = ? */

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

//TODO: theme, gender, weather에 따라 가져오는 JSON 값이 다름.
router.get("/readPackListbySetting/:theme/:gender/:weather", (req, res) => {
  var theme = req.params.theme;
  var gender = req.params.gender;
  var weather = req.params.weather;

  if (theme.length != 0) {
    const themeArr = theme.split(" ");
  }
  if (weather.length != 0) {
    const weatherArr = weather.split(" ");
  }

  db((err, conn) => {
    if (err) throw err;
    var sql = "SELECT * FROM pack_list";
    conn.query(sql, (err, rows) => {
      if (err) throw err;
      return res.json({ data: rows });
    });
  });
});

//insert, update, delete 는 관리자가 할 일.

module.exports = router;
