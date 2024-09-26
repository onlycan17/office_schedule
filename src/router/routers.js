import express from "express";
import {
    publicOnlyMiddleware,
    localsMiddleware,
    protectorMiddleware,
} from "../middleware";
import {
    joinList,
    getJoinAdd,
    getJoinForm,
    getJoinUpdate,
    getLogin,
    logout,
    postJoinAdd,
    postJoinUpdate,
    postLogin,
    getJoinUserUpdate,
    postJoinUserUpdate,
} from "../controller/userController";
import {
    deleteDepartment,
    getDeleteDepartmentDetail,
    getDepartment,
    getDepartmentAdd,
    getDepartmentDetail,
    postDepartmentAdd,
    postDepartmentDetail,
} from "../controller/departmentController";
import {
    getAddMenu,
    getDeleteMenu,
    getMenu,
    getMenuDetail,
    getSubMenuDelete,
    postAddMenu,
    postAddSubMenu,
    subMenuAuthAdd,
} from "../controller/menuController";
import {getAuth, getAuthDetail, postAuth} from "../controller/authController";
import {home} from "../controller/homeController";
import {
    customSchedule,
    customWeekSchedule,
    deleteSchedule,
    getSchedule,
    postAddSchedule,
} from "../controller/scheduleController";
import {
    addPostComment,
    customJournal,
    customWeekJournal,
    deleteComment,
    deleteJournal,
    downloadFile,
    editPatchComment,
    excelDownload,
    getJournal,
    getSearchJournalForm,
    postAddJournal,
    postSearchJournal,
} from "../controller/journalController";
import multipart from "connect-multiparty";
import {fileUpload, photoUpload} from "../middleware";
import {
    addNoticeBoard,
    addNoticeBoardForm,
    getNoticeBoardList,
    getNoticeBoardListForm,
    noticeBoardListDetail,
    noticeBoardListDetailDelete,
    noticeBoardListDetailUpdate,
    noticeBoardListFileDownload,
} from "../controller/noticeBoardController";
import {
    addReaderBoard,
    addReaderBoardForm,
    getReaderBoardList,
    getReaderBoardListForm,
    readerBoardListDetail,
    readerBoardListDetailDelete,
    readerBoardListDetailUpdate,
    readerBoardListFileDownload
} from "../controller/readerBoardController";
import {
    addPostMealComment,
    customMeal,
    customWeekMeal,
    deleteMeal,
    deleteMealComment,
    editPatchMealComment,
    getMeal,
    postAddMeal,
} from "../controller/mealController";
import {uploadPhotos} from "../controller/uploadImgController";
import {
    customBongoCar,
    customWeekBongoCar,
    deleteBongoCar,
    getBongoCar,
    postAddBongoCar
} from "../controller/bongoCarController";
import {
    customOfficeRoom,
    customWeekOfficeRoom,
    deleteOfficeRoom,
    getOfficeRoom,
    postAddOfficeRoom
} from "../controller/officeRoomController";
import {
    addPostVocationComment,
    customVocation,
    customWeekVocation,
    deleteVocation, deleteVocationComment, editPatchVocationComment,
    getVocation,
    postAddVocation
} from "../controller/vocationController";
import {
    deleteVocationType,
    getVocationType,
    getVocationTypeAdd,
    postVocationTypeAdd
} from "../controller/vocationTypeController";

const multipartMiddleware = multipart();

const router = express.Router();

router.route("/").all(localsMiddleware).get(getLogin).post(postLogin);
router.route("/home").all(localsMiddleware).all(protectorMiddleware).get(home);
router.route("/logout").all(localsMiddleware).get(logout);
router.route("/join").all(protectorMiddleware).get(getJoinForm);
router.route("/joinList").post(joinList);

router
    .route("/joinAdd")
    .all(protectorMiddleware)
    .get(getJoinAdd)
    .post(postJoinAdd);

router
    .route("/join/:id([0-9a-f]{24})")
    .all(protectorMiddleware)
    .get(getJoinUpdate)
    .post(postJoinUpdate);

router
    .route("/join/user/:id([0-9a-f]{24})")
    .get(getJoinUserUpdate)
    .post(postJoinUserUpdate);

router.route("/department").all(protectorMiddleware).get(getDepartment);
router
    .route("/departmentAdd")
    .all(protectorMiddleware)
    .get(getDepartmentAdd)
    .post(postDepartmentAdd);

router
    .route("/departmentDelete/:id([0-9a-f]{24})")
    .all(protectorMiddleware)
    .get(deleteDepartment);

router
    .route("/departmentDetail/:id([0-9a-f]{24})")
    .all(protectorMiddleware)
    .get(getDepartmentDetail)
    .post(postDepartmentDetail);

router
    .route(
        "/departmentDetailDelete/:departmentId([0-9a-f]{24})/:userId([0-9a-f]{24})"
    )
    .all(protectorMiddleware)
    .get(getDeleteDepartmentDetail);

router.route("/menu").all(protectorMiddleware).get(getMenu);

router
    .route("/menuAdd")
    .all(protectorMiddleware)
    .get(getAddMenu)
    .post(postAddMenu);

router.route("/menuDelete/:id([0-9a-f]{24})").get(getDeleteMenu);

router
    .route("/menuDetail/:id([0-9a-f]{24})")
    .all(protectorMiddleware)
    .get(getMenuDetail)
    .post(postAddSubMenu);

router
    .route("/menuDetailDelete/:menuId([0-9a-f]{24})/:subMenuId([0-9a-f]{24})")
    .all(protectorMiddleware)
    .get(getSubMenuDelete);

router
    .route("/menuDetailAuthAdd")
    .all(protectorMiddleware)
    .patch(subMenuAuthAdd);

router.route("/auth").all(protectorMiddleware).get(getAuth).post(postAuth);

router
    .route("/authDetail/:id([0-9a-f]{24})")
    .all(protectorMiddleware)
    .get(getAuthDetail);

router.route("/schedule").all(protectorMiddleware).get(getSchedule);
router.route("/addSchedule").post(postAddSchedule);
router.route("/deleteSchedule").delete(deleteSchedule);
router.route("/customSchedule").get(customSchedule);
router.route("/customWeekSchedule").get(customWeekSchedule);

router.route("/bongoCar").all(protectorMiddleware).get(getBongoCar);
router.route("/addBongoCar").post(postAddBongoCar);
router.route("/deleteBongoCar").delete(deleteBongoCar);
router.route("/customBongoCar").get(customBongoCar);
router.route("/customWeekBongoCar").get(customWeekBongoCar);

//
router.route("/officeRoom").all(protectorMiddleware).get(getOfficeRoom);
router.route("/addOfficeRoom").post(postAddOfficeRoom);
router.route("/deleteOfficeRoom").delete(deleteOfficeRoom);
router.route("/customOfficeRoom").get(customOfficeRoom);
router.route("/customWeekOfficeRoom").get(customWeekOfficeRoom);

//업무일지조회
router
    .route("/searchJournal")
    .all(protectorMiddleware)
    .get(getSearchJournalForm);
router.route("/postSearchJournal").post(postSearchJournal);
router.route("/excelDownload").post(excelDownload);

// 공지사항
router
    .route("/noticeBoardList")
    .all(protectorMiddleware)
    .get(getNoticeBoardListForm)
    .post(getNoticeBoardList);
router
    .route("/noticeBoardListAdd")
    .all(protectorMiddleware)
    .get(addNoticeBoardForm)
    .post(fileUpload.fields([{name: "singleFile"}]), addNoticeBoard);
router
    .route("/noticeBoardListDetail/:id([0-9a-f]{24})")
    .all(protectorMiddleware)
    .get(noticeBoardListDetail)
    .post(
        fileUpload.fields([{name: "singleFile"}]),
        noticeBoardListDetailUpdate
    )
    .delete(noticeBoardListDetailDelete);
router
    .route("/noticeBoardListFileDownload/:id([0-9a-f]{24})")
    .get(noticeBoardListFileDownload);

//팀장공지
router
    .route("/readerBoardList")
    .all(protectorMiddleware)
    .get(getReaderBoardListForm)
    .post(getReaderBoardList);
router
    .route("/readerBoardListAdd")
    .all(protectorMiddleware)
    .get(addReaderBoardForm)
    .post(fileUpload.fields([{name: "singleFile"}]), addReaderBoard);
router
    .route("/readerBoardListDetail/:id([0-9a-f]{24})")
    .all(protectorMiddleware)
    .get(readerBoardListDetail)
    .post(
        fileUpload.fields([{name: "singleFile"}]),
        readerBoardListDetailUpdate
    )
    .delete(readerBoardListDetailDelete);
router
    .route("/readerBoardListFileDownload/:id([0-9a-f]{24})")
    .get(readerBoardListFileDownload);

router.route("/journal").all(protectorMiddleware).get(getJournal);
router
    .route("/addJournal")
    .post(fileUpload.fields([{name: "singleFile"}]), postAddJournal);
router.route("/deleteJournal").delete(deleteJournal);
router.route("/customJournal").get(customJournal);
router.route("/customWeekJournal").get(customWeekJournal);
router.route("/download/:id([0-9a-f]{24})").get(downloadFile);
router.route("/addComment").post(addPostComment);
router.route("/editComment").patch(editPatchComment);
router.route("/deleteComment").delete(deleteComment);

//휴가
router.route("/vocation").all(protectorMiddleware).get(getVocation);
router.route("/addVocation").post(postAddVocation);
router.route("/deleteVocation").delete(deleteVocation);
router.route("/customVocation").get(customVocation);
router.route("/customWeekVocation").get(customWeekVocation);
//router.route("/download/:id([0-9a-f]{24})").get(downloadFile);
router.route("/addVocationComment").post(addPostVocationComment);
router.route("/ediVocationtComment").patch(editPatchVocationComment);
router.route("/deleteVocationComment").delete(deleteVocationComment);


//에디터 이미지 업로드
router.route("/fileUploadMeal").post(photoUpload.any(), uploadPhotos);


//식단스케줄
router.route("/meal").all(protectorMiddleware).get(getMeal);
router.route("/addMeal").post(postAddMeal);
router.route("/deleteMeal").delete(deleteMeal);
router.route("/customMeal").get(customMeal);
router.route("/customWeekMeal").get(customWeekMeal);
router.route("/downloadMeal/:id([0-9a-f]{24})").get(downloadFile);
router.route("/addMealComment").post(addPostMealComment);
router.route("/editMealComment").patch(editPatchMealComment);
router.route("/deleteMealComment").delete(deleteMealComment);


//휴가종류 등록
router.route("/vocationType").all(protectorMiddleware).get(getVocationType);
router
    .route("/vocationTypeAdd")
    .all(protectorMiddleware)
    .get(getVocationTypeAdd)
    .post(postVocationTypeAdd);

router
    .route("/vocationTypeDelete/:id([0-9a-f]{24})")
    .all(protectorMiddleware)
    .get(deleteVocationType);

// router
//     .route("/departmentDetail/:id([0-9a-f]{24})")
//     .all(protectorMiddleware)
//     .get(getDepartmentDetail)
//     .post(postDepartmentDetail);
export default router;
