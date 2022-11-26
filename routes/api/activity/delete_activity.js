var express = require('express');
var router = express.Router();
// {
//     "uID":"9"
//     "aID":"1",
// }
//以到 server 時間為主
let delete_activity_member = (db, req) => {
  return new Promise((resolve, reject) => {
    let sql = "DELETE FROM `activity_member` WHERE `aID`=?";
    let param = [req.body.aID];
    db.query(sql, param, (err, result, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  });
}
let select_activity_member = (db, req) => {
  return new Promise((resolve, reject) => {
    let sql = "select * FROM `activity_member` WHERE `aID`=?";
    let param = [req.body.aID];
    db.query(sql, param, (err, result, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  });
}
let delete_activity = (db, aID) => {
  return new Promise((resolve, reject) => {
    let sql = "DELETE FROM `activity` WHERE `aID`=?";
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
let select_member = (db, uID) => {
  return new Promise((resolve, reject) => {
    let sql = "SELECT * FROM `member` WHERE `uID`=?";
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
let select_activity = (db, aID) => {
  return new Promise((resolve, reject) => {
    let sql = "SELECT * FROM `activity` WHERE `aID`=?";
    let param = [aID];
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
      let select_activity_results = await select_activity(req.db, req.body.aID);
      let delete_activity_results = await delete_activity(req.db, req.body.aID);
      console.log("hi");
      let select_activity_member_results = await select_activity_member(req.db, req);
      select_activity_member_results.forEach(async element => {
        let member_results = await select_member(req.db, element.uID);
        req.socket.io.to(member_results[0].account).emit("account", {
          "ctlmsg": "activity delete",
          "activity_msg": req.body.aID+" " +select_activity_results[0].activity_name
        })
      });
      let delete_activity_member_results = await delete_activity_member(req.db, req);
      res.json({ "result": "Delete a activity successfully" })
    } else {
      req.session.destroy();
      res.json({ "result": "session fail" });
    }
  } catch (error) {
    res.json({ "result": "Fail to delete a activity" });
    console.log(error);
  }
});

module.exports = router;

