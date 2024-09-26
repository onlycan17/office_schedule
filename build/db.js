"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
//console.log("test : "+process.env.DB_URL);

var connection = _mongoose["default"].connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
var db = _mongoose["default"].connection;
var handleOpen = function handleOpen() {
  return console.log("✅ Connected to DB");
};
var handleError = function handleError(error) {
  return console.log("❌ DB Error", error);
};
db.on("error", handleError);
db.once("open", handleOpen);