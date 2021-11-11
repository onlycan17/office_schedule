import { async } from "regenerator-runtime";
import requestIp from "request-ip";
import multer from "multer";
import ActionLog from "./schema/actionLog";
import Menu from "./schema/menu";
import parse from "rss-to-json";
let ObjectId = require("mongoose").Types.ObjectId;

const isHeroku = process.env.NODE_ENV === "production";

export const publicOnlyMiddleware = (req, res, next) => {
  //console.log("~~~~~~~~~~~~~~~~");
  //console.log(isHeroku);
  // await ActionLog.create({
  //   url: req.url,
  //   params: JSON.stringify(req.params),
  //   body: JSON.stringify(req.body),
  //   ip: requestIp.getClientIp(req),
  //   bigo: JSON.stringify(req.__peername),
  //   header: JSON.stringify(req.rawHeaders),
  // });
  if (!req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "Not authorized");
    return res.redirect("/");
  }
};

export const localsMiddleware = async (req, res, next) => {
  if (JSON.stringify(req.body) !== "{}") {
    await ActionLog.create({
      url: req.url,
      params: JSON.stringify(req.params),
      body: JSON.stringify(req.body),
      ip: requestIp.getClientIp(req),
      bigo: JSON.stringify(req.__peername),
      header: JSON.stringify(req.rawHeaders),
    });
  }
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "명작";
  res.locals.loggedInUser = req.session.user || {};
  res.locals.isHeroku = isHeroku;
  //console.log(res.locals.loggedInUser);
  next();
};

export const protectorMiddleware = async (req, res, next) => {
  //console.log('-----미들웨어');
  //console.log(req.url);
  let url = req.url;
  if (url.indexOf("?") !== -1) {
    const arry = url.split("?");
    const order = arry[1].split("=");
    const startUrl = arry[0];
    const lastOrder = order[1];
    res.locals.startUrl = startUrl;
    res.locals.lastOrder = lastOrder;
    //console.log(startUrl, lastOrder);
  }else{
    res.locals.startUrl = url;
  }
  console.log(req.session.loggedIn);
  if (req.session.loggedIn) {
    let flag = false;
    const menu = await Menu.find().populate({
      path: "subMenu",
      options: {
        sort: {
          "order": 1,
        },
      },
    });
    menu.forEach((menu) => {
      menu.subMenu.forEach((subMenu) => {
        if (req.url.indexOf(subMenu.subMenuUrl) != -1) {
          res.locals.menuName = menu.menuName;
          subMenu.department.forEach((department) => {
            //console.log('===================');
            //console.log(department);
            //console.log(req.session.user.department._id);
            if (req.session.user.department._id + "" === department + "") {
              flag = true;
            }
          });
          if(subMenu.user){
            subMenu.user.forEach((user) => {
              if(req.session.user._id+"" === user+""){
                flag = true;
              }
            });
          }
        }
      });
    });
    // console.log('-----flag----');
    // console.log(flag);
    if (req.url !== "/home" && !flag) {
      res.sendStatus(404);
    }

    const dep = {
      _id: new ObjectId(req.session.user.department._id),
    };
    const userId = {
      _id: new ObjectId(req.session.user._id),
    }
    const menuList = await Menu.find({
      // $or: [
      //   { user: req.session.user._id },
      //   //{ department: dep},
      // ],
      subMenu: {
        $elemMatch: {
          $or: [{ user: userId }, { department: dep }],    
        },
      },
    });
    //console.log("menutest-----------------");
    //console.log(menuList);
    res.locals.menuList = menuList;
    res.locals.loggedIn = req.session.loggedIn;
    res.locals.siteName = "명작";
    res.locals.loggedInUser = req.session.user || {};
    res.locals.isHeroku = isHeroku;
    const rss = await parse(
      "https://www.kma.go.kr/wid/queryDFSRSS.jsp?zone=4471025000"
    );
    const temp = rss.items[0].description.body.data[0].wfEn;
    res.locals.weather = temp;
    //console.log(temp);
    //console.log(JSON.stringify(rss, null, 3));
    return next();
  } else {
    req.flash("error", "세션이 종료되었습니다. 로그인페이지로 이동합니다.");
    return res.redirect("/");
  }
};

export const fileUpload = multer({
  dest: "uploads/files/",
  limits: {
    fileSize: 9900000000,
  },
});
