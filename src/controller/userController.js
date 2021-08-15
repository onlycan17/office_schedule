import User from "../schema/user";
import session from "express-session";
import { async } from "regenerator-runtime";
import Department from "../schema/department";
import bcrypt from "bcrypt";

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });

export const postLogin = async(req, res) => {
  const pageTitle = '로그인';
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "해당 계정이 존재하지 않습니다.",
    });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "아이디/패스워드 입력을 다시 확인해 주세요.",
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  req.flash("info","로그인 성공!");
  return res.redirect("/home");
};

export const logout = (req, res) => {
  req.flash("info","Bye Bye");
  req.session.destroy();
  return res.redirect("/");
}

export const getJoin = async (req, res) => {
  const partList = await Department.find();
  const userList = await User.find();
  console.log("partList = ");
  console.log(partList);
  return res.render("join", { pageTitle: "회원등록", partList, userList });
};

export const postJoin = async (req, res) => {
  const partList = await Department.find();
  const userList = await User.find();
  const { name, email, password, password2, partId } = req.body;
  const pageTitle = "회원등록";
  let department;
  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "비밀번호가 맞지 않습니다.",
      partList,
      userList,
    });
  }
  const exists = await User.find({ email });
  // console.log('findUserEmail~~~~')
  // console.log(exists.length);
  if (exists.length > 0) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "이메일이 이미 존재합니다.",
      partList,
      userList,
    });
  }
  try {
    const userId = await User.create({
      name,
      email,
      password,
      department: partId,
    });
    if (partId) {
      department = await Department.findById(partId);
      // console.log("join:"+userId._id);
      // console.log(department);
      // console.log('-------------department');
      department.user.push(userId._id);
      department.save();
    }
    return res.redirect("/join");
  } catch (error) {
    return res.status(400).render("join", {
      pageTitle: "회원등록",
      errorMessage: error._message,
      partList,
      userList,
    });
  }
};
