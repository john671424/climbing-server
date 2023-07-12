const { log } = require('debug/src/browser');
var express = require('express');
var security= require('../../../../security');
var router = express.Router();
//須提交創辦者uID activity_name activity_time tID warning_distance warning_time\
//及參與人員
// {
//     "uID":"1",
//     "activity_name":"john1",
//     "tID":"1",
//     "warning_distance":"50",
//     "warning_time":"15",
// }
//新增活動時 提醒更新activty //要傳送aID給client
let insert_activity = (db, req) => {
  return new Promise((resolve, reject) => {
    let sql = "INSERT INTO `activity`(`uID`,`activity_time`, `activity_name`, `tID`, `warning_distance`, `warning_time`) VALUES (?,?,?,?,?,?)";
    let param = [req.body.uID, req.body.activity_time, req.body.activity_name, req.body.tID, req.body.warning_distance, req.body.warning_time];
    db.query(sql, param, (err, result, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  });
}

let select_insert_activity = (db, aID) => {
  return new Promise((resolve, reject) => {
    let sql = "SELECT * FROM `activity` WHERE `aID`=?";
    let param = [aID];
    db.query(sql, param, (err, result, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  });
}

router.post('/',security, async function (req, res, next) {
  try {
    let insert_activity_results = await insert_activity(req.db, req);
    members = JSON.parse(req.body.members);
    let select_insert_activity_results = await select_insert_activity(req.db, insert_activity_results.insertId)
    res.json(select_insert_activity_results[0]);
  } catch (error) {
    res.json({ "result": "Fail to add activity" });
    console.log(error);
  }
});

module.exports = router;

