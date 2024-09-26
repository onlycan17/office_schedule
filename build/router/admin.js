"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _departmentController = require("../controller/departmentController");
var _menuController = require("../controller/menuController");
var _userController = require("../controller/userController");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var admin = _express["default"].Router();
admin.route("/joinAdd").get(_userController.getJoinAdd).post(_userController.postJoinAdd);
admin.route("/department").get(_departmentController.getDepartment);
admin.route("/departmentAdd").get(_departmentController.getDepartmentAdd).post(_departmentController.postDepartmentAdd);
admin.route("/menu").get(_menuController.getMenu);
admin.route("/menuAdd").get(_menuController.getAddMenu).post(_menuController.postAddMenu);
admin.route("/menuDelete/:id([0-9a-f]{24})").get(_menuController.getDeleteMenu);
admin.route("/menuDetail/:id([0-9a-f]{24})").get(_menuController.getMenuDetail).post(_menuController.postAddSubMenu);
var _default = exports["default"] = admin;