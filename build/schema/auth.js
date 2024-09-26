"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var authSchema = new _mongoose["default"].Schema({
  subUrl: {
    type: String,
    require: true
  },
  order: {
    type: Number,
    require: true
  },
  department: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Department"
  }
});
var Auth = _mongoose["default"].model("Auth", authSchema);
var _default = exports["default"] = Auth;