import Menu from "../schema/menu";
import Journal from "../schema/Journal";
import pusher from "../pusher";
import User from "../schema/user";
import scheduleC from "node-schedule";
import { async } from "regenerator-runtime";
import File from "../schema/file";
import mime from "mime";
import fs from "fs";
import iconv from "iconv-lite";
import Comment from "../schema/comment";

let ObjectId = require("mongoose").Types.ObjectId;

let urlParam, urlStr, orderParam;
export const getJournal = async (req, res) => {
  console.log("getJournal!");
  let journal;
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
    const { order } = req.query;
    console.log(urlParam);
    console.log("------order---");
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
    if (!menu) {
      return res.sendStatus(500);
    }
    const subMenu = await menu.subMenu.find(isUrl);
    if (!subMenu) {
      return res.sendStatus(500);
    }
    console.log("------submenufilter-----");
    console.log(subMenu);
    const department = subMenu.department[0];
    console.log(department._id);
    const dep = {
      _id: new ObjectId(department._id),
    };
    console.log("-------------");
    console.log(dep);
    journal = await Journal.find({
      department: dep,
      $or: [{ start: new RegExp(dateMonth) }, { end: new RegExp(dateMonth) }],
    })
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      })
      .populate("file");
  } else {
    //console.log(typeof req.session.user.department._id);
    urlParam = req.url;
    const dep = {
      _id: new ObjectId(req.session.user.department._id),
    };
    journal = await Journal.find({
      department: dep,
      $or: [{ start: new RegExp(dateMonth) }, { end: new RegExp(dateMonth) }],
    })
      .populate("department")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      })
      .populate("file");
  }
  console.log(typeof journal);
  const color = req.session.user.color;
  console.log(color);
  return res.render("journal", {
    pageTitle: req.session.user.department.name + "스케줄",
    journal,
    color,
  });
};

const isUrl = (element, index) => {
  console.log("-----isUrl------");
  console.log(element.order);
  if (element.subMenuUrl === urlParam && element.order === Number(orderParam)) {
    return true;
  }
};

export const postAddJournal = async (req, res) => {
  const { description, start, end, allDay, color, user, department } = req.body;
  let journal;
  const departmentInfo = JSON.parse(department);
  console.log(req.files);

  if (req.files.singleFile) {
    const { singleFile } = req.files;
    const { originalname, mimetype, filename, path, size } = singleFile[0];

    const file = await File.create({
      originalname,
      mimetype,
      filename,
      path,
      size,
    });
    journal = await Journal.create({
      title: req.session.user.name,
      description,
      file: file._id,
      start,
      end,
      allDay,
      color,
      user,
      department: departmentInfo._id,
    });
  } else {
    journal = await Journal.create({
      title: req.session.user.name,
      description,
      start,
      end,
      allDay,
      color,
      user,
      department: departmentInfo._id,
    });
  }

  const userInfo = await User.findById(user);

  return res.status(201).json({ id: journal._id });
};

export const downloadFile = async (req, res) => {
  const { id } = req.params;
  const file = await File.findById(id);
  //const fileDown = file.path + '/'
  //const mimetype = mime.getType(file.originalname);
  try {
    if (fs.existsSync(file.path)) {
      res.setHeader(
        "Content-disposition",
        "attachment; filename=" + getDownloadFilename(req, file.originalname)
      );
      res.setHeader("Content-type", file.mimetype);
      const filestream = fs.createReadStream(file.path);
      filestream.pipe(res);
      return;
    }
  } catch (e) {
    console.log(e);
    res.send("파일을 다운로드하는 중에 에러가 발생했습니다.");
    return;
  }
};

//한글 파일명 에러 문제 해결 함수 (영문만 쓸거면 필요없음 / file.originalname 으로 대체하면 됨.)
function getDownloadFilename(req, filename) {
  var header = req.headers["user-agent"];

  if (header.includes("MSIE") || header.includes("Trident")) {
    return encodeURIComponent(filename).replace(/\\+/gi, "%20");
  } else if (header.includes("Chrome")) {
    return iconv.decode(iconv.encode(filename, "UTF-8"), "ISO-8859-1");
  } else if (header.includes("Opera")) {
    return iconv.decode(iconv.encode(filename, "UTF-8"), "ISO-8859-1");
  } else if (header.includes("Firefox")) {
    return iconv.decode(iconv.encode(filename, "UTF-8"), "ISO-8859-1");
  }

  return filename;
}

export const deleteJournal = async (req, res) => {
  console.log("deleteJournal~~~!");
  console.log(req.params);
  console.log(req.body);
  const { id } = req.body;
  console.log(id);
  const result = await Journal.findByIdAndDelete(id);
  return res.sendStatus(200);
};

export const customJournal = async (req, res) => {
  let journal;
  //url = req.url;
  //console.log(req);
  const { url, calendarDate } = req.query;
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
    if (!subMenu) {
      return res.sendStatus(500);
    }
    const department = subMenu.department[0];
    // console.log(department);
    journal = await Journal.find({
      department,
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
    journal = await Journal.find({
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
  // console.log(Journal);
  const color = req.session.user.color;
  //console.log(color);
  return res.status(200).json({
    journal,
  });
};

export const customWeekJournal = async (req, res) => {
  let journal;
  //url = req.url;
  //console.log(req);
  const { url, startDate, endDate } = req.query;
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
    journal = await Journal.find({
      department,
      $or: [{ start: { $gte: startDate } }, { start: { $lte: endDate } }],
      $or: [{ end: { $gte: startDate } }, { end: { $lte: endDate } }],
    })
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      })
      .populate("file");
  } else {
    journal = await Journal.find({
      department: req.session.user.department,
      $or: [{ start: { $gte: startDate } }, { start: { $lte: endDate } }],
      $or: [{ end: { $gte: startDate } }, { end: { $lte: endDate } }],
    })
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      })
      .populate("file");
  }
  // console.log(Journal);
  const color = req.session.user.color;
  //console.log(color);
  return res.status(200).json({
    journal,
  });
};

export const addPostComment = async (req, res) => {
  const { commentText, journalId, user } = req.body;
  let userOJ;
  if (commentText) {
    const comment = await Comment.create({
      text: commentText,
      user,
      journal: journalId,
    });
    const journal = await Journal.findById(journalId);
    if (!journal) {
      return res.sendStatus(404);
    }
    journal.comments.push(comment._id);
    journal.save();
    userOJ = await User.findById(user);
  }
  return res.status(201).json({ id: journalId, user: userOJ });
};

export const editPatchComment = async (req, res) => {
  const { commentId, commentText, journalId, user } = req.body;
  const comment = await Comment.findById(commentId);
  if (!comment) {
    return res.sendStatus(404);
  }
  await Comment.findByIdAndUpdate(commentId, { text: commentText });
  return res.sendStatus(200);
};

export const deleteComment = async (req, res) => {
  const { commentId } = req.body;
  const comment = await Comment.findById(commentId);
  if (!comment) {
    return res.sendStatus(404);
  }
  await Comment.findByIdAndDelete(commentId);
  res.sendStatus(200);
};
