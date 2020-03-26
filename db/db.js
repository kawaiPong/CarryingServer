const mysql = require("mysql");
const config = require("./config");
const logger = require("./logger");

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
    callback(err, conn);
    conn.release(); // 연결세션 반환.
  });
};

module.exports = getConn;
