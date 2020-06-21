const express = require('express');
const db = require('../db/db');
const router = express.Router();

//체크리스트 읽기
/* SELECT NAME, STATUS FROM CHECKLISTITEM WHERE NUM = ? */

//해당 물건 체크 및 미체크
/* UPDATE CHECKLISTITEM SET STATE = ? WHERE NUM = ?  */

//DONE:생성 시 체크리스트의 테마에 맞게 물건 불러오고 저장

router.get('/insert/:name/:theme/:gender/:season', (req, res) => {
  let name = req.params.name;
  let theme = req.params.theme;
  let gender = req.params.gender;
  let season = req.params.season;

  db((err, conn) => {
    if (err) throw err;

    let sql = 'insert into pack_list values (?, ?, ?, ?);';

    conn.query(sql, [name, theme, gender, season], (err, result) => {
      if (err) throw err;

      res.send(result);
    });
  });
});

router.get('/update/:name/:theme/:gender/:season', (req, res) => {
  let name = req.params.name;
  let theme = req.params.theme;
  let gender = req.params.gender;
  let season = req.params.season;

  db((err, conn) => {
    if (err) throw err;

    let sql =
      'update pack_list set theme = ?, gender = ?, season = ? where name = ?;';

    conn.query(sql, [theme, gender, season, name], (err, result) => {
      if (err) throw err;

      res.send(result);
    });
  });
});

router.get('/delete/:name', (req, res) => {
  let name = req.params.name;

  db((err, conn) => {
    if (err) throw err;

    let sql = 'delete from pack_list where name = ?;';

    conn.query(sql, name, (err, result) => {
      if (err) throw err;

      res.send(result);
    });
  });
});

router.get('/createCheckList/:list_num/:theme/:gender/:season', (req, res) => {
  let listnum = req.params.list_num;
  let theme = req.params.theme;
  let gender = req.params.gender;
  let season = req.params.season;
  let sql;

  db((err, conn) => {
    if (err) throw err;
    sql =
      'insert into check_list_item select 0, name, false, ? from pack_list where theme = ? or theme = 0 or gender = ? or gender = 0 or season = ? or season = 0;';
    conn.query(sql, [listnum, theme, gender, season], (err, rows) => {
      if (err) throw err;
      result = rows;
      console.log(rows);
      res.send(rows);
    });
  });
});

router.get('/readCheckListItems/:list_num', (req, res) => {
  let list_num = req.params.list_num;

  db((err, conn) => {
    if (err) throw err;

    let sql =
      'select check_num, name, status from check_list_item where list_num = ?';
    conn.query(sql, list_num, (err, result) => {
      if (err) throw err;
      res.send(result);
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
      res.redirect('/item/readCheckListItems/' + listNum);
      // res.send(result);
    });
  });
});

router.post('/updateCheckListItem/:list_num/:check_num', (req, res) => {
  let check_num = req.params.check_num;
  let list_num = req.params.list_num;

  db((err, conn) => {
    if (err) throw err;

    let sql = 'update check_list_item set status = !status where check_num = ?';
    conn.query(sql, check_num, (err, result) => {
      if (err) throw err;
      res.redirect('/item/readCheckListItems/' + list_num);
    });
  });
});

router.post('/deleteCheckListItem/:check_num', (req, res) => {
  let check_num = req.params.check_num;

  db((err, conn) => {
    if (err) throw err;

    let sql = 'delete from check_list_item where check_num = ?';
    // let sql = 'delete from check_list_item where check_num = (select * from (select num from user where name = ? and list_num = ?) as t)';
    conn.query(sql, check_num, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
  });
});

// check_list의 num에 check_list_item의 list_num을 외래키로 걸어
// on delete cascade를 설정했기에 앞 check_list가 사라지면 해당 check_list_itme 레코드들도 다 삭제됨.
//항목 삭제
// router.post('/deleteCheckListItem/:list_num/:name', (req, res) => {
//   let list_num = req.params.list_num;
//   let name = req.params.name;

//   db((err, conn) => {
//     if (err) throw err;

//     let sql =
//       'delete from check_list_item where num = (select * from (select num from user where name = ? and list_num = ?) as t)';
//     conn.query(sql, name, list_num, (err, result) => {
//       if (err) throw err;
//       console.log(result);
//       res.send(result);
//     });
//   });
// });

module.exports = router;
