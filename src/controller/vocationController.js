import Menu from "../schema/menu";
import Vocation from "../schema/vocation";
import User from "../schema/user";
import File from "../schema/file";
import fs from "fs";
import iconv from "iconv-lite";
import Comment from "../schema/comment";
import { async } from "regenerator-runtime";
import Department from "../schema/department";
import pusher from "../pusher";
import excel from "exceljs";
import moment from "moment";
import Auth from "../schema/auth";
import { dropbox } from "../middleware";

let ObjectId = require("mongoose").Types.ObjectId;

let urlParam, urlStr, orderParam;
export const getVocation = async (req, res) => {
  //console.log("getVocation!");
  let vocation;
  //console.log(urlParam);
  const now = new Date();
  const dateMonth =
    now.getFullYear() +
    "-" +
    (now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1);
  //console.log(dateMonth);

  //console.log(JSON.stringify(req.session.user.department._id));

    //console.log(typeof req.session.user.department._id);
    urlParam = req.url;
    const dep = {
      _id: new ObjectId(req.session.user.department._id),
    };
    vocation = await Vocation.find({
      department: dep,
      $or: [{ start: new RegExp(dateMonth) }, { end: new RegExp(dateMonth) }],
    })
      .populate("department")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });
  //console.log(typeof vocation);
  const color = req.session.user.color;
  //console.log(color);
  return res.render("vocation", {
    pageTitle: req.session.user.department.name + "휴가신청",
    vocation,
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

export const postAddVocation = async (req, res) => {
  const { description, start, end, allDay, color, user, department } = req.body;
  let vocation, fileId, filePath, strFileName;
  const departmentInfo = JSON.parse(department);
  //console.log(req.files);
  vocation = await Vocation.create({
    title: req.session.user.name,
    description,
    // file: file._id,
    start,
    end,
    allDay,
    color,
    user,
    department: departmentInfo._id,
  });
  if (req.files.singleFile) {
    const { singleFile } = req.files;
    const { originalname, mimetype, filename, path, size } = singleFile[0];
    filePath = path;
    strFileName = originalname;
    const file = await File.create({
      originalname,
      mimetype,
      filename,
      path,
      size,
      dropboxUrl: `/vocation/${vocation._id}/${originalname}`,
    });
    fileId = file._id;
    dropbox(
      {
        resource: "files/upload",
        parameters: {
          path: `/vocation/${vocation._id}/${originalname}`,
        },
        readStream: fs.createReadStream(path),
      },
      (err, result, response) => {
        //upload completed
        console.log("----fileupload----");
        console.log(err);
      }
    );
    await Vocation.findByIdAndUpdate(vocation._id, { file: file._id });
    // vocation.file.push(file._id);
    // vocation.save();
  }

  const userInfo = await User.findById(user);
  //console.log(filePath);
  return res
    .status(201)
    .json({ id: vocation._id, filePath, fileName: strFileName, fileId });
};
//한글 파일명 에러 문제 해결 함수 (영문만 쓸거면 필요없음 / file.originalname 으로 대체하면 됨.)
export const deleteVocation = async (req, res) => {
  //console.log("deleteVocation~~~!");
  //console.log(req.params);
  //console.log(req.body);
  const { id } = req.body;
  //console.log(id);
  const result = await Vocation.findByIdAndDelete(id);
  return res.sendStatus(200);
};

export const customVocation = async (req, res) => {
  let vocation;
  //url = req.url;
  //console.log(req);
  const { url, calendarDate, order, menuName, flag } = req.query;
  //console.log(req.query);
  //console.log(url);
  orderParam = Number(order);
  const flagTemp = JSON.parse(flag);
  //console.log(JSON.stringify(req.session.user.department._id));
  //관리자일 경우
  if (
    req.session.user.department._id === "612490cc21f010838f50a41b" ||
    (menuName && flagTemp === true && order)
  ) {
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
    const auth = await Auth.findOne({ subUrl: url, order: orderParam }).select(
      "department"
    );
    //console.log('-----auth-departmentId-------');
    console.log(auth);

    const dep = {
      _id: new ObjectId(auth.department._id),
    };
    // console.log(department);
    vocation = await Vocation.find({
      department: dep,
      $or: [
        { start: new RegExp(calendarDate) },
        { end: new RegExp(calendarDate) },
      ],
    })
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      })
      .populate("file");
  } else {
    vocation = await Vocation.find({
      department: req.session.user.department,
      $or: [
        { start: new RegExp(calendarDate) },
        { end: new RegExp(calendarDate) },
      ],
    })
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      })
      .populate("file");
  }
  //console.log(vocation);
  const color = req.session.user.color;
  //console.log(color);
  return res.status(200).json({
    vocation,
  });
};

export const customWeekVocation = async (req, res) => {
  let vocation;
  //url = req.url;
  //console.log(req);
  const { startDate,endDate, url, order, menuName, flag } = req.query;
  //console.log(req.query);
  //console.log(url);
  const now = new Date();
  // const dateMonth =
  //   now.getFullYear() +
  //   "-" +
  //   (now.getMonth()+ Number(monthCaculate) + 1 < 10 ? "0" + (now.getMonth()+ Number(monthCaculate) + 1) : now.getMonth() + Number(monthCaculate) + 1);
  // console.log(dateMonth);
  //console.log(JSON.stringify(req.session.user.department._id));
  orderParam = Number(order);
  const flagTemp = JSON.parse(flag);
  //관리자일 경우
  if (
    req.session.user.department._id === "612490cc21f010838f50a41b" ||
    (menuName && flagTemp === true && order)
  ) {
    const menu = await Menu.findOne({
      subMenu: {
        $elemMatch: {
          subMenuUrl: url,
        },
      },
    }).populate("subMenu");
    // console.log(menu);
    const auth = await Auth.findOne({ subUrl: url, order: orderParam }).select(
      "department"
    );
    console.log("-----auth-departmentId-------");
    console.log(auth);

    const dep = {
      _id: new ObjectId(auth.department._id),
    };
    // console.log(department);
    vocation = await Vocation.find({
      department: dep,
      $and: [
        { start: { $gte: startDate } },
        { start: { $lte: endDate } },
        { end: { $gte: startDate } },
        { end: { $lte: endDate } }
      ],
    })
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      })
      .populate("file");
  } else {
    console.log(req.session.user.department);
    vocation = await Vocation.find({
      department: req.session.user.department._id,
      $and: [
        { start: { $gte: startDate } },
        { start: { $lte: endDate } },
        { end: { $gte: startDate } },
        { end: { $lte: endDate } }
      ],
    })
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      })
      .populate("file");
  }
  // console.log(Vocation);
  const color = req.session.user.color;
  //console.log(color);
  return res.status(200).json({
    vocation,
  });
};

export const addPostVocationComment = async (req, res) => {
  const { commentText, vocationId, user } = req.body;
  let userOJ;
  if (commentText) {
    const comment = await Comment.create({
      text: commentText,
      user,
      vocation: vocationId,
    });
    const vocation = await Vocation.findById(vocationId);
    if (!vocation) {
      return res.sendStatus(404);
    }
    vocation.comments.push(comment._id);
    vocation.save();
    //console.log('userId-----');
    //console.log(vocation.user._id);
    pusher.trigger(vocation.user._id + "", vocation.user._id + "", {
      message: "일일업무에 댓글이 등록되었습니다. 확인해보세요!",
    });
    userOJ = await User.findById(user);
  }
  return res.status(200).json({ id: vocationId, user: userOJ });
};

export const editPatchVocationComment = async (req, res) => {
  console.log(req.body);
  const { commentId, commentText, vocationId, user } = req.body;
  const comment = await Comment.findById(commentId);
  if (!comment) {
    return res.sendStatus(404);
  }
  await Comment.findByIdAndUpdate(commentId, { text: commentText });
  let userOJ = await User.findById(user);
  return res.status(200).json({ id: vocationId, user: userOJ });
};

export const deleteVocationComment = async (req, res) => {
  //console.log('delete~~~~~');
  const { commentId } = req.body;
  //console.log(req.params);
  //console.log(req.body);
  //console.log(commentId);
  const comment = await Comment.findById(commentId);
  //console.log(comment);
  if (!comment) {
    return res.sendStatus(404);
  }
  await Comment.findByIdAndDelete(commentId);
  res.sendStatus(200);
};

export const getSearchVocationForm = async (req, res) => {
  const partList = await Department.find().sort({ order: 1 });
  return res.render("searchVocation", {
    pageTitle: "일일업무조회",
    partList,
  });
};

export const postSearchVocation = async (req, res) => {
  // console.log('params');
  // console.log(req.params);
  // console.log('body');
  //console.log(req.body);
  //console.log(req.params);
  const {
    start,
    draw,
    length,
    startDate,
    endDate,
    userName,
    email,
    departmentId,
  } = req.body;
  //const pageNum = Number(start) + Number(length); //Calculate page number
  let vocation, vocationCount, user;
  console.log(userName);
  if (userName) {
    console.log("searchName");
    user = await User.findOne(
      { name: { $regex: ".*" + userName + ".*" }}).ne('department','612490cc21f010838f50a41b');
  }
  if (email) {
    console.log("searchEmail");
    user = await User.findOne({ email: { $regex: ".*" + email + ".*" } });
  }
  let searchParam;

  // console.log(user);
  // console.log(user?._id);
  // console.log(typeof user?._id);
  if (user) {
    if (!departmentId) {
      searchParam = {
        user: new ObjectId(user._id+""),
        $or: [
          { start: { $gte: startDate, $lte: endDate } },
          { end: { $gte: startDate, $lte: endDate } },
        ],
      };
    } else {
      searchParam = {
        user: new ObjectId(user._id+""),
        department: new ObjectId(departmentId),
        $or: [
          { start: { $gte: startDate, $lte: endDate } },
          { end: { $gte: startDate, $lte: endDate } },
        ],
      };
    }
  } else {
    if (!departmentId) {
      searchParam = {
        $or: [
          { start: { $gte: startDate, $lte: endDate } },
          { end: { $gte: startDate, $lte: endDate } },
        ],
      };
    } else {
      searchParam = {
        department: new ObjectId(departmentId),
        $or: [
          { start: { $gte: startDate, $lte: endDate } },
          { end: { $gte: startDate, $lte: endDate } },
        ],
      };
    }
  }

  vocationCount = await Vocation.find(searchParam)
    .countDocuments()
    .populate("department")
    .populate("user");
  //console.log(vocationCount);

  vocation = await Vocation.find(searchParam)
    .sort("-createdAt")
    .skip(Number(start))
    .limit(Number(length))
    .populate("department")
    .populate("user");

  //console.log(vocation);
  return res.status(200).json({
    draw,
    start,
    recordsTotal: vocationCount,
    recordsFiltered: vocationCount,
    data: vocation,
  });
};

export const excelDownload = async (req, res) => {
  //console.log(req.body);
  //console.log(req.params);
  const { startDate, endDate, userName, email, departmentId } = req.body;

  const workbook = new excel.Workbook();
  const sheet = workbook.addWorksheet("일일업무조회");
  sheet.columns = [
    { header: "작성자", key: "title" },
    { header: "부서", key: "departmentName" },
    { header: "업무내용", key: "description" },
    { header: "시작일자", key: "start" },
    { header: "종료일자", key: "end" },
    { header: "생성일자", key: "createdAtFormat" },
  ];

  let vocation, user;
  if (userName) {
    console.log("searchName");
    user = await User.findOne(
      { name: { $regex: ".*" + userName + ".*" }}).ne('department','612490cc21f010838f50a41b');
  }
  if (email) {
    console.log("searchEmail");
    user = await User.findOne({ email: { $regex: ".*" + email + ".*" } });
  }

  let searchParam;
  if (user) {
    if (!departmentId) {
      searchParam = {
        user: user._id,
        $or: [
          { start: { $gte: startDate, $lte: endDate } },
          { end: { $gte: startDate, $lte: endDate } },
        ],
      };
    } else {
      searchParam = {
        user: user._id,
        department: new ObjectId(departmentId),
        $or: [
          { start: { $gte: startDate, $lte: endDate } },
          { end: { $gte: startDate, $lte: endDate } },
        ],
      };
    }
  } else {
    if (!departmentId) {
      searchParam = {
        $or: [
          { start: { $gte: startDate, $lte: endDate } },
          { end: { $gte: startDate, $lte: endDate } },
        ],
      };
    } else {
      searchParam = {
        department: new ObjectId(departmentId),
        $or: [
          { start: { $gte: startDate, $lte: endDate } },
          { end: { $gte: startDate, $lte: endDate } },
        ],
      };
    }
  }

  vocation = await Vocation.find(searchParam)
    .sort("-start -end")
    .populate("department")
    .populate("user");

  vocation.forEach((element) => {
    //console.log(element.department.name);
    const { name } = element.department;
    const { createdAt } = element;
    element.departmentName = name;
    element.createdAtFormat = moment(createdAt).format("YYYY-MM-DD hh:mm:ss");
    let descriptionExp = element.description;
    descriptionExp = descriptionExp.replace(/(<([^>]+)>)/gi, "");
    console.log(descriptionExp);
    element.description = descriptionExp;
  });
  const newRows = sheet.addRows(vocation);
  //console.log(newRows);
  res.setHeader("Content-Type", "application/octet-stream;charset=utf-8");
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
  // return workbook.xlsx.write(res).then(() => {
  //   console.log('완료');
  //   res.status(200).end();
  // });
  return workbook.xlsx.writeFile("./excel/temp.xlsx").then(function () {
    //console.log('엑셀생성');
    res.download("./excel/temp.xlsx", function (err) {
      console.log("error:" + err);
    });
  });
};
