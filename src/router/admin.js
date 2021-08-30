import express from "express";
import {
  getDepartment,
  getDepartmentAdd,
  postDepartmentAdd,
} from "../controller/departmentController";
import {
  getAddMenu,
  getDeleteMenu,
  getMenu,
  getMenuDetail,
  postAddMenu,
  postAddSubMenu,
} from "../controller/menuController";
import { getJoin, getJoinAdd, postJoinAdd } from "../controller/userController";

const admin = express.Router();
admin.route("/join").get(getJoin);

admin.route("/joinAdd").get(getJoinAdd).post(postJoinAdd);

admin.route("/department").get(getDepartment);

admin.route("/departmentAdd").get(getDepartmentAdd).post(postDepartmentAdd);

admin.route("/menu").get(getMenu);

admin.route("/menuAdd").get(getAddMenu).post(postAddMenu);

admin.route("/menuDelete/:id([0-9a-f]{24})").get(getDeleteMenu);

admin
  .route("/menuDetail/:id([0-9a-f]{24})")
  .get(getMenuDetail)
  .post(postAddSubMenu);

export default admin;
