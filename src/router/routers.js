import express from "express";
import {
  publicOnlyMiddleware,
  localsMiddleware,
  protectorMiddleware,
} from "../../middleware";
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
  getDeleteDepartmentDetail,
  getDepartment,
  getDepartmentDetail,
  postDepartment,
  postDepartmentDetail,
} from "../controller/departmentController";
import {
  getMenu,
  getMenuDetail,
  getSubMenuDelete,
  postMenu,
  postMenuDetail,
  subMenuAuthAdd,
} from "../controller/menuController";
import { getAuth, getAuthDetail, postAuth } from "../controller/authController";
import { home } from "../controller/homeController";
import { getSchedule, postAddSchedule } from "../controller/scheduleController";

const router = express.Router();

router.route("/home").all(localsMiddleware).all(protectorMiddleware).get(home);
router.route("/").all(localsMiddleware).get(getLogin).post(postLogin);
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
  .post(postDepartment);

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

router.route("/menu").all(protectorMiddleware).get(getMenu).post(postMenu);

router
  .route("/menuDetail/:id([0-9a-f]{24})")
  .all(protectorMiddleware)
  .get(getMenuDetail)
  .post(postMenuDetail);

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
router.route("/AddSchedule").all(protectorMiddleware).post(postAddSchedule);
export default router;
