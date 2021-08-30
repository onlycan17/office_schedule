import User from "../schema/user";
import session from "express-session";
import { async } from "regenerator-runtime";
import Department from "../schema/department";
import bcrypt from "bcrypt";

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });

export const postLogin = async (req, res) => {
  const pageTitle = "로그인";
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email })
      .populate("department")
      .populate({ path: "menu", populate: { path: "subMenu" } });
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
    req.flash("info", "로그인 성공!");
    return res.redirect("/home");
  } catch (error) {
    return res.sendStatus(404);
  }
};

export const logout = (req, res) => {
  req.flash("info", "Bye Bye");
  req.session.destroy();
  return res.redirect("/");
};

export const getJoin = async (req, res) => {
  const userList = await User.find().populate("department");
  // userList.forEach(element => {
  //   console.log(element.department);
  //   const dep = element.department;
  //   console.log(dep.name);
  // })
  
  return res.render("join", { pageTitle: "회원관리", userList });
};

export const getJoinAdd = async (req, res) => {
  const partList = await Department.find();
  const userList = await User.find();
  console.log("partList = ");
  console.log(partList);
  return res.render("joinAdd", { pageTitle: "회원등록", partList, userList });
};

export const getJoinUpdate = async(req,res) => {
  const { id } = req.params;
  const partList = await Department.find();
  const user = await User.findById(id);
  return res.render("joinUpdate", {pageTitle:"회원수정", partList, user});
}

export const postJoinAdd = async (req, res) => {
  const partList = await Department.find();
  const userList = await User.find();
  const { name, email, password, password2, partId, color } = req.body;
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
      color,
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


export const postJoinUpdate = async (req, res) => {
  const partList = await Department.find();
  const userList = await User.find();
  const {id ,name, oldEmail, email, password, password2, partId, color } = req.body;
  console.log("color~~~~ : "+ color);
  const pageTitle = "회원수정";
  let department;
  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "비밀번호가 맞지 않습니다.",
      partList,
      userList,
    });
  }
  if(oldEmail !== email){
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
  }
  
  try {
    const enPassword = await bcrypt.hash(password, 5);
    const userId = await User.updateOne({
      _id:id
    },{$set: {
      name,
      email,
      password:enPassword,
      department: partId,
      color,
    }});
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
      pageTitle: "회원수정",
      errorMessage: error._message,
      partList,
      userList,
    });
  }
};