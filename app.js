var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sql = require('mysql');
var socket = require('./socket_api');
require('dotenv').config();
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
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
//friend
var check_friendRouter =  require('./routes/api/friend/check_friend');
var insert_friendRouter =  require('./routes/api/friend/insert_friend');
var select_friendRouter =  require('./routes/api/friend/select_friend');
var delete_friendRouter =  require('./routes/api/friend/delete_friend');
//track
var insert_trackRouter =  require('./routes/api/track/insert_track');
var select_trackRouter =  require('./routes/api/track/select_track');
//warning
var warning_Router =  require('./routes/api/warning/warning');
//AR
var AR_Router =  require('./routes/api/AR/AR');
//test
var TEST_Router =  require('./routes/api/test/test_session.js');

var app = express();

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { sameSite: true,
            // secure: true ,
            maxAge: 3600*1000,
            httpOnly: false},
  store: sessionStore
}))

var pool = sql.createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  host: process.env.DB_HOST,
  database: process.env.DB_DB,
  connectionLimit : 10
});
app.use(function(req,res,next){
  req.db=pool;
  next();
});
app.use(function(req,res,next){
  req.socket=socket;
  next();
});
pool.query('SELECT 1+1 AS solution',function(error,results,fields){
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
app.use('/api/activity/start_activity', start_activityRouter);//repairing
app.use('/api/activity/finish_activity', finish_activityRouter);//repairing
//friend
app.use('/api/friend/check_friend', check_friendRouter);
app.use('/api/friend/insert_friend', insert_friendRouter);
app.use('/api/friend/select_friend', select_friendRouter);
app.use('/api/friend/delete_friend', delete_friendRouter);
//track
app.use('/api/track/insert_friend', insert_trackRouter);
app.use('/api/track/select_friend', select_trackRouter);
//warning
app.use('/api/warning/warning', warning_Router);//repairing
//AR
app.use('/api/AR/AR', AR_Router);//building
//test
app.use('/api/test/test_session', TEST_Router);//building


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
