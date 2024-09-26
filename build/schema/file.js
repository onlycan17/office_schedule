"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var fileSchema = new _mongoose["default"].Schema({
  originalname: {
    type: String,
    require: true
  },
  mimetype: {
    type: String
  },
  filename: {
    type: String,
    require: true
  },
  path: {
    type: String,
    require: true
  },
  size: {
    type: Number
  },
  dropboxUrl: {
    type: String
  },
  createdAt: {
    type: Date,
    "default": Date.now()
  }
});
var File = _mongoose["default"].model("File", fileSchema);
var _default = exports["default"] = File;