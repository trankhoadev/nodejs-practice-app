require("dotenv").config();
/* Express declare variable here */
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

/* setup connect database */
const connectDB = require("./config/db.config");

/* setup all router here */
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/authRouter");

/* middlewares */
const { isAuth } = require("./middlewares/authMiddleware");

/* Custom declare variable and import */
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.get("/test", isAuth, (req, res) => {
  console.log(req.user);
  const { data } = req.user;
  res.send(`Welcome to my app: ${data.username}`);
});

app.use((req, res, next) => {
  const error = new Error("Uri not found!");
  error.status = 400;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    href: req.originalUrl,
    message: err.message,
    status: err.status || 500,
    method: req.method,
  });
});

connectDB();

module.exports = app;
