import requestIp from "request-ip";
import ActionLog from "./schema/actionLog";
import Menu from "./schema/menu";

const isHeroku = process.env.NODE_ENV === "production";

export const publicOnlyMiddleware = async (req, res, next) => {
  console.log('~~~~~~~~~~~~~~~~');
  console.log(isHeroku);
  await ActionLog.create({
    url: req.url,
    params: JSON.stringify(req.params),
    body: JSON.stringify(req.body),
    ip: requestIp.getClientIp(req),
    bigo: JSON.stringify(req.__peername),
    header: JSON.stringify(req.rawHeaders),
  });
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
  if (req.session.loggedIn) {
    let flag = false;
    console.log(req.session.user.department._id);
    req.session.user.menu.forEach((menu) => {
      console.log(menu);
      menu.subMenu.forEach((subMenu) => {
        console.log(subMenu);
        if (req.url.indexOf(subMenu.subMenuUrl) != -1) {
          flag = true;
        }
      });
    });
    const menu = await Menu.find().populate("subMenu");
    menu.forEach((menu)=>{
      menu.subMenu.forEach(subMenu => {
        if(req.url.indexOf(subMenu.subMenuUrl) != -1){
          subMenu.department.forEach(department => {
            console.log('===================');
            console.log(department);
            console.log(req.session.user.department._id);
            if(req.session.user.department._id+"" === department+""){
              flag = true;
            }
          });
        }
        
      });
    });
    console.log('-----flag----');
    console.log(flag);
    if (req.url !== "/home" && !flag) {
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

    return next();
  } else {
    req.flash("error", "세션이 종료되었습니다. 로그인페이지로 이동합니다.");
    return res.redirect("/");
  }
};
