import express from "express";
import {
  publicOnlyMiddleware,
  localsMiddleware,
  protectorMiddleware,
} from "../middleware";
import {
  getJoin,
  getJoinAdd,
  getJoinUpdate,
  getLogin,
  logout,
  postJoinAdd,
  postJoinUpdate,
  postLogin,
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
    getAddSubMenu,
    getDeleteMenu,
  getMenu,
  getMenuDetail,
  getSubMenuDelete,
  postAddMenu,
  postAddSubMenu,
  postMenuDetail,
  subMenuAuthAdd,
} from "../controller/menuController";
import { getAuth, getAuthDetail, postAuth } from "../controller/authController";
import { home } from "../controller/homeController";
import { customSchedule, deleteSchedule, getSchedule, postAddSchedule, prevSchedule, updateSchedule } from "../controller/scheduleController";

const router = express.Router();

router.route("/").all(localsMiddleware).get(getLogin).post(postLogin);
router.route("/home").all(localsMiddleware).all(protectorMiddleware).get(home);
router.route("/logout").all(localsMiddleware).get(logout);
router.route("/join").all(protectorMiddleware).get(getJoin);
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
  .route("/department")
  .all(protectorMiddleware)
  .get(getDepartment)

router.route("/departmentAdd").all(protectorMiddleware).get(getDepartmentAdd).post(postDepartmentAdd);  

router.route("/departmentDelete/:id([0-9a-f]{24})").all(protectorMiddleware).get(deleteDepartment);

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

router.route("/menu").all(protectorMiddleware).get(getMenu)

router.route("/menuAdd").all(protectorMiddleware).get(getAddMenu).post(postAddMenu);

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
export default router;
