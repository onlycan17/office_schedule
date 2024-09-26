"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
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
  }
  // res.render('error', {
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
}));
//app.use(fileUpload());
app.use("/uploads", _express["default"]["static"]("uploads"));
app.use((0, _expressFlash["default"])());
app.use(logger);
app.use("/", _routers["default"]);
app.use("/api", _apiRouters["default"]);
//app.use("/admin", admin);
app.use("/static", _express["default"]["static"]("assets"));
app.use("/excel", _express["default"]["static"]("excel"));
var handleListening = function handleListening() {
  return console.log("Server listening on port http://localhost:".concat(PORT, " \u2764\uFE0F\u200D\uD83D\uDD25"));
};
app.listen(PORT, handleListening);