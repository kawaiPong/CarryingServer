const express = require('express');
const db = require('../db/db');
const router = express.Router();

//해당 uid를 갖고 있는 회원의 체크리스트를 불러옴
router.get('/readAllList/:uid', (req, res) => {
  let uid = req.params.uid;

  db((err, conn) => {
    if (err) {
      throw err;
    }
    let sql = 'SELECT * FROM check_list where uid = ?';
    conn.query(sql, uid, (err, rows) => {
      if (err) {
        throw err;
        W;
      }
      res.send(rows);
    });
  });
});

router.get('/readSelectedList/:uid/:title', (req, res) => {
  let uid = req.params.uid;
  let title = req.params.title;
  let params = [uid, title];

  db((err, conn) => {
    if (err) {
      throw err;
    }
    let sql = 'SELECT * FROM check_list where uid = ? and title = ?';
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
  '/addList/:city/:start_date/:finish_date/:uid/:gender/:theme/:season',
  (req, res) => {
    // let title = req.params.city; //TODO:이름 중복 방지를 위해 같은 이름이 있으면 (1), (2), ... 등이 생길 수 있도록 하자
    let city = req.params.city;
    let start_date = req.params.start_date;
    let finish_date = req.params.finish_date;
    let uid = req.params.uid;
    let theme = req.params.theme;
    let gender = req.params.gender;
    let season = req.params.season;

    db((err, conn) => {
      if (err) {
        throw err;
      }

      let sql1 =
        'INSERT INTO check_list ' +
        'values (0, CONCAT(?, "_", (' +
        'select count(num)+1 from (' +
        'select num from check_list where city = ? and uid = ?' +
        ') as t)), ?, ?, ?, ?, ?, ?);';

      let sql2 = 'select last_insert_id() as identify;';

      conn.query(
        sql1,
        [city, city, uid, city, start_date, finish_date, uid, theme, season],
        (err, result) => {
          if (err) {
            throw err;
          }
        }
      );

      conn.query(sql2, (err, result) => {
        if (err) throw err;
        //res.send(result);
        res.redirect(
          '/item/createCheckList/' +
            result[0].identify +
            '/' +
            theme +
            '/' +
            gender +
            '/' +
            season
        );
      });
    });
  }
);

//체크리스트 정보 수정
/* UPDATE CHECKLIST SET ... = ? */
//TODO: 근데 저희 체크리스트 정보는 수정이 안 되는 것 같은데요 ..? 우선 이건 보류합니당
router.post(
  '/updateSelectedList/:num/:start_date/:finish_date/:theme/:season',
  (req, res) => {
    console.log(req.params);

    // let title = req.params.city; //TODO:이름 중복 방지를 위해 같은 이름이 있으면 (1), (2), ... 등이 생길 수 있도록 하자
    let num = req.params.num;
    // let uid = req.params.uid;
    // let city = req.params.city;
    let start_date = req.params.start_date;
    let finish_date = req.params.finish_date;
    let theme = req.params.theme;
    let season = req.params.season;

    db((err, conn) => {
      if (err) {
        throw err;
      }

      let sql =
        'UPDATE check_list set ' +
        'start_date = ?, finish_date = ?, theme = ? where num = ?;';
      conn.query(
        sql,
        [start_date, finish_date, theme, season, num],
        (err, result) => {
          if (err) {
            throw err;
          }
          res.send(result);
        }
      );
    });
  }
);

router.post('/deleteSelectedList/:num', (req, res) => {
  let num = req.params.num;

  //select해서 우선 지울 것의 번호를 가져옴
  //이후 그 리스트 delete
  //redirect를 통해 넘긴 리스트 번호를 이용하여 리스트 아이템까지

  db((err, conn) => {
    if (err) throw err;
    let sql = 'delete from check_list where num = ?';
    conn.query(sql, num, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
  });
});
// 여기에 한 번에 리스트와 그 안의 물품을 다 지우고 싶은데 그러면 이상하게 얽힘.
//리스트 지우고 지운 리스트의 num 값을 받아와서 해당 num 값의 체크리스트 물품을 지워야함.

//체크리스트 삭제
/* DELETE * FROM CHECKLIST WHERE NUM = ? */
// router.post('/deleteSelectedList/:uid/:title', (req, res) => {
//   let uid = req.params.uid;
//   let title = req.params.title;
//   let params = [uid, title];

//   //select해서 우선 지울 것의 번호를 가져옴
//   //이후 그 리스트 delete
//   //redirect를 통해 넘긴 리스트 번호를 이용하여 리스트 아이템까지

//   db((err, conn) => {
//     if (err) throw err;
//     let sql = 'delete from check_list where uid = ? and title = ?';
//     conn.query(sql, params, (err, result) => {
//       if (err) throw err;
//       console.log(result);
//       res.send(result);
//     });
//   });
// });

module.exports = router;
