import { async } from "regenerator-runtime";
import requestIp from "request-ip";
import ActionLog from "./src/schema/actionLog";
import Menu from "./src/schema/menu";

const isHeroku = process.env.NODE_ENV === "production";

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "Not authorized");
    return res.redirect("/");
  }
};

export const localsMiddleware = async (req, res, next) => {
  await ActionLog.create({
    url: req.url,
    params: JSON.stringify(req.params),
    body: JSON.stringify(req.body),
    ip: requestIp.getClientIp(req),
    bigo: JSON.stringify(req.__peername),
    header: JSON.stringify(req.rawHeaders),
  });
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "명작";
  res.locals.loggedInUser = req.session.user || {};
  res.locals.isHeroku = isHeroku;
  console.log(res.locals.loggedInUser);
  next();
};

export const protectorMiddleware = async (req, res, next) => {
    let flag = false;
    req.session.user.menu.forEach(menu => {
      menu.subMenu.forEach(subMenu => {
        if(req.url.indexOf(subMenu.subMenuUrl) != -1){
            flag = true;
        }
      });
    });
    
    if(req.url !=='/home' && !flag){
        res.sendStatus(404);
    }

    const menuList = await Menu.find({
    $or: [
      { user: req.session.user._id },
      { department: req.session.user.department },
    ],
    subMenu: {
      $elemMatch: {
        $or: [
          { user: req.session.user._id },
          { department: req.session.user.department },
        ],
      },
    },
  });

  res.locals.menuList = menuList;
  res.locals.loggedIn = req.session.loggedIn;
  res.locals.siteName = "명작";
  res.locals.loggedInUser = req.session.user || {};
  res.locals.isHeroku = isHeroku;
  if (req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "세션이 종료되었습니다. 로그인페이지로 이동합니다.");
    return res.redirect("/");
  }
};
