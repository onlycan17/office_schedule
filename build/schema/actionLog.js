"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _moment = _interopRequireDefault(require("moment"));

require("moment-timezone");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_moment["default"].tz.setDefault("Asia/Seoul");

var actionLogSchema = new _mongoose["default"].Schema({
  url: {
    type: String
  },
  params: {
    type: String
  },
  body: {
    type: String
  },
  ip: {
    type: String
  },
  bigo: {
    type: String
  },
  header: {
    type: String
  },
  createdAt: {
    type: String,
    "default": (0, _moment["default"])().format('YYYY-MM-DD HH:mm:ss')
  }
});

var ActionLog = _mongoose["default"].model("actionLog", actionLogSchema);

var _default = ActionLog;
exports["default"] = _default;