import "dotenv/config";
import express, { request, response } from "express";
const ipfilter = require("express-ipfilter").IpFilter;
import morgan from "morgan";
import "./db";
import Mongostore from "connect-mongo";
import session from "express-session";
import router from "./router/routers";
import admin from "./router/admin";
import flash from "express-flash";
import "./pusher";
import opn from "better-opn";
import apiRouter from "./router/apiRouters";

console.log(ipfilter);
const PORT = process.env.PORT || 4500;
const app = express();
const logger = morgan("dev");
const ips = ["127.126.0.1"];

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views/");
app.use(ipfilter(ips));

app.use(function (err, req, res, _next) {
  //console.log('Error handler', err);
  res.send("접속이 차단되었습니다. 관리자에게 문의하세요."); // page view 'Access Denied'
  if (err instanceof IpDeniedError) {
    res.status(401).end();
  } else {
    res.status(err.status || 500).end();
  }
  // res.render('error', {
  //   message: 'You shall not pass',
  //   error: err
  // });
});
app.use(express.urlencoded({ extends: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: Mongostore.create({
      mongoUrl: process.env.DB_URL,
    }),
  })
);
//app.use(fileUpload());
app.use("/uploads", express.static("uploads"));
app.use(flash());
app.use(logger);
app.use("/", router);
app.use("/api", apiRouter);
//app.use("/admin", admin);
app.use("/static", express.static("assets"));
app.use("/excel", express.static("excel"));
const handleListening = () =>
  console.log(`Server listening on port http://localhost:${PORT} ❤️‍🔥`);
app.listen(PORT, handleListening);