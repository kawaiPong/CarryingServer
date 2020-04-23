const express = require('express');
const db = require('../db/db');
const router = express.Router();

//체크리스트 읽기
/* SELECT NAME, STATUS FROM CHECKLISTITEM WHERE NUM = ? */

//해당 물건 체크 및 미체크
/* UPDATE CHECKLISTITEM SET STATE = ? WHERE NUM = ?  */

//DONE:생성 시 체크리스트의 테마에 맞게 물건 불러오고 저장
router.post(
  '/createCheckList/:list_num/:theme/:gender/:weather',
  (req, res) => {
    let listnum = req.params.list_num;
    let theme = req.params.theme;
    let gender = req.params.gender;
    let weather = req.params.weather;
    let sql;

    //   if (theme.length != 0) {
    //     const themeArr = theme.split(" ");
    //   }
    //   if (weather.length != 0) {
    //     const weatherArr = weather.split(" ");
    //   }

    db((err, conn) => {
      if (err) throw err;
      sql =
        'insert into check_list_item select 0, name, false, ? from pack_list where theme = ? or gender = ? or weather = ?;'; //or gender = ? or weather or ? ;
      conn.query(sql, [listnum, theme, gender, weather], (err, rows) => {
        //gender, weather 포함
        if (err) throw err;
        result = rows;
        console.log(rows);
        res.send(rows);
      });
    });
  }
);

router.get('/readCheckListItems/:uid/:checkListNum', (req, res) => {
  let uid = req.params.uid;
  let checkListNum = req.params.checkListNum;

  db((err, conn) => {
    if (err) throw err;

    let sql =
      'select name, status from check_list_item where uid = ? and checkListNum = ?';
    conn.query(sql, [uid, checkListNum], (err, result) => {
      if (err) throw err;
      res.send(result[0]);
    });
  });
});

//항목 추가
router.post('/addCheckListItem/:listNum/:name', (req, res) => {
  let listNum = req.params.listNum;
  let name = req.params.name;

  db((err, conn) => {
    if (err) throw err;
    sql = 'INSERT INTO check_list_item values (0, ?, false, ?)';
    conn.query(sql, [name, listNum], (err, rows) => {
      if (err) throw err;
      res.send(rows);
    });
  });
});

// check_list의 num에 check_list_item의 list_num을 외래키로 걸어
// on delete cascade를 설정했기에 앞 check_list가 사라지면 해당 check_list_itme 레코드들도 다 삭제됨.
//항목 삭제
router.post('/deleteCheckListItem/:list_num/:name', (req, res) => {
  db((err, conn) => {
    if (err) throw err;

    let sql =
      'delete from check_list_item where num = (select * from (select num from user where name = ? and list_num = ?) as t)';
    conn.query(sql, nickname, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
  });
});

module.exports = router;
