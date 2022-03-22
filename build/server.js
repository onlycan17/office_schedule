"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("dotenv/config");

var _express = _interopRequireWildcard(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

require("./db");

var _connectMongo = _interopRequireDefault(require("connect-mongo"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _routers = _interopRequireDefault(require("./router/routers"));

var _admin = _interopRequireDefault(require("./router/admin"));

var _expressFlash = _interopRequireDefault(require("express-flash"));

require("./pusher");

var _betterOpn = _interopRequireDefault(require("better-opn"));

var _apiRouters = _interopRequireDefault(require("./router/apiRouters"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var ipfilter = require("express-ipfilter").IpFilter;

console.log(ipfilter);
var PORT = process.env.PORT || 4500;
var app = (0, _express["default"])();
var logger = (0, _morgan["default"])("dev");
var ips = ["127.126.0.1"];
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
  } // res.render('error', {
  //   message: 'You shall not pass',
  //   error: err
  // });

});
app.use(_express["default"].urlencoded({
  "extends": true
}));
app.use(_express["default"].json());
app.use((0, _expressSession["default"])({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  store: _connectMongo["default"].create({
    mongoUrl: process.env.DB_URL
  })
})); //app.use(fileUpload());

app.use("/uploads", _express["default"]["static"]("uploads"));
app.use((0, _expressFlash["default"])());
app.use(logger);
app.use("/", _routers["default"]);
app.use("/api", _apiRouters["default"]); //app.use("/admin", admin);

app.use("/static", _express["default"]["static"]("assets"));
app.use("/excel", _express["default"]["static"]("excel"));

var handleListening = function handleListening() {
  return console.log("Server listening on port http://localhost:".concat(PORT, " \u2764\uFE0F\u200D\uD83D\uDD25"));
};

app.listen(PORT, handleListening);