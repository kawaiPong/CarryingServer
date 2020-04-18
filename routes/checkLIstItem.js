const express = require("express");
const db = require("../db/db");
const router = express.Router();

//DONE:생성 시 체크리스트의 테마에 맞게 물건 불러오기
/* SELECT * FROM PACKLIST WHERE THEME = ? */

//체크리스트 저장 -> json 처리, 처음엔 저장, 이후엔 편집이 되어야 하는데 이는 어떻게 할 것인가요 ???
/* INSERT INTO CHECKLISTITEM VALUES (0, NAME, THEME, ...) */

//체크리스트 읽기
/* SELECT NAME, STATUS FROM CHECKLISTITEM WHERE NUM = ? */

//TODO:불러온 상태로 편집할 때 -> 추가할 때, 삭제할 때
/* 추가
   INSERT INTO */

//해당 물건 체크 및 미체크
/* UPDATE CHECKLISTITEM SET STATE = ? WHERE NUM = ?  */

//체크리스트 삭제
/* DELETE * FROM CHECKLISTITEM WHERE NUM = ? */

router.get("/createCheckList/:theme", (req, res) => {
  let theme = req.params.theme;
  let sql;

  db((err, conn) => {
    if (err) throw err;
    sql = "SELECT name FROM PACK_LIST WHERE THEME = ?";
    conn.query(sql, theme, (err, rows) => {
      if (err) throw err;
      result = rows;
      console.log(rows);
      res.send(rows);
    });
  });
});

//생성된 체크리스트 및 수정된 체크리스트 저장

//TODO: json 형식을 어떻게 가져오게 할까 .
router.post("/saveCheckListItem/:uid/:checkListNum/:...", (req, res) => {
  let uid = req.params.uid;
  let checkListNum = req.params.checkListNum;

  db((err, conn) => {
    if (err) throw err;
    sql = "INSERT INTO check_list_item values (0, ...)";
    conn.query(sql, theme, (err, rows) => {
      if (err) throw err;
      result = rows;
      console.log(rows);
      res.send(rows);
    });
  });
});

router.get("/readCheckListItems/:uid/:checkListNum", (req, res) => {
  let uid = req.params.uid;
  let checkListNum = req.params.checkListNum;

  db((err, conn) => {
    if (err) throw err;

    let sql =
      "select name, status from check_list_item where uid = ? and checkListNum = ?";
    conn.query(sql, [uid, checkListNum], (err, result) => {
      if (err) throw err;
      res.send(result[0]);
    });
  });
});

router.post(
  "/addCheckListItem/:uid/:checkListNum/:name/:status",
  (req, res) => {
    let uid = req.params.uid;
    let checkListNum = req.params.checkListNum;
    let name = req.params.name;
    let status = req.params.status;

    db((err, conn) => {
      if (err) throw err;
      sql = "INSERT INTO check_list_item values (0, ...)";
      conn.query(sql, theme, (err, rows) => {
        if (err) throw err;
        res.send(rows);
      });
    });
  }
);

// //TODO: theme, gender, weather에 따라 가져오는 JSON 값이 다름.
// router.get("/readPackListbySetting/:theme/:gender/:weather", (req, res) => {
//   var theme = req.params.theme;
//   var gender = req.params.gender;
//   var weather = req.params.weather;

//   if (theme.length != 0) {
//     const themeArr = theme.split(" ");
//   }
//   if (weather.length != 0) {
//     const weatherArr = weather.split(" ");
//   }

//   db((err, conn) => {
//     if (err) throw err;
//     var sql = "SELECT * FROM pack_list";
//     conn.query(sql, (err, rows) => {
//       if (err) throw err;
//       return res.json({ data: rows });
//     });
//   });
// });

router.post("/deleteCheckListItem/:num", (req, res) => {});
module.exports = router;
