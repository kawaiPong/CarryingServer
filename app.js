var createError = require("http-errors");
var express = require("express");
var path = require("path");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var userRouter = require("./routes/user");
var packRouter = require("./routes/packlist");

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
app.use("/pack", packRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
