import Menu from "../schema/menu";
import Schedule from "../schema/schedule";
import pusher from "../pusher";
import User from "../schema/user";
import Department from "../schema/department";
import scheduleC from "node-schedule";
import Auth from "../schema/auth";

let ObjectId = require("mongoose").Types.ObjectId;

let urlParam, urlStr, orderParam;
export const getSchedule = async (req, res) => {
  console.log("getSchedule!");
  let schedule;
  console.log(urlParam);
  const now = new Date();
  const dateMonth =
    now.getFullYear() +
    "-" +
    (now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1);
  //console.log(dateMonth);
  
  //console.log(JSON.stringify(req.session.user.department._id));

  //관리자일 경우
  if (req.session.user.department._id === "612490cc21f010838f50a41b" || (res.locals.menuName && res.locals.flag === true && res.locals.lastOrder)) {
    urlStr = req.url;
    urlStr = urlStr.split("?");
    urlParam = urlStr[0];
    const { order } = req.query;
    //console.log(urlParam);
    console.log("------order---");
    //console.log(req.query);
    console.log(order);
    orderParam = order;
    const menu = await Menu.findOne({
      subMenu: {
        $elemMatch: {
          subMenuUrl: urlParam,
          order,
        },
      },
    }).populate("subMenu");
    //console.log(menu);
    if (!menu) {
      return res.sendStatus(500);
    }
    const subMenu = await menu.subMenu.find(isUrl);
    console.log(subMenu);
    if (!subMenu) {
      return res.sendStatus(500);
    }
    const auth = await Auth.findOne({subUrl:urlParam,order}).select("department");
    console.log('-----auth-departmentId-------');
    console.log(auth);
    
    const dep = {
      _id: new ObjectId(auth.department._id),
    };
    //console.log("-------------");
    //console.log(dep);
    schedule = await Schedule.find({
      department: dep,
      $or: [{ start: new RegExp(dateMonth) }, { end: new RegExp(dateMonth) }],
    });
  } else {
    //console.log(typeof req.session.user.department._id);
    urlParam = req.url;
    const dep = {
      _id: new ObjectId(req.session.user.department._id),
    };
    schedule = await Schedule.find({
      department: dep,
      $or: [{ start: new RegExp(dateMonth) }, { end: new RegExp(dateMonth) }],
    }).populate("department");
  }
  //console.log(schedule);
  const color = req.session.user.color;
  //console.log(color);
  return res.render("schedule", {
    pageTitle: req.session.user.department.name + "스케줄",
    schedule,
    color,
  });
};

const isUrl = (element, index) => {
  //console.log("-----isUrl------");
  //console.log(element.order);
  if (element.subMenuUrl === urlParam && element.order === Number(orderParam)) {
    return true;
  }
};

export const postAddSchedule = async (req, res) => {
  const {
    title,
    description,
    url,
    start,
    end,
    allDay,
    color,
    user,
    department,
  } = req.body;
  //console.log(title, description);
  const departmentInfo = JSON.parse(department);
  let schedule;
  //console.log("~~~~~~~~~~");
  //console.log(req.body);
  //console.log(user);
  schedule = await Schedule.create({
    title,
    description,
    url,
    start,
    end,
    allDay,
    color,
    user,
    department: departmentInfo._id,
  });
  // console.log(schedule._id);
  // console.log("-----------------");
  // console.log(department);
  // console.log("~~~~~~~~~~");

  // console.log(departmentInfo);
  const userInfo = await User.findById(user);
  // console.log("~~~~~~~~~~");
  // console.log(departmentInfo.name);

  pusher.trigger(departmentInfo._id + "", departmentInfo._id + "", {
    message: userInfo.name + "님의 일정이 등록되었습니다.",
  });
  let startDate = start.substr(0, 10);
  const startYear = start.substr(0, 4);
  const startMonth = start.substr(5, 2);
  const startDay = start.substr(8, 2);
  // console.log("substr 확인------");
  //console.log(startYear + " " + startMonth + " " + startDay);
  let dateNow = new Date();
  const year = dateNow.getFullYear();
  const month = "0" + (dateNow.getMonth() + 1);
  const date = "0" + (dateNow.getDate() - 1);
  //console.log(date);
  dateNow = year + "-" + month + "-" + date;
  if (new Date(startDate) > new Date(dateNow) && allDay) {
    scheduleC.scheduleJob(
      new Date().getSeconds()+" 30 9 " + startDay + " " + startMonth + " " + startYear,
      function () {
        pusher.trigger(
          "morningAllDay_" + departmentInfo._id,
          "morningAllDay_" + departmentInfo._id,
          {
            message: userInfo.name + "님 오늘의 일정입니다./n " + title,
          }
        );
      }
    );
  } else if (new Date(startDate) > new Date(dateNow) && !allDay) {
    const today = start;
    // const startYear = start.substr(0, 4);
    // const startMonth = start.substr(5, 2);
    // const startDay = start.substr(8, 2);
    let hour = today.substr(11, 2);
    let minute = today.substr(14, 2);
    if (Number(minute) <= 5) {
      hour = Number(hour) - 1 + "";
      minute = 60 - 5 - Number(minute) + "";
    } else {
      minute = Number(minute) - 5 + "";
    }
    //console.log(startYear + " " + startMonth + " " + startDay);
    scheduleC.scheduleJob(new Date().getSeconds()+ " " + minute + " " + hour + " "+startDay+" "+" "+startMonth+" "+startYear, function () {
      pusher.trigger(
        "timeAlram_" + departmentInfo._id,
        "timeAlram_" + departmentInfo._id,
        {
          message:
            userInfo.name +
            "님 곧 시작되는 일정이 있습니다. 확인해주세요."
        }
      );
    });
  }

  return res.status(201).json({ id: schedule._id });
};

export const deleteSchedule = async (req, res) => {
  //console.log("deleteSchedule~~~!");
  //console.log(req.params);
  //console.log(req.body);
  const { id } = req.body;
  //console.log(id);
  const result = await Schedule.findByIdAndDelete(id);
  return res.sendStatus(200);
};

export const customSchedule = async (req, res) => {
  let schedule;
  //url = req.url;
  //console.log(req);
  //console.log(req.query);
  const { url, calendarDate, order,menuName,flag } = req.query;
  
  console.log(order);
  orderParam = Number(order);
  //console.log(req.query);
  //console.log(url);

  //console.log(JSON.stringify(req.session.user.department._id));
  //console.log(menuName);
  //console.log(order);
  //console.log(typeof flag);
  const flagTemp = JSON.parse(flag);
  //console.log(req?.session?.user?.department?._id);
  //관리자일 경우
  if (req?.session?.user?.department?._id === "612490cc21f010838f50a41b" || (menuName && flagTemp === true && order)) {
    
    const menu = await Menu.findOne({
      subMenu: {
        $elemMatch: {
          subMenuUrl: url,
        },
      },
    }).populate("subMenu");
    // console.log(menu);
    const subMenu = await menu.subMenu.find(isUrl);
    if (!subMenu) {
      return res.sendStatus(500);
    }
    const auth = await Auth.findOne({subUrl:url, order:orderParam}).select("department");
    //console.log('-----auth-departmentId-------');
    console.log(auth);
    
    const dep = {
      _id: new ObjectId(auth.department._id),
    };
    
    schedule = await Schedule.find({
      department:dep,
      $or: [
        { start: new RegExp(calendarDate) },
        { end: new RegExp(calendarDate) },
      ],
    });
  } else {
    schedule = await Schedule.find({
      department: req.session.user.department,
      $or: [
        { start: new RegExp(calendarDate) },
        { end: new RegExp(calendarDate) },
      ],
    });
  }
  // console.log(schedule);
  const color = req.session.user.color;
  //console.log(color);
  return res.status(200).json({
    schedule,
  });
};

export const customWeekSchedule = async (req, res) => {
  let schedule;
  //url = req.url;
  //console.log(req);
  const { url, startDate, endDate,order,menuName,flag } = req.query;
  
  //console.log(menuName);
  //console.log(order);
  //console.log(flag);
  orderParam = Number(order);
  const flagTemp = JSON.parse(flag);
  //console.log(req.query);
  //console.log(url);
  const now = new Date();
  //관리자일 경우
  if (req.session.user.department._id === "612490cc21f010838f50a41b" || (menuName && flagTemp === true && order)) {
    const menu = await Menu.findOne({
      subMenu: {
        $elemMatch: {
          subMenuUrl: url,
        },
      },
    }).populate("subMenu");
    // console.log(menu);
    const auth = await Auth.findOne({subUrl:url,order:orderParam}).select("department");
    console.log('-----auth-departmentId-------');
    console.log(auth);
    
    const dep = {
      _id: new ObjectId(auth.department._id),
    };
    // console.log(department);
    schedule = await Schedule.find({
      department: dep,
      $or: [{ start: { $gte: startDate } }, { start: { $lte: endDate } }],
      $or: [{ end: { $gte: startDate } }, { end: { $lte: endDate } }],
    });
  } else {
    schedule = await Schedule.find({
      department: req.session.user.department,
      $or: [{ start: { $gte: startDate } }, { start: { $lte: endDate } }],
      $or: [{ end: { $gte: startDate } }, { end: { $lte: endDate } }],
    });
  }
  // console.log(schedule);
  const color = req.session.user.color;
  //console.log(color);
  return res.status(200).json({
    schedule,
  });
};
