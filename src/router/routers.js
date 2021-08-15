import express from "express";
import { publicOnlyMiddleware,localsMiddleware, protectorMiddleware } from "../../middleware";
import { getJoin, getLogin, logout, postJoin,postLogin } from "../controller/userController";
import { getDeleteDepartmentDetail, getDepartment, getDepartmentDetail, postDepartment, postDepartmentDetail } from "../controller/departmentController";
import { getMenu,getMenuDetail,getSubMenuDelete,postMenu, postMenuDetail, subMenuAuthAdd } from "../controller/menuController";
import { getAuth, getAuthDetail, postAuth } from "../controller/authController";
import { home } from "../controller/homeController";

const router = express.Router();

router.route("/home").all(localsMiddleware).get(home);
router.route("/").all(localsMiddleware).get(getLogin).post(postLogin);
router.route("/logout").all(localsMiddleware).get(logout);
router.route("/join").all(localsMiddleware).get(getJoin).post(postJoin);

router.route("/department").all(localsMiddleware).get(getDepartment).post(postDepartment);
router.route("/departmentDetail/:id([0-9a-f]{24})").all(localsMiddleware).get(getDepartmentDetail).post(postDepartmentDetail);
router.route("/departmentDetailDelete/:departmentId([0-9a-f]{24})/:userId([0-9a-f]{24})").all(localsMiddleware).get(getDeleteDepartmentDetail);

router.route("/menu").all(localsMiddleware).get(getMenu).post(postMenu);
router.route("/menuDetail/:id([0-9a-f]{24})").all(localsMiddleware).get(getMenuDetail).post(postMenuDetail)
router.route("/subMenuDelete/:menuId([0-9a-f]{24})/:subMenuId([0-9a-f]{24})").all(localsMiddleware).get(getSubMenuDelete);
router.route("/subMenuAuthAdd").patch(subMenuAuthAdd);

router.route("/auth").all(localsMiddleware).get(getAuth).post(postAuth);
router.route("/authDetail/:id([0-9a-f]{24})").all(localsMiddleware).get(getAuthDetail);

export default router;