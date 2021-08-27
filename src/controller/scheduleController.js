import Menu from "../schema/menu";
import Schedule from "../schema/schedule";

let url;
export const getSchedule = async (req, res) => {
  console.log("getSchedule!");
  let schedule;
  url = req.url;
  const now = new Date();
  const dateMonth =
    now.getFullYear() +
    "-" +
    (now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1);
  console.log(dateMonth);
  //console.log(JSON.stringify(req.session.user.department._id));
  //관리자일 경우
  if (req.session.user.department._id === "612490cc21f010838f50a41b") {
    const url = req.url;
    const menu = await Menu.findOne({
      subMenu: {
        $elemMatch: {
          subMenuUrl: url,
        },
      },
    }).populate("subMenu");
    //console.log(menu);
    const subMenu = await menu.subMenu.find(isUrl);
    const department = subMenu.department[0];
    console.log(department);
    schedule = await Schedule.find({
      //department,
      $or: [{ start: new RegExp(dateMonth) }, { end: new RegExp(dateMonth) }],
    });
  } else {
    schedule = await Schedule.find({
      department: req.session.user.department,
      $or: [{ start: new RegExp(dateMonth) }, { end: new RegExp(dateMonth) }],
    });
  }
  console.log(schedule);
  const color = req.session.user.color;
  //console.log(color);
  return res.render("schedule", { pageTitle: "스케줄 샘플", schedule, color });
};

const isUrl = (element, index) => {
  if (element.subMenuUrl === url) {
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
  let schedule;

  schedule = await Schedule.create({
    title,
    description,
    url,
    start,
    end,
    allDay,
    color,
    user,
    department,
  });
  console.log(schedule);

  return res.sendStatus(201);
};

export const deleteSchedule = async (req, res) => {
  console.log('deleteSchedule~~~!');
  console.log(req.body);
  const {id} = req.body;
  const result = await Schedule.findOneAndDelete(id);
  return res.sendStatus(200);
};

export const customSchedule = async (req, res) => {
  let schedule;
  //url = req.url;
  //console.log(req);
  const {url, monthCaculate } = req.query;
  console.log(req.query);
  console.log(url);
  const now = new Date();
  const dateMonth =
    now.getFullYear() +
    "-" +
    (now.getMonth()+ Number(monthCaculate) + 1 < 10 ? "0" + (now.getMonth()+ Number(monthCaculate) + 1) : now.getMonth() + Number(monthCaculate) + 1);
  console.log(dateMonth);
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
    console.log(menu);
    const subMenu = await menu.subMenu.find(isUrl);
    const department = subMenu.department[0];
    console.log(department);
    schedule = await Schedule.find({
      //department,
      $or: [{ start: new RegExp(dateMonth) }, { end: new RegExp(dateMonth) }],
    });
  } else {
    schedule = await Schedule.find({
      department: req.session.user.department,
      $or: [{ start: new RegExp(dateMonth) }, { end: new RegExp(dateMonth) }],
    });
  }
  console.log(schedule);
  const color = req.session.user.color;
  //console.log(color);
  return res.status(200).json({
    schedule
  });
}