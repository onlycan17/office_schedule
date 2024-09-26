"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var vocationTypeSchema = new _mongoose["default"].Schema({
  id: {
    type: String
  },
  code: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  consomeYn: {
    type: Boolean
  },
  description: {
    type: String
  },
  consomeYalue: {
    type: Number
  }
});
vocationTypeSchema.pre("save", function () {
  if (!this.isModified("id")) {
    this.id = this._id;
  }
});
var VocationType = _mongoose["default"].model("VocationType", vocationTypeSchema);
var _default = exports["default"] = VocationType;