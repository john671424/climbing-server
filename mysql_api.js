const sql = require('mysql');
require('dotenv').config();
var pool = sql.createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  host: process.env.DB_HOST,
  database: process.env.DB_DB,
  connectionLimit : 10
});
const mysql_api = { 
  pool: pool
};
module.exports = mysql_api;