var express = require('express');
var router = express.Router();
// {
//     "uID":"9"
// }
//以到 server 時間為主
let update_member = (db, uID,total_track) => {
  return new Promise((resolve, reject) => {
    let sql = "UPDATE `member` SET `total_track`=? WHERE `uID`=?";
    let param = [total_track+1, uID];
    db.query(sql, param, (err, result, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  });
}
let select_member = (db, uID) => {
  return new Promise((resolve, reject) => {
    let sql = "SELECT `uID`, `account`,`name`, `total_distance`, `total_time`, `total_activity`, `total_track` FROM `member` WHERE `uID`=?";
    let param = [uID];
    db.query(sql, param, (err, result, fields) => {
      if (err) {
        reject(err);
      } else {
        if (result.length != 1) {
          reject("error");
        } else {
          resolve(result);
        }
      }
    })
  });
}
router.post('/', async function (req, res, next) {
  try {
    let member_results = await select_member(req.db, req.body.uID);
    if (req.session.account && member_results[0].account == req.session.account) {
      let update_member_results = await update_member(req.db, req.body.uID,member_results[0].total_track);
      let select_update_member_results = await select_member(req.db, req.body.uID);
      res.json(select_update_member_results[0]);
    } else {
      req.session.destroy();
      res.json({ "result": "session fail" });
    }
  } catch (error) {
    res.json({ "result": "Fail to update total_track in member table" });
    console.log(error);
  }
});

module.exports = router;

