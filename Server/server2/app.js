var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const exampleRouter = require("./routes/example");

const fs = require("fs");
const { promisify } = require("util");
const fileInfo = promisify(fs.stat);

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/download/:user", (req, res) => {
  const writeStream = fs.createWriteStream(`${__dirname}/public/text2.txt`);
  writeStream.write(
    `
  Estimable ${req.params.user} este es el archivo solicitado
  `,
    () => {
      // res.sendFile(`${__dirname}/public/text2.txt`);
      res.download(`${__dirname}/public/text2.txt`, (error) => {
        if (error) {
          console.log("ERROR", error);
          res.status(404).render("error");
        } else {
          console.log("DESCARGA OK");
        }
      });
    }
  );
});

// Static
app.use("/video-static", (req, res, next) => {
  const path = __dirname + "/public/video/video.mp4";
  res.type("video/mp4");
  res.sendFile(path);
});

app.use("/video-stream", async (req, res, next) => {
  const path = "./public/video/video.mp4";
  const { size } = await fileInfo(path);
  const range = req.headers.range;
  console.log("Range", range);

  if (range) {
    let [start, end] = range.replace(/bytes=/, "").split("-");
    
    start = parseInt(start, 10);

    if (end) {
      end = parseInt(end, 10);
    } else {
      end = size - 1;
    }


    res.writeHead(206, {
      "Content-Type": "video/mp4",
      "Content-Lenghth": end - start + 1,
      "Accept-Ranges": "bytes",
      "Content-Range": `bytes ${start}-${end}/${size}`,
    });

    fs.createReadStream(path, { start, end }).pipe(res);

  } else {
    res.writeHead(200, {
      "Content-Type": "video/mp4",
      "Content-Lenghth": size,
    });

    fs.createReadStream(path).pipe(res);
  }
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/example", exampleRouter);

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
