import User from "../schema/user";
import session from "express-session";
import { async } from "regenerator-runtime";
import Department from "../schema/department";
import bcrypt from "bcryptjs";
import Menu from "../schema/menu";

let ObjectId = require("mongoose").Types.ObjectId;

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });

export const postLogin = async (req, res) => {
  const pageTitle = "로그인";
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email })
      .populate("department")
      .populate({ path: "menu", populate: { path: "subMenu" } });
    //.populate("menu");
    if (!user) {
      return res.status(400).render("login", {
        pageTitle,
        errorMessage: "해당 계정이 존재하지 않습니다.",
      });
    }
    const ok = await bcrypt.compareSync(password, user.password);
    if (!ok) {
      return res.status(400).render("login", {
        pageTitle,
        errorMessage: "아이디/패스워드 입력을 다시 확인해 주세요.",
      });
    }
    const menu = await Menu.find().populate("subMenu");
    let objOrder;
    menu.forEach((menu) => {
      menu.subMenu.forEach((subMenu) => {
        subMenu?.department.forEach((dep) => {
          console.log(dep._id);
          console.log("-------------");
          console.log(user?.department?._id);
          if (
            subMenu.subMenuUrl === "/schedule" &&
            dep._id + "" === user?.department?._id + ""
          ) {
            console.log("test----------");
            objOrder = subMenu.order;
          }
        });
      });
    });
    console.log("order -- " + objOrder);
    console.log(user);
    req.session.loggedIn = true;
    req.session.user = user;
    console.log("부서확인");
    console.log(user.department._id);
    req.flash("info", "로그인 성공!");
    if (user.department._id + "" === "612490cc21f010838f50a41b") {
      return res.redirect("/searchJournal?order=4");
    } else {
      return res.redirect("/schedule?order=" + objOrder);
    }
  } catch (error) {
    return res.sendStatus(404);
  }
};

export const logout = (req, res) => {
  req.flash("info", "Bye Bye");
  req.session.destroy();
  return res.redirect("/");
};

export const getJoinForm = async (req, res) => {
  const partList = await Department.find().sort({ order: 1 });
  return res.render("join", { pageTitle: "회원관리", partList });
};

export const joinList = async (req, res) => {
  const { start, draw, length, order, userName, email, departmentId } =
    req.body;
  // let dirTemp;
  // if (order[0].dir === "desc") {
  //   dirTemp = -1;
  // } else {
  //   dirTemp = 1;
  // }
  let thisOrder;
  if(order[0].column === '0' && order[0].dir ==='desc'){
    thisOrder = -1;
  } else if(order[0].column === '0' && order[0].dir ==='asc'){
    thisOrder = 1;
  }else{
   thisOrder = 1; 
  }
  let userCount, userList;
  if (departmentId) {
    userCount = await User.find({
      department: new ObjectId(departmentId),
      name: { $regex: ".*" + userName + ".*" },
      email: { $regex: ".*" + email + ".*" },
    }).countDocuments();
    //console.log(pageNum);
    //console.log(userCount);
    userList = await User.find({
      department: new ObjectId(departmentId),
      name: { $regex: ".*" + userName + ".*" },
      email: { $regex: ".*" + email + ".*" },
    })
      .skip(Number(start))
      .limit(Number(length))
      .sort({name:thisOrder})
      .populate({ path: "department"});
  } else {
    userCount = await User.find({
      name: { $regex: ".*" + userName + ".*" },
      email: { $regex: ".*" + email + ".*" },
    }).countDocuments();
    //console.log(pageNum);
    //console.log(userCount);

    userList = await User.find({
      name: { $regex: ".*" + userName + ".*" },
      email: { $regex: ".*" + email + ".*" },
    })
      .skip(Number(start))
      .limit(Number(length))
      .sort({name:thisOrder})
      .populate({ path: "department"});; 
  }

  const departmentObj = await Department.find();  
  //let userObjArry = new Array();
  userList.forEach((element,idx) => {
    departmentObj.forEach(depElement =>{
      // console.log('----test------')
      // console.log(typeof element.department._id);
      console.log(element);
      if(element.department._id+"" === depElement._id+""){
        // console.log('success----------');
        // console.log(depElement.name);
        element._doc.departmentName = depElement.name;
        console.log();
        //userObjArry.push({...element});
      }
    });
  });
  //console.log(userObjArry);
  console.log(order);
  if(order[0].column === '2'){
    if(order[0].dir === "desc"){
      console.log('desc');
      userList.sort((a,b) => {
        console.log('departmentName--------');
        console.log(a);
        console.log(b);
        const upperCaseA = a._doc.departmentName;
        const upperCaseB = b._doc.departmentName;
        if(upperCaseA < upperCaseB) return 1;
        if(upperCaseA > upperCaseB) return -1;
        if(upperCaseA === upperCaseB) return 0;
      });
    }else{
      console.log('asc');
      userList.sort((a,b) => {
        const upperCaseA = a._doc.departmentName;
        const upperCaseB = b._doc.departmentName;
        if(upperCaseA > upperCaseB) return 1;
        if(upperCaseA < upperCaseB) return -1;
        if(upperCaseA === upperCaseB) return 0;
      });
    }
  }

  //console.log(userList);

  return res.status(200).json({
    draw,
    start,
    recordsTotal: userCount,
    recordsFiltered: userCount,
    data: userList,
  });
};

export const getJoinAdd = async (req, res) => {
  const partList = await Department.find().sort({ order: 1 });
  const userList = await User.find();
  console.log("partList = ");
  console.log(partList);
  return res.render("joinAdd", { pageTitle: "회원등록", partList, userList });
};

export const getJoinUpdate = async (req, res) => {
  const { id } = req.params;
  const partList = await Department.find().sort({ order: 1 });
  const user = await User.findById(id);
  return res.render("joinUpdate", { pageTitle: "회원수정", partList, user });
};

export const getJoinUserUpdate = async (req, res) => {
  const { id } = req.params;
  const partList = await Department.find().sort({ order: 1 });
  const user = await User.findById(id);
  //console.log(partList);
  const teamList = partList.filter(dep => dep._id+"" === user.department + "");
  console.log(user);
  return res.render("joinUserUpdate", { pageTitle: "회원수정", teamList, user });
};

export const postJoinAdd = async (req, res) => {
  const partList = await Department.find().sort({ order: 1 });
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
  const { id, name, oldEmail, email, password, password2, partId, color } =
    req.body;
  //console.log("color~~~~ : " + color);
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
  if (oldEmail !== email) {
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
    const enPassword = await bcrypt.hashSync(password, 5);
    const userId = await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          name,
          email,
          password: enPassword,
          department: partId,
          color,
        },
      }
    );
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


export const postJoinUserUpdate = async (req, res) => {
  const partList = await Department.find();
  const userList = await User.find();
  const { id, name, oldEmail, email, password, password2, partId, color } =
    req.body;
  console.log("color~~~~ : " + color);
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
  if (oldEmail !== email) {
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
    const enPassword = await bcrypt.hashSync(password, 5);
    const userId = await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          name,
          email,
          password: enPassword,
          //department: partId,
          color,
        },
      }
    );
    // if (partId) {
    //   department = await Department.findById(partId);
    //   // console.log("join:"+userId._id);
    //   // console.log(department);
    //   // console.log('-------------department');
    //   department.user.push(userId._id);
    //   department.save();
    // }
    return res.redirect("/logout");
  } catch (error) {
    return res.status(400).render("join", {
      pageTitle: "회원수정",
      errorMessage: error._message,
      partList,
      userList,
    });
  }
};
