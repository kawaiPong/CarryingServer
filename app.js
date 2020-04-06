var createError = require("http-errors");
var express = require("express");
var path = require("path");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var userRouter = require("./routes/user");
var packRouter = require("./routes/checkListItem");
var listRouter = require("./routes/checkList");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/user", userRouter);
//회원 관련 기능
app.use("/pack", packRouter);
//하나의 체크리스트 세분화된 기능
app.use("/list", listRouter);
//체크리스트의 목록 기능

app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
