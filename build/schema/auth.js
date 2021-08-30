"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var authSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    require: true
  },
  user: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User"
  }],
  department: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Department"
  }]
});

var Auth = _mongoose["default"].model("auth", authSchema);

var _default = Auth;
exports["default"] = _default;