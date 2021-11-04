"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _middleware = require("../middleware");

var _userController = require("../controller/userController");

var _departmentController = require("../controller/departmentController");

var _menuController = require("../controller/menuController");

var _authController = require("../controller/authController");

var _homeController = require("../controller/homeController");

var _scheduleController = require("../controller/scheduleController");

var _journalController = require("../controller/journalController");

var _connectMultiparty = _interopRequireDefault(require("connect-multiparty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var multipartMiddleware = (0, _connectMultiparty["default"])();

var router = _express["default"].Router();

router.route("/").all(_middleware.localsMiddleware).get(_userController.getLogin).post(_userController.postLogin);
router.route("/home").all(_middleware.localsMiddleware).all(_middleware.protectorMiddleware).get(_homeController.home);
router.route("/logout").all(_middleware.localsMiddleware).get(_userController.logout);
router.route("/join").all(_middleware.protectorMiddleware).get(_userController.getJoin);
router.route("/joinAdd").all(_middleware.protectorMiddleware).get(_userController.getJoinAdd).post(_userController.postJoinAdd);
router.route("/join/:id([0-9a-f]{24})").all(_middleware.protectorMiddleware).get(_userController.getJoinUpdate).post(_userController.postJoinUpdate);
router.route("/department").all(_middleware.protectorMiddleware).get(_departmentController.getDepartment);
router.route("/departmentAdd").all(_middleware.protectorMiddleware).get(_departmentController.getDepartmentAdd).post(_departmentController.postDepartmentAdd);
router.route("/departmentDelete/:id([0-9a-f]{24})").all(_middleware.protectorMiddleware).get(_departmentController.deleteDepartment);
router.route("/departmentDetail/:id([0-9a-f]{24})").all(_middleware.protectorMiddleware).get(_departmentController.getDepartmentDetail).post(_departmentController.postDepartmentDetail);
router.route("/departmentDetailDelete/:departmentId([0-9a-f]{24})/:userId([0-9a-f]{24})").all(_middleware.protectorMiddleware).get(_departmentController.getDeleteDepartmentDetail);
router.route("/menu").all(_middleware.protectorMiddleware).get(_menuController.getMenu);
router.route("/menuAdd").all(_middleware.protectorMiddleware).get(_menuController.getAddMenu).post(_menuController.postAddMenu);
router.route("/menuDelete/:id([0-9a-f]{24})").get(_menuController.getDeleteMenu);
router.route("/menuDetail/:id([0-9a-f]{24})").all(_middleware.protectorMiddleware).get(_menuController.getMenuDetail).post(_menuController.postAddSubMenu);
router.route("/menuDetailDelete/:menuId([0-9a-f]{24})/:subMenuId([0-9a-f]{24})").all(_middleware.protectorMiddleware).get(_menuController.getSubMenuDelete);
router.route("/menuDetailAuthAdd").all(_middleware.protectorMiddleware).patch(_menuController.subMenuAuthAdd);
router.route("/auth").all(_middleware.protectorMiddleware).get(_authController.getAuth).post(_authController.postAuth);
router.route("/authDetail/:id([0-9a-f]{24})").all(_middleware.protectorMiddleware).get(_authController.getAuthDetail);
router.route("/schedule").all(_middleware.protectorMiddleware).get(_scheduleController.getSchedule);
router.route("/addSchedule").post(_scheduleController.postAddSchedule);
router.route("/deleteSchedule")["delete"](_scheduleController.deleteSchedule);
router.route("/customSchedule").get(_scheduleController.customSchedule);
router.route("/customWeekSchedule").get(_scheduleController.customWeekSchedule);
router.route("/journal").all(_middleware.protectorMiddleware).get(_journalController.getJournal);
router.route("/addJournal").post(_middleware.fileUpload.fields([{
  name: "singleFile"
}]), _journalController.postAddJournal);
router.route("/deleteJournal")["delete"](_journalController.deleteJournal);
router.route("/customJournal").get(_journalController.customJournal);
router.route("/customWeekJournal").get(_journalController.customWeekJournal);
router.route("/download/:id([0-9a-f]{24})").get(_journalController.downloadFile);
router.route("/addComment").post(_journalController.addPostComment);
router.route("/editComment").patch(_journalController.editPatchComment);
router.route("/deleteComment").get(_journalController.deleteComment);
var _default = router;
exports["default"] = _default;