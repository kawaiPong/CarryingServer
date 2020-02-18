var express = require("express");
var db_conn = require("../db");

const app = express();
const router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("post", { title: "Express", postUrl: "addUser" });
});

module.exports = router;
