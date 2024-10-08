"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _pusher = _interopRequireDefault(require("pusher"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var pusher = new _pusher["default"]({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: "ap3",
  useTLS: true
});
var _default = exports["default"] = pusher;