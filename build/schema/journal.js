"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var journalSchema = new _mongoose["default"].Schema({
  id: {
    type: String
  },
  title: {
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
  description: {
    type: String
  },
  file: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "File"
  },
  comments: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Comment"
  }],
  url: {
    type: String
  },
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
  createdAt: {
    type: Date,
    "default": Date.now
  }
});
journalSchema.pre("save", function () {
  if (!this.isModified("id")) {
    this.id = this._id;
  }
});
var Journal = _mongoose["default"].model("Journal", journalSchema);
var _default = exports["default"] = Journal;