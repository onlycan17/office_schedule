import Menu from "../schema/menu";
import Schedule from "../schema/schedule";

let url;
export const getSchedule = async (req, res) => {
  console.log("getSchedule!");
  let schedule;
  url = req.url;
  const now = new Date();
  const dateMonth = now.getFullYear() + "-" + (now.getMonth() + 1);
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
      department,
      $or: [
        { start: new RegExp(dateMonth, "i") },
        { end: new RegExp(dateMonth, "i") },
      ],
    });
  } else {
    schedule = await Schedule.find({
      department: req.session.user.department,
      $or: {
        start,
      },
    });
  }
  const color = req.session.user.color;
  console.log(color);
  return res.render("schedule", { pageTitle: "스케줄 샘플", schedule, color });
};

const isUrl = (element, index) => {
  if (element.subMenuUrl === url) {
    return true;
  }
};

export const postAddSchedule = async (req, res) => {
  console.log("DDDDDDDDDD");
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
  try{
    const schedule = await Schedule.create({
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
    return res.sendStatus(200);
  }catch(error){
    console.log(error);
    return res.sendStatus(400);
  }
  
};
