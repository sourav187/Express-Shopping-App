const mysql = require('mysql2');
const config = require('../util/config')

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: config.db.host,
  port: config.db.port,
  user: config.db.user,
  database: config.db.name,
  password: config.db.password,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
const promisePool = pool.promise();
module.exports= promisePool;
