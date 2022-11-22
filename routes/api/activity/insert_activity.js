var express = require('express');
var router = express.Router();
//須提交創辦者uID activity_name activity_time tID warning_distance warning_time\
//及參與人員
// {
//     "uID":"1",
//     "activity_name":"john1",
//     "tID":"1",
//     "warning_distance":"50",
//     "warning_time":"15",
//     "members":[2,3]
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
let insert_activity_member = (db, req, results, members) => {
  return new Promise((resolve, reject) => {
    members.forEach(element => {
      let sql = "INSERT INTO `activity_member`(`aID`,`uID`) VALUES (?,?)";
      let param = [results.insertId, element];
      db.query(sql, param, (err, result, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      })
    });
  });
}
let select_insert_activity_member = (db, req, members, insert_activity_results) => {
  return new Promise((resolve, reject) => {
    members.forEach(element => {
      let sql = "SELECT * FROM `member` WHERE `uID`=?";
      let param = [element];
      db.query(sql, param, (err, result, fields) => {
        if (err) {
          reject(err);
        } else {
          req.socket.io.to(result[0].account).emit("account", {
            "ctlmsg": "activity update",
            "activity_msg": insert_activity_results.insertId + " " + req.body.activity_name
          });
          resolve(result);
        }
      })
      //socket or email
    });
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

router.post('/', async function (req, res, next) {
  try {
    if (req.session.account) {
      let formData = req.body;
      console.log(formData);
      let insert_activity_results = await insert_activity(req.db, req);
      console.log(insert_activity_results);
      tmp = req.body.members.replace("[", "");
      tmp2 = tmp.replace("]", "");
      members = tmp2.split(',');
      let insert_activity_member_results = await insert_activity_member(req.db, req, insert_activity_results, members);
      let select_insert_activity_member_results = await select_insert_activity_member(req.db, req, members, insert_activity_results);
      let select_insert_activity_results = await select_insert_activity(req.db, insert_activity_results.insertId)
      res.json(select_insert_activity_results[0]);
    } else {
      req.session.destroy();
      res.json({ "result": "Session fail" });
    }
  } catch (error) {
    res.json({ "result": "Fail to add activity" });
    console.log(error);
  }
});

module.exports = router;

