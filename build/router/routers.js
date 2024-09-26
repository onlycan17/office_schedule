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
var _noticeBoardController = require("../controller/noticeBoardController");
var _readerBoardController = require("../controller/readerBoardController");
var _mealController = require("../controller/mealController");
var _uploadImgController = require("../controller/uploadImgController");
var _bongoCarController = require("../controller/bongoCarController");
var _officeRoomController = require("../controller/officeRoomController");
var _vocationController = require("../controller/vocationController");
var _vocationTypeController = require("../controller/vocationTypeController");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var multipartMiddleware = (0, _connectMultiparty["default"])();
var router = _express["default"].Router();
router.route("/").all(_middleware.localsMiddleware).get(_userController.getLogin).post(_userController.postLogin);
router.route("/home").all(_middleware.localsMiddleware).all(_middleware.protectorMiddleware).get(_homeController.home);
router.route("/logout").all(_middleware.localsMiddleware).get(_userController.logout);
router.route("/join").all(_middleware.protectorMiddleware).get(_userController.getJoinForm);
router.route("/joinList").post(_userController.joinList);
router.route("/joinAdd").all(_middleware.protectorMiddleware).get(_userController.getJoinAdd).post(_userController.postJoinAdd);
router.route("/join/:id([0-9a-f]{24})").all(_middleware.protectorMiddleware).get(_userController.getJoinUpdate).post(_userController.postJoinUpdate);
router.route("/join/user/:id([0-9a-f]{24})").get(_userController.getJoinUserUpdate).post(_userController.postJoinUserUpdate);
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
router.route("/bongoCar").all(_middleware.protectorMiddleware).get(_bongoCarController.getBongoCar);
router.route("/addBongoCar").post(_bongoCarController.postAddBongoCar);
router.route("/deleteBongoCar")["delete"](_bongoCarController.deleteBongoCar);
router.route("/customBongoCar").get(_bongoCarController.customBongoCar);
router.route("/customWeekBongoCar").get(_bongoCarController.customWeekBongoCar);

//
router.route("/officeRoom").all(_middleware.protectorMiddleware).get(_officeRoomController.getOfficeRoom);
router.route("/addOfficeRoom").post(_officeRoomController.postAddOfficeRoom);
router.route("/deleteOfficeRoom")["delete"](_officeRoomController.deleteOfficeRoom);
router.route("/customOfficeRoom").get(_officeRoomController.customOfficeRoom);
router.route("/customWeekOfficeRoom").get(_officeRoomController.customWeekOfficeRoom);

//업무일지조회
router.route("/searchJournal").all(_middleware.protectorMiddleware).get(_journalController.getSearchJournalForm);
router.route("/postSearchJournal").post(_journalController.postSearchJournal);
router.route("/excelDownload").post(_journalController.excelDownload);

// 공지사항
router.route("/noticeBoardList").all(_middleware.protectorMiddleware).get(_noticeBoardController.getNoticeBoardListForm).post(_noticeBoardController.getNoticeBoardList);
router.route("/noticeBoardListAdd").all(_middleware.protectorMiddleware).get(_noticeBoardController.addNoticeBoardForm).post(_middleware.fileUpload.fields([{
  name: "singleFile"
}]), _noticeBoardController.addNoticeBoard);
router.route("/noticeBoardListDetail/:id([0-9a-f]{24})").all(_middleware.protectorMiddleware).get(_noticeBoardController.noticeBoardListDetail).post(_middleware.fileUpload.fields([{
  name: "singleFile"
}]), _noticeBoardController.noticeBoardListDetailUpdate)["delete"](_noticeBoardController.noticeBoardListDetailDelete);
router.route("/noticeBoardListFileDownload/:id([0-9a-f]{24})").get(_noticeBoardController.noticeBoardListFileDownload);

//팀장공지
router.route("/readerBoardList").all(_middleware.protectorMiddleware).get(_readerBoardController.getReaderBoardListForm).post(_readerBoardController.getReaderBoardList);
router.route("/readerBoardListAdd").all(_middleware.protectorMiddleware).get(_readerBoardController.addReaderBoardForm).post(_middleware.fileUpload.fields([{
  name: "singleFile"
}]), _readerBoardController.addReaderBoard);
router.route("/readerBoardListDetail/:id([0-9a-f]{24})").all(_middleware.protectorMiddleware).get(_readerBoardController.readerBoardListDetail).post(_middleware.fileUpload.fields([{
  name: "singleFile"
}]), _readerBoardController.readerBoardListDetailUpdate)["delete"](_readerBoardController.readerBoardListDetailDelete);
router.route("/readerBoardListFileDownload/:id([0-9a-f]{24})").get(_readerBoardController.readerBoardListFileDownload);
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
router.route("/deleteComment")["delete"](_journalController.deleteComment);

//휴가
router.route("/vocation").all(_middleware.protectorMiddleware).get(_vocationController.getVocation);
router.route("/addVocation").post(_vocationController.postAddVocation);
router.route("/deleteVocation")["delete"](_vocationController.deleteVocation);
router.route("/customVocation").get(_vocationController.customVocation);
router.route("/customWeekVocation").get(_vocationController.customWeekVocation);
//router.route("/download/:id([0-9a-f]{24})").get(downloadFile);
router.route("/addVocationComment").post(_vocationController.addPostVocationComment);
router.route("/ediVocationtComment").patch(_vocationController.editPatchVocationComment);
router.route("/deleteVocationComment")["delete"](_vocationController.deleteVocationComment);

//에디터 이미지 업로드
router.route("/fileUploadMeal").post(_middleware.photoUpload.any(), _uploadImgController.uploadPhotos);

//식단스케줄
router.route("/meal").all(_middleware.protectorMiddleware).get(_mealController.getMeal);
router.route("/addMeal").post(_mealController.postAddMeal);
router.route("/deleteMeal")["delete"](_mealController.deleteMeal);
router.route("/customMeal").get(_mealController.customMeal);
router.route("/customWeekMeal").get(_mealController.customWeekMeal);
router.route("/downloadMeal/:id([0-9a-f]{24})").get(_journalController.downloadFile);
router.route("/addMealComment").post(_mealController.addPostMealComment);
router.route("/editMealComment").patch(_mealController.editPatchMealComment);
router.route("/deleteMealComment")["delete"](_mealController.deleteMealComment);

//휴가종류 등록
router.route("/vocationType").all(_middleware.protectorMiddleware).get(_vocationTypeController.getVocationType);
router.route("/vocationTypeAdd").all(_middleware.protectorMiddleware).get(_vocationTypeController.getVocationTypeAdd).post(_vocationTypeController.postVocationTypeAdd);
router.route("/vocationTypeDelete/:id([0-9a-f]{24})").all(_middleware.protectorMiddleware).get(_vocationTypeController.deleteVocationType);

// router
//     .route("/departmentDetail/:id([0-9a-f]{24})")
//     .all(protectorMiddleware)
//     .get(getDepartmentDetail)
//     .post(postDepartmentDetail);
var _default = exports["default"] = router;