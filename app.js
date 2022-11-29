var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//var sql = require('mysql');
var socket = require('./socket_api');
require('dotenv').config();
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
const fileUpload = require("express-fileupload");
var sql = require('./mysql_api');



const options ={
  connectionLimit: 10,
  password: process.env.DB_PWD,
  user: process.env.DB_USER,
  database: process.env.DB_DB,
  host: process.env.DB_HOST,
  createDatabaseTable: true
}
var  sessionStore = new MySQLStore(options);

// var sessionStore = new MySQLStore(
//   connectionConfig
//   )

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var signup_memberRouter =  require('./routes/api/signup_member');
var login_memberRouter =  require('./routes/api/login_member');
//activity
var insert_activityRouter =  require('./routes/api/activity/insert_activity');
var start_activityRouter =  require('./routes/api/activity/start_activity');
var finish_activityRouter =  require('./routes/api/activity/finish_activity');
var delete_activityRouter =  require('./routes/api/activity/delete_activity');
var update_activityRouter =  require('./routes/api/activity/update_activity');
var select_all_activityRouter =  require('./routes/api/activity/select_all_activity');
var select_specific_activityRouter =  require('./routes/api/activity/select_specific_activity');
var select_account_activityRouter =  require('./routes/api/activity/select_account_activity');
//friend
var check_friendRouter =  require('./routes/api/friend/check_friend');
var insert_friendRouter =  require('./routes/api/friend/insert_friend');
var select_friendRouter =  require('./routes/api/friend/select_friend');
var delete_friendRouter =  require('./routes/api/friend/delete_friend');
var invite_friendRouter =  require('./routes/api/friend/invite_friend');
//track
var insert_trackRouter =  require('./routes/api/track/insert_track');
var select_trackRouter =  require('./routes/api/track/select_track');
var update_trackRouter =  require('./routes/api/track/update_track');
var delete_trackRouter =  require('./routes/api/track/delete_track');
var select_all_trackRouter =  require('./routes/api/track/select_all_track');
var select_specific_trackRouter =  require('./routes/api/track/select_specific_track');
var download_trackRouter =  require('./routes/api/track/download_track');
var upload_trackRouter =  require('./routes/api/track/upload_track');
//member
var update_activity_memberRouter =  require('./routes/api/member/update_activity_member');
var update_distance_time_memberRouter =  require('./routes/api/member/update_distance_time_member');
var update_track_memberRouter =  require('./routes/api/member/update_track_member');
var update_memberRouter =  require('./routes/api/member/update_member');
var select_uid_memberRouter =  require('./routes/api/member/select_uid_member');
var select_memberRouter =  require('./routes/api/member/select_member');
//test
var TEST_Router =  require('./routes/api/test/test_login');
var TEST_download_Router =  require('./routes/api/test/test_download');
var TEST_upload_Router =  require('./routes/api/test/test_upload');
var TEST_start_activity_Router =  require('./routes/api/test/test_start_activity');
const { log } = require('console');

var app = express();

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { sameSite: true,
            // secure: true ,
            expires: new Date(253402300000000),
            httpOnly: false},
  store: sessionStore
}))
const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
socket.io.use(wrap(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,//true
  cookie: { sameSite: true,
            // secure: true ,
            expires: new Date(253402300000000),
            httpOnly: false},
  store: sessionStore
})));
socket.io.use((socket, next) => {
  const session = socket.request.session;
  console.log(session);
  console.log(session.authenticated);
  if (session ) {
    console.log("hi");
    next();
  } else {
    console.log("no");
    next(new Error("unauthorized"));
  }
});
app.use(function(req,res,next){
  socket.io.use((socket, next) => {
    
    socket.sessionID = req.session.account;
    //socket.userID = session.userID;
    socket.account = req.session.account;
    //console.log("session"+req.session.account);
    //socket.join(req.session.account);
    next();
  });
  next();
});

// var pool = sql.createPool({
//   user: process.env.DB_USER,
//   password: process.env.DB_PWD,
//   host: process.env.DB_HOST,
//   database: process.env.DB_DB,
//   connectionLimit : 10
// });
app.use(function(req,res,next){
  req.db=sql.pool;
  next();
});
app.use(function(req,res,next){
  req.socket=socket;
  next();
});

app.use(
  fileUpload({
    defParamCharset: "utf8"
  })
);

sql.pool.query('SELECT 1+1 AS solution',function(error,results,fields){
  if(error) throw error;
  console.log('ok');
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/signup_member', signup_memberRouter);
app.use('/api/login_member', login_memberRouter);
//activity
app.use('/api/activity/insert_activity', insert_activityRouter);
app.use('/api/activity/start_activity', start_activityRouter);
app.use('/api/activity/finish_activity', finish_activityRouter);
app.use('/api/activity/delete_activity', delete_activityRouter);
app.use('/api/activity/update_activity', update_activityRouter);
app.use('/api/activity/select_all_activity', select_all_activityRouter);
app.use('/api/activity/select_specific_activity', select_specific_activityRouter);
app.use('/api/activity/select_account_activity', select_account_activityRouter);
//friend
app.use('/api/friend/check_friend', check_friendRouter);
app.use('/api/friend/insert_friend', insert_friendRouter);
app.use('/api/friend/select_friend', select_friendRouter);
app.use('/api/friend/delete_friend', delete_friendRouter);
app.use('/api/friend/invite_friend', invite_friendRouter);
//track
app.use('/api/track/insert_track', insert_trackRouter);
app.use('/api/track/select_track', select_trackRouter);
app.use('/api/track/update_track', update_trackRouter);
app.use('/api/track/delete_track', delete_trackRouter);
app.use('/api/track/select_all_track', select_all_trackRouter);
app.use('/api/track/select_specific_track', select_specific_trackRouter);
app.use('/api/track/download_track', download_trackRouter);
app.use('/api/track/upload_track', upload_trackRouter);
//member
app.use('/api/member/update_activity_member',update_activity_memberRouter);
app.use('/api/member/update_distance_time_member',update_distance_time_memberRouter);
app.use('/api/member/update_track_member',update_track_memberRouter);
app.use('/api/member/update_member',update_memberRouter);
app.use('/api/member/select_uid_member',select_uid_memberRouter);
app.use('/api/member/select_member',select_memberRouter);
//test
app.use('/api/test/test_login', TEST_Router);//building
app.use('/api/test/test_download', TEST_download_Router);//building
app.use('/api/test/test_upload', TEST_upload_Router);//building
app.use('/api/test/test_start_activity', TEST_start_activity_Router);//building


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
