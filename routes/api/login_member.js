var express = require('express');
var router = express.Router();
let name = [];
let curUser;
let select_account = (db, req) => {
  return new Promise((resolve, reject) => {
    let sql = "SELECT * FROM `member` WHERE `account`=? AND `password`=?";
    let param = [req.body.account, req.body.password];
    db.query(sql, param, (err, result, fields) => {
      if (err) {
        reject(err);
      } else {
        if (result.length != 1) {
          reject("no result");
        } else {
          // 如果有搜尋到符合的資訊
          // 就在 session 裡面寫入資料
          // 表示已經成功登入
          req.session.account = result[0].account;
          resolve(result);
        }
      }
    })
  });
}
router.post('/', async function (req, res, next) {
  try {
    // 依照使用者傳送過來的 account 和 password 搜尋使用者是否在資料庫中
    let results = await select_account(req.db, req);
    // 如果已經登入成功
    if (req.session.account) {
      if (!name.includes(req.session.account)) {
        name.push(req.session.account);
        curUser = req.session.account
        req.socket.io.on("connection", (socket) => {
          if(curUser == req.session.account) {
            socket.join(req.session.account);//加入名為 account 的 socket room 作為專門通知 client 的管道
            socket.account = req.session.account;
            req.socket.io.in(req.session.account).emit("account", "hello " + req.session.account + " welocome to the world");
          }
          //socket.nickname = req.session.account;
        });
      }
      res.json(results[0]);
    } else {
      req.session.destroy();
      res.json({ "result": "Login fail" });
    }
  } catch (error) {
    req.session.destroy();
    res.json({ "result": "Login fail" });
    console.log(error);
  }
});
module.exports = router;

