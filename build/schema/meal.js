"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var mealSchema = new _mongoose["default"].Schema({
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
  createdAt: {
    type: Date,
    "default": Date.now
  }
});
mealSchema.pre("save", function () {
  if (!this.isModified("id")) {
    this.id = this._id;
  }
});
var Meal = _mongoose["default"].model("Meal", mealSchema);
var _default = exports["default"] = Meal;