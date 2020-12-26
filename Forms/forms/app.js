var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const helmet = require("helmet");
const moment = require("moment");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

const upload = require("./middleware/uploadMiddleware");
const ImageProcessor = require("./imgProcess/ImageProcessor");

var app = express();

// Helmet configuration.
app.use(helmet());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.get("/dates", (req, res) => {
  const date = moment();
  const formattedDate = date.format("DD ** MM ** YYYY");

  const date2 = moment("1997-04-10");

  res.send(`Fecha ${formattedDate} vs ${date2} = ${date.diff(date2, 'days')}`);
});
app.post("/confirm", upload.single("photo"), (req, res, next) => {
  const datos = req.body;
  const files = req.file;

  const imgProcessor = new ImageProcessor();

  imgProcessor
    .resize(files, 128, 128)
    .then(() => res.render("confirm", { datos, files }));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
