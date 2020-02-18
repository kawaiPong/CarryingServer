const mysql = require("mysql");
const config = require("./config/config");
const logger = require("./config/logger");

var pool = mysql.createPool(config);
logger.info("Connection pool created.");

pool.on("acquire", function(connection) {
  logger.info(`Connection ${connection.threadId} acquired`);
});

pool.on("enqueue", function() {
  logger.info("Waiting for available connection slot");
});

pool.on("release", function(connection) {
  logger.info(`Connection ${connection.threadId} released`);
});

const getConn = function(callback) {
  pool.getConnection(function(err, conn) {
    let createUser =
      "create table if not exists user (" +
      "num int primary key auto_increment, " +
      "nickname varchar(20) not null, " +
      "uid varchar(35) not null, " +
      "gender int not null);";

    conn.query(createUser, function(err, results, fields) {
      if (err) {
        throw err;
      }
      console.log("create table success");
    });
    callback(err, conn);
    conn.release(); // 연결세션 반환.
  });
};

module.exports = getConn;
