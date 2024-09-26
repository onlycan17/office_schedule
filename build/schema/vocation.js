"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var vocationSchema = new _mongoose["default"].Schema({
  year: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  title: {
    type: String
  },
  content: {
    type: String
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
  comments: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Comment"
  }],
  color: {
    type: String
  },
  user: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    require: true,
    ref: "User"
  },
  department: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Department"
  },
  firstPaymentYn: {
    type: Boolean
  },
  finalPaymentYn: {
    type: Boolean
  },
  createdAt: {
    type: Date,
    "default": Date.now
  }
});
vocationSchema.index({
  year: -1,
  id: -1
});
vocationSchema.pre("save", function () {
  if (!this.isModified("id")) {
    this.id = this._id;
  }
});
var Vocation = _mongoose["default"].model("Vocation", vocationSchema);
var _default = exports["default"] = Vocation;