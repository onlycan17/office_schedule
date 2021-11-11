import { async } from "regenerator-runtime";
import Department from "../schema/department";
import Menu from "../schema/menu";
import User from "../schema/user";

export const getMenu = async (req, res) => {
  const menuList = await Menu.find()
    .populate({ path: "user" })
    .populate({ path: "department", options: { sort: "order" } });
  //console.log(menuList);
  const departmentList = await Department.find().sort("order");
  const userList = await User.find();
  return res.render("menu", {
    pageTitle: "메뉴관리",
    menuList,
    departmentList,
    userList,
  });
};

export const getAddMenu = async (req, res) => {
  const departmentList = await Department.find().sort("order");
  const userList = await User.find();
  return res.render("menuAdd", {
    pageTitle: "메뉴등록",
    departmentList,
    userList,
  });
};

export const getDeleteMenu = async (req, res) => {
  const { id } = req.params;
  const checkMenu = await Menu.findById(id).populate("subMenu");
  const departmentList = await Department.find().sort("order");
  const userList = await User.find();
  const menuList = await Menu.find()
    .populate({ path: "user" })
    .populate({ path: "department" });
  if (checkMenu.subMenu) {
    if (checkMenu.subMenu.length > 0) {
      return res.status(404).render("menu", {
        pageTitle: "하위메뉴가 남아있어서 삭제할 수 없습니다.",
        errorMessage: "하위메뉴가 남아있어서 삭제할 수 없습니다.",
        menuList,
        departmentList,
        userList,
      });
    }
  }
  if (checkMenu.user) {
    checkMenu.user.forEach(async (element) => {
      await User.updateMany({ _id: element }, { $set: { menu: null } });
    });
  }
  await Menu.findByIdAndDelete(id);

  return res.redirect("/menu");
};

export const postAddMenu = async (req, res) => {
  //console.log(req.body);
  const { menuName, menuUrl, order, userId, departmentId } = req.body;
  try {
    const menu = await Menu.create({
      menuName,
      menuUrl,
      order,
      user: userId ? userId : null,
      department: departmentId ? departmentId : null,
    });
    if (userId) {
      const user = await User.findById(userId);
      user.menu.push(menu._id);
      user.save();
    }
    if (departmentId) {
      const department = await Department.findById(departmentId);
      department.menu.push(menu._id);
      department.save();
    }
    menu.save();
    return res.redirect("/menu");
  } catch (error) {
    const menuList = await Menu.find()
      .populate({ path: "user" })
      .populate({ path: "department" });
    const departmentList = await Department.find().sort("order");
    const userList = await User.find();
    //console.log(error);
    return res.status(400).render("menu", {
      pageTitle: "menu 등록",
      errorMessage: error._message,
      menuList,
      departmentList,
      userList,
    });
  }
};

export const getMenuDetail = async (req, res) => {
  //console.log("---------getMenuDetail------------");
  //console.log(req.params);
  const { id } = req.params;
  const menucheck = await Menu.findById(id);
  //console.log(menucheck.user.length);
  const departmentList = await Department.find().sort("order");
  const userList = await User.find();
  let subMenuDetail;
  if (menucheck.subMenu) {
    subMenuDetail = await Menu.findById(id)
      .populate({
        path: "subMenu",
        sort: "order",
        populate: { path: "user", select: "_id name email" },
      })
      .populate({
        path: "subMenu",
        populate: { path: "department", select: "_id name" },
      })
      .populate({
        path: "department",
        sort: "order",
      })
      .populate({
        path: "user",
      });
    //console.log(subMenuDetail);
  }
  //console.log(res);
  return res.render("menuDetail", {
    pageTitle: "서브메뉴관리",
    subMenuDetail,
    userList,
    departmentList,
    menucheck,
  });
};

// export const getAddSubMenu = async(req,res) => {
//   console.log(req.params);
//   const {id} = req.params;
//   const departmentList = await Department.find();
//   const userList = await User.find();
//   console.log(res);
//   return res.render("subMenuAdd", {
//     pageTitle: "서브메뉴등록",
//     id,
//     departmentList,
//     userList,
//   });
// }

export const postAddSubMenu = async (req, res) => {
  const { subMenuName, subMenuUrl, order, userId, departmentId } = req.body;
  const { id } = req.params;
  //console.log(req.body);
  //console.log(req.params);
  let menudetailObj;
  try {
    const checkSubMenu = await Menu.findOne({
      _id: id,
      subMenu: {
        $elemMatch: {
          subMenuName,
        },
        $elemMatch: {
          order,
        },
      },
    });
    //console.log(checkSubMenu);

    if (checkSubMenu) {
      const menucheck = await Menu.findById(id);
      const departmentList = await Department.find().sort("order");
      const userList = await User.find();
      let subMenuDetail;
      if (menucheck.subMenu) {
        subMenuDetail = await Menu.findById(id).populate({
          path: "subMenu",
          populate: { path: "department" },
          populate: { path: "user", select: "_id name email" },
        });
      }
      //console.log("------?------");
      return res.status(404).render("menuDetail", {
        pageTitle: "메뉴등록 상세페이지",
        errorMessage: "이미 등록된 메뉴정보(메뉴명,정렬순서) 입니다.",
        departmentList,
        userList,
        menucheck,
        subMenuDetail,
      });
    }
    menudetailObj = id ? await Menu.findById(id) : null;
    //console.log(menudetailObj);
    //console.log(userId);
    const user = userId ? await User.findById(userId) : null;
    //console.log(user);
    const department = departmentId
      ? await Department.findById(departmentId)
      : null;
    //console.log(department);
    menudetailObj.subMenu.push({
      subMenuName,
      subMenuUrl,
      order,
    });
    const submenuLength = menudetailObj.subMenu.length;
    //console.log(submenuLength);
    //console.log(menudetailObj.subMenu[submenuLength-1]);
    if (department) {
      menudetailObj.subMenu[submenuLength - 1].department.push(department._id);
      department.menu.push(menudetailObj.subMenu[submenuLength - 1]._id);
      department.save();
    }
    if (user) {
      menudetailObj.subMenu[submenuLength - 1].user.push(user._id);
      user.menu.push(menudetailObj._id);
      console.log(user);
      user.save();
    }
    menudetailObj.save();
    //console.log('---test---');
    //console.log(menudetailObj);
    return res.redirect("/menuDetail/" + id);
  } catch (error) {
    console.log(error);
    const departmentList = await Department.find().sort("order");
    const userList = await User.find();
    let subMenuDetail;
    if (menucheck.subMenu) {
      subMenuDetail = await Menu.findById(id).populate({
        path: "subMenu",
        populate: { path: "department" },
        populate: { path: "user", select: "_id name email" },
      });
    }
    //console.log("--------------------------");
    //console.log(subMenuDetail);
    return res.status(400).render("menuDetail", {
      pageTitle: "menu 등록 상세페이지",
      errorMessage: error._message,
      menucheck: menudetailObj,
      departmentList,
      userList,
      subMenuDetail,
    });
  }
};

export const getSubMenuDelete = async (req, res) => {
  const { menuId, subMenuId } = req.params;
  try {
    const menu = await Menu.findById(menuId).populate("subMenu");
    menu.subMenu.pull(subMenuId);
    menu.save();
    const user = await User.findById();
    return res.redirect("/menuDetail/" + menuId);
  } catch (error) {
    const departmentList = await Department.find().sort("order");
    const userList = await User.find();
    let subMenuDetail;
    if (menucheck.subMenu) {
      subMenuDetail = await Menu.findById(menuId).populate({
        path: "subMenu",
        populate: { path: "department" },
        populate: { path: "user", select: "_id name email" },
      });
      return res.status(400).render("menuDetail", {
        pageTitle: "menu 등록 상세페이지",
        errorMessage: error._message,
        menucheck: menu,
        departmentList,
        userList,
        subMenuDetail,
      });
    }
  }
};

export const subMenuAuthAdd = async (req, res) => {
  //console.log("subMenuAuthAdd");
  //console.log(req.body);
  const { menuId, subMenuId, idx, userId, departmentId } = req.body;
  const menu = await Menu.findById(menuId).populate(subMenuId);
  if (userId) {
    menu.subMenu[idx].user.push(userId);
    const user = await User.findById(userId);
    console.log(user);
    user.menu.push(menu.subMenu[idx]._id);
    console.log(user);
    user.save();
  }
  if (departmentId) {
    menu.subMenu[idx].department.push(departmentId);
    const department = await Department.findById(departmentId);
    department.menu.push(menu.subMenu[idx]._id);
    department.save();
  }
  menu.save();
  res.json({
    message: "success",
  });
};
