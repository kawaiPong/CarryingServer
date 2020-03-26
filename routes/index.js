var express = require("express");
var db_conn = require("../db/db");

const app = express();
const router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
