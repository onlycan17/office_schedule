import BongoCar from "../schema/bongoCar";
import pusher from "../pusher";
import User from "../schema/user";

let ObjectId = require("mongoose").Types.ObjectId;

let urlParam, urlStr, orderParam;
export const getBongoCar = async (req, res) => {
  console.log("getBongoCar!");
  let bongoCar;
  console.log(urlParam);
  const now = new Date();
  const dateMonth =
    now.getFullYear() +
    "-" +
    (now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1);
  
    urlParam = req.url;
    bongoCar = await BongoCar.find({
      $or: [{ start: new RegExp(dateMonth) }, { end: new RegExp(dateMonth) }],
    }).populate("user");
  
  const color = req.session.user.color;
  //console.log(color);
  return res.render("bongoCar", {
    pageTitle: "봉고차 예약신청",
    bongoCar,
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

export const postAddBongoCar = async (req, res) => {
  const {
    title,
    description,
    url,
    start,
    end,
    allDay,
    color,
    user,
  } = req.body;
  let bongoCar;
  //console.log("~~~~~~~~~~");
  //console.log(req.body);
  //console.log(user);
  bongoCar = await BongoCar.create({
    title,
    description,
    url,
    start,
    end,
    allDay,
    color,
    user,
  });

  // console.log(departmentInfo);
  const userInfo = await User.findById(user);

  pusher.trigger("6110e83e4d79e34e8bff0e44_612490cc21f010838f50a41b","6110e83e4d79e34e8bff0e44_612490cc21f010838f50a41b", {
    message: userInfo.name + "님의 차량신청예약이 등록되었습니다.",
  });
  
  return res.status(201).json({ id: bongoCar._id });
};

export const deleteBongoCar = async (req, res) => {
  //console.log("deleteBongoCar~~~!");
  //console.log(req.params);
  //console.log(req.body);
  const { id } = req.body;
  //console.log(id);
  const result = await BongoCar.findByIdAndDelete(id);
  return res.sendStatus(200);
};

export const customBongoCar = async (req, res) => {
  let bongoCar;
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
  
    bongoCar = await BongoCar.find({
      department: req.session.user.department,
      $or: [
        { start: new RegExp(calendarDate) },
        { end: new RegExp(calendarDate) },
      ],
    }).populate("user");
  
  // console.log(bongoCar);
  const color = req.session.user.color;
  //console.log(color);
  return res.status(200).json({
    bongoCar,
  });
};

export const customWeekBongoCar = async (req, res) => {
  let bongoCar;
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
  
  bongoCar = await BongoCar.find({
    department: req.session.user.department,
    $or: [{ start: { $gte: startDate } }, { start: { $lte: endDate } }],
    $or: [{ end: { $gte: startDate } }, { end: { $lte: endDate } }],
  }).populate("user");
  
  // console.log(bongoCar);
  const color = req.session.user.color;
  //console.log(color);
  return res.status(200).json({
    bongoCar,
  });
};
