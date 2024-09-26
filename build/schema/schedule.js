"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var scheduleSchema = new _mongoose["default"].Schema({
  id: {
    type: String
  },
  title: {
    type: String,
    require: true
  },
  start: {
    type: String
  },
  end: {
    type: String
  },
  allDay: {
    type: Boolean
  },
  description: {
    type: String
  },
  url: {
    type: String
  },
  color: {
    type: String
  },
  user: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User"
  },
  department: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Department"
  }
});
scheduleSchema.pre("save", function () {
  if (!this.isModified("id")) {
    this.id = this._id;
  }
});
var Schedule = _mongoose["default"].model("Schedule", scheduleSchema);
var _default = exports["default"] = Schedule;