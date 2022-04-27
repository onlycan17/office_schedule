"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var departmentSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    require: true
  },
  user: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User"
  }],
  menu: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Menu"
  }],
  order: {
    type: Number,
    require: true
  }
});

var Department = _mongoose["default"].model("Department", departmentSchema);

var _default = Department;
exports["default"] = _default;