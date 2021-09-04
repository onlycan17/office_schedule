import Menu from "../schema/menu";
import Schedule from "../schema/schedule";
import pusher from "../pusher";
import User from "../schema/user";
import Department from "../schema/department";

let ObjectId = require('mongoose').Types.ObjectId;

let urlParam,urlStr,orderParam;
export const getSchedule = async (req, res) => {
  console.log("getSchedule!");
  let schedule;
  console.log(urlParam);
  const now = new Date();
  const dateMonth =
    now.getFullYear() +
    "-" +
    (now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1);
  console.log(dateMonth);
  //console.log(JSON.stringify(req.session.user.department._id));
  //관리자일 경우
  if (req.session.user.department._id === "612490cc21f010838f50a41b") {
    urlStr = req.url;
    urlStr = urlStr.split("?");
    urlParam = urlStr[0];
    const {order} = req.query;
    console.log(urlParam);
    console.log('------order---');
    console.log(req.query);
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
    console.log(menu);
    if(!menu){
      return res.sendStatus(500);
    }
    const subMenu = await menu.subMenu.find(isUrl);
    if(!subMenu){
      return res.sendStatus(500);
    }
    console.log('------submenufilter-----');
    console.log(subMenu);
    const department = subMenu.department[0];
    console.log(department._id);
    const dep = {
      _id : new ObjectId(department._id)
    };
    console.log('-------------')
    console.log(dep);
    schedule = await Schedule.find({
      department:dep,
      $or: [{ start: new RegExp(dateMonth) }, { end: new RegExp(dateMonth) }],
    });
  } else {
    //console.log(typeof req.session.user.department._id);
    urlParam = req.url;
    const dep = {
      _id : new ObjectId(req.session.user.department._id)
    };
    schedule = await Schedule.find({
      department: dep,
      $or: [{ start: new RegExp(dateMonth) }, { end: new RegExp(dateMonth) }],
    }).populate("department");
  }
  console.log(schedule);
  const color = req.session.user.color;
  console.log(color);
  return res.render("schedule", { pageTitle: req.session.user.department.name+"스케줄", schedule, color });
};

const isUrl = (element, index) => {
  console.log('-----isUrl------');
  console.log(element.order);
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
  console.log(title, description);
  const departmentInfo = JSON.parse(department);
  let schedule;
   console.log('~~~~~~~~~~');
   console.log(req.body);
   console.log(user);
  schedule = await Schedule.create({
    title,
    description,
    url,
    start,
    end,
    allDay,
    color,
    user,
    department:departmentInfo._id,
  });
  console.log(schedule._id); 
  console.log('-----------------');
  console.log(department);
  console.log('~~~~~~~~~~');
  
  console.log(departmentInfo);
  const userInfo = await User.findById(user);
  console.log('~~~~~~~~~~');
  console.log(departmentInfo.name);
  
  pusher.trigger(departmentInfo._id+"", departmentInfo._id+"", {
    message: userInfo.name+"님의 일정이 등록되었습니다."
  });
  return res.status(201).json(
    {id:schedule._id}
  );
};

export const deleteSchedule = async (req, res) => {
   console.log('deleteSchedule~~~!');
   console.log(req.body);
  const {id} = req.body;
  console.log(id);
  const result = await Schedule.findByIdAndDelete(id);
  return res.sendStatus(200);
};

export const customSchedule = async (req, res) => {
  let schedule;
  //url = req.url;
  //console.log(req);
  const {url, calendarDate } = req.query;
  console.log(req.query);
  console.log(url);
  
  //console.log(JSON.stringify(req.session.user.department._id));
  //관리자일 경우
  if (req.session.user.department._id === "612490cc21f010838f50a41b") {
    const menu = await Menu.findOne({
      subMenu: {
        $elemMatch: {
          subMenuUrl: url,
        },
      },
    }).populate("subMenu");
    // console.log(menu);
    const subMenu = await menu.subMenu.find(isUrl);
    if(!subMenu){
      return res.sendStatus(500);
    }
    const department = subMenu.department[0];
    // console.log(department);
    schedule = await Schedule.find({
      //department,
      $or: [{ start: new RegExp(calendarDate) }, { end: new RegExp(calendarDate) }],
    });
  } else {
    schedule = await Schedule.find({
      department: req.session.user.department,
      $or: [{ start: new RegExp(calendarDate) }, { end: new RegExp(calendarDate) }],
    });
  }
  // console.log(schedule);
  const color = req.session.user.color;
  //console.log(color);
  return res.status(200).json({
    schedule
  });
}


export const customWeekSchedule = async (req, res) => {
  let schedule;
  //url = req.url;
  //console.log(req);
  const {url, startDate, endDate } = req.query;
  console.log(req.query);
  console.log(url);
  const now = new Date();
  // const dateMonth =
  //   now.getFullYear() +
  //   "-" +
  //   (now.getMonth()+ Number(monthCaculate) + 1 < 10 ? "0" + (now.getMonth()+ Number(monthCaculate) + 1) : now.getMonth() + Number(monthCaculate) + 1);
  // console.log(dateMonth);
  //console.log(JSON.stringify(req.session.user.department._id));
  //관리자일 경우
  if (req.session.user.department._id === "612490cc21f010838f50a41b") {
    const menu = await Menu.findOne({
      subMenu: {
        $elemMatch: {
          subMenuUrl: url,
        },
      },
    }).populate("subMenu");
    // console.log(menu);
    const subMenu = await menu.subMenu.find(isUrl);
    const department = subMenu.department[0];
    // console.log(department);
    schedule = await Schedule.find({
      department,
      $or:[
        {start: {$gte:startDate}},
        {start: {$lte:endDate}}
      ], 
      $or:[
        {end: {$gte:startDate}},
        {end: {$lte:endDate}},
      ]
    });
  } else {
    schedule = await Schedule.find({
      department: req.session.user.department,
      $or:[
        {start: {$gte:startDate}},
        {start: {$lte:endDate}}
      ], 
      $or:[
        {end: {$gte:startDate}},
        {end: {$lte:endDate}},
      ]
    });
  }
  // console.log(schedule);
  const color = req.session.user.color;
  //console.log(color);
  return res.status(200).json({
    schedule
  });
}