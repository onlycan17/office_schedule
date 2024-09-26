"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var menuSchema = new _mongoose["default"].Schema({
  menuName: {
    type: String,
    require: true
  },
  subMenu: [{
    subMenuName: {
      type: String,
      require: true
    },
    subMenuUrl: {
      type: String
    },
    order: {
      type: Number,
      require: true
    },
    department: [{
      type: _mongoose["default"].Schema.Types.ObjectId,
      ref: "Department"
    }],
    user: [{
      type: _mongoose["default"].Schema.Types.ObjectId,
      ref: "User"
    }]
  }],
  menuUrl: {
    type: String
  },
  order: {
    type: Number,
    require: true
  },
  department: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Department"
  }],
  user: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    require: false,
    ref: "User"
  }]
});
var Menu = _mongoose["default"].model("Menu", menuSchema);
var _default = exports["default"] = Menu;