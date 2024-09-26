import { async } from "regenerator-runtime";
import requestIp from "request-ip";
import multer from "multer";
import dropboxV2Api from "dropbox-v2-api";
import ActionLog from "./schema/actionLog";
import Menu from "./schema/menu";
import parse from "rss-to-json";
import Auth from "./schema/auth";
import aws from "aws-sdk";
import multerS3 from "multer-s3";
let ObjectId = require("mongoose").Types.ObjectId;

const isAWSEB = process.env.NODE_ENV === "production";

export const publicOnlyMiddleware = (req, res, next) => {
  //console.log("~~~~~~~~~~~~~~~~");
  //console.log(isAWSEB);
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
  res.locals.isAWSEB = isAWSEB;
  //console.log(res.locals.loggedInUser);
  next();
};

export const protectorMiddleware = async (req, res, next) => {
  //console.log('-----미들웨어');
  //console.log(req.url);
  let url = req.url;
  let startUrl, lastOrder;

  if (url.indexOf("?") !== -1) {
    const arry = url.split("?");
    const order = arry[1].split("=");
    startUrl = arry[0];
    lastOrder = order[1];
    res.locals.startUrl = startUrl;
    res.locals.lastOrder = lastOrder;
    //console.log(startUrl, lastOrder);
  } else {
    res.locals.startUrl = url;
  }
  //console.log(req.session.loggedIn);
  if (req.session.loggedIn) {
    let flag = false;
    //console.log("urltest-----------");
    //console.log(startUrl);
    console.log(typeof lastOrder);
    if (startUrl === "/schedule" || startUrl === "/journal") {
      if (lastOrder) {
        const auth = await Auth.findOne({
          subUrl: startUrl,
          order: Number(lastOrder),
        });
        console.log(auth);
        //console.log("++++++++++++++++++++++");
        //console.log(req.session.user.department._id);
        if (
          req.session.user.department._id + "" !==
          "612490cc21f010838f50a41b"
        ) {
          const menufind = await Menu.findOne({
            subMenu: {
              $elemMatch: {
                subMenuUrl: startUrl,
              },
            },
          });
          //console.log("submenu-------");
          const subMenu = menufind.subMenu.filter(
            (subMenu) =>
              subMenu.subMenuUrl === startUrl &&
              subMenu.order === Number(lastOrder)
          );
          //console.log(subMenu[0].user);
          const result = subMenu[0].user.filter((userParam) => {
            //console.log("usercheck");
            //console.log(userParam, req.session.user._id);
            //console.log("+++++++++++");
            if (userParam + "" === req.session.user._id + "") {
              return true;
            }
            return false;
          });
          const result2 = subMenu[0].department.filter((departmentParam) => {
            // console.log("departmentcheck");
            // console.log(departmentParam, req.session.user.department._id);
            // console.log("+++++++++++");
            if (departmentParam + "" === req.session.user.department._id + "") {
              return true;
            }
          });
          // console.log(result, result2);
          if (result.length > 0 || result2.length > 0) {
            flag = true;
          } else {
            flag = false;
          }
        }else{
          flag = true;
        }
        const menu = await Menu.find().populate({
          path: "subMenu",
          options: {
            sort: {
              order: 1,
            },
          },
        });
        menu.forEach((menu) => {
          menu.subMenu.forEach((subMenu) => {
            if (req.url.indexOf(subMenu.subMenuUrl) != -1) {
              res.locals.menuName = menu.menuName;
            }
          });
        });
      }
    } else {
      //일일업무 , 부서별 일정이 아니면
      const menu = await Menu.find().populate({
        path: "subMenu",
        options: {
          sort: {
            order: 1,
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
            if (subMenu.user) {
              subMenu.user.forEach((user) => {
                // console.log(req.session.user._id);
                // console.log(user);
                if (req.session.user._id + "" === user + "") {
                  flag = true;
                  //res.locals.lastOrder = subMenu.order;
                }
              });
            }
          }
        });
      });
    }
    console.log("---------flag");
    console.log(flag);

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
    };
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
    }).sort("order");
    //console.log("menutest-----------------");
    //console.log(menuList);
    res.locals.menuList = menuList;
    res.locals.loggedIn = req.session.loggedIn;
    res.locals.siteName = "명작";
    res.locals.loggedInUser = req.session.user || {};
    res.locals.flag = flag;
    res.locals.isAWSEB = isAWSEB;
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
    fileSize: 999900000000,
  },
});

export const dropbox = dropboxV2Api.authenticate({
  client_id : process.env.DBX_APP_KEY,
  client_secret : process.env.DBX_APP_SECRET,
  redirect_uri: process.env.REDIRECT || 'http://localhost:4500/auth',
  token: process.env.DBX_TOKEN
});

const authUrl = dropbox.generateAuthUrl();
console.log('----dropboxUrl------');
console.log(authUrl);
  //  use session ref to call API, i.e.:
// dropbox({
//   resource: 'users/get_account',
//   parameters: {
//       'account_id': 'dbid:AAH4f99T0taONIb-OurWxbNQ6ywGRopQngc'
//   }
// }, (err, result, response) => {
//   if (err) { return console.log(err); }
//   console.log(result);
// });


const s3 = new aws.S3({
  credentials: {
      accessKeyId: process.env.AWS_KEY,
      secretAccessKey: process.env.AWS_SECRET,
  }
});

const s3ImageUploader = multerS3({
  s3:s3,
  bucket:'masterpiece-photo-uploads',
  acl:"public-read",
});

export const photoUpload = multer({
  dest: "uploads/photos/",
  limits: {
    fileSize: 999900000000,
  },
  //storage: isAWSEB ? s3ImageUploader : undefined,
  storage: s3ImageUploader,
});