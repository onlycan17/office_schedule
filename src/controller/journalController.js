import Menu from "../schema/menu";
import Journal from "../schema/journal";
import User from "../schema/user";
import File from "../schema/file";
import fs from "fs";
import iconv from "iconv-lite";
import Comment from "../schema/comment";
import { async } from "regenerator-runtime";
import Department from "../schema/department";
import excel from "exceljs";
import moment from "moment";

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
    pageTitle: req.session.user.department.name + "일일업무",
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
  let journal, fileId, filePath, strFileName;
  const departmentInfo = JSON.parse(department);
  console.log(req.files);

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
    });
    fileId = file._id;
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
  console.log(filePath);
  return res
    .status(201)
    .json({ id: journal._id, filePath, fileName: strFileName, fileId });
};

export const downloadFile = async (req, res) => {
  const { id } = req.params;
  const file = await File.findById(id);
  //const fileDown = file.path + '/'
  //const mimetype = mime.getType(file.originalname);
  try {
    const fileCheck = fs.readFileSync(file.path, "utf-8");
    console.log(fileCheck);
    if (!fileCheck) {
      res.send("서버재기동으로 파일이 사라졌습니다.");
      return;
    }
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

export const getSearchJournalForm = async (req, res) => {
  const partList = await Department.find().sort({ order: 1 });
  return res.render("searchJournal", {
    pageTitle: "일일업무조회",
    partList,
  });
};

export const postSearchJournal = async (req, res) => {
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
  const pageNum = Number(start) + Number(length); //Calculate page number
  let journal, journalCount;
  if (!departmentId) {
    journalCount = await Journal.find({
      $or: [
        { start: { $gte: startDate, $lte: endDate } },
        { end: { $gte: startDate, $lte: endDate } },
      ],
    })
      .countDocuments()
      .populate("department")
      .populate({
        path: "user",
        match: {
          $or: [
            { name: { $regex: ".*" + userName + ".*" } },
            { email: { $regex: ".*" + email + ".*" } },
          ],
        },
      });
    console.log(journalCount);

    journal = await Journal.find({
      $or: [
        { start: { $gte: startDate, $lte: endDate } },
        { end: { $gte: startDate, $lte: endDate } },
      ],
    })
      .sort("-start -end")
      .skip(Number(start))
      .limit(pageNum)
      .populate("department")
      .populate({
        path: "user",
        match: {
          $or: [
            { name: { $regex: ".*" + userName + ".*" } },
            { email: { $regex: ".*" + email + ".*" } },
          ],
        },
      });
  } else {
    journalCount = await Journal.find({
      department: new ObjectId(departmentId),
      $or: [
        { start: { $gte: startDate, $lte: endDate } },
        { end: { $gte: startDate, $lte: endDate } },
      ],
    })
      .countDocuments()
      .populate("department")
      .populate({
        path: "user",
        match: {
          $or: [
            { name: { $regex: ".*" + userName + ".*" } },
            { email: { $regex: ".*" + email + ".*" } },
          ],
        },
      });
    console.log(journalCount);

    journal = await Journal.find({
      department: new ObjectId(departmentId),
      $or: [
        { start: { $gte: startDate, $lte: endDate } },
        { end: { $gte: startDate, $lte: endDate } },
      ],
    })
      .sort("-start -end")
      .skip(Number(start))
      .limit(pageNum)
      .populate("department")
      .populate({
        path: "user",
        match: {
          $or: [
            { name: { $regex: ".*" + userName + ".*" } },
            { email: { $regex: ".*" + email + ".*" } },
          ],
        },
      });
  }

  //console.log(journal);
  return res.status(200).json({
    draw,
    start,
    recordsTotal: journalCount,
    recordsFiltered: journalCount,
    data: journal,
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
  
  let journal;
  if (!departmentId) {
    journal = await Journal.find({
      $or: [
        { start: { $gte: startDate, $lte: endDate } },
        { end: { $gte: startDate, $lte: endDate } },
      ],
    })
      .sort("-start -end")
      .populate("department")
      .populate({
        path: "user",
        match: {
          $or: [
            { name: { $regex: ".*" + userName + ".*" } },
            { email: { $regex: ".*" + email + ".*" } },
          ],
        },
      });
  } else {
    journal = await Journal.find({
      department: new ObjectId(departmentId),
      $or: [
        { start: { $gte: startDate, $lte: endDate } },
        { end: { $gte: startDate, $lte: endDate } },
      ],
    })
      .sort("-start -end")
      .populate("department")
      .populate({
        path: "user",
        match: {
          $or: [
            { name: { $regex: ".*" + userName + ".*" } },
            { email: { $regex: ".*" + email + ".*" } },
          ],
        },
      });
  }
  journal.forEach((element) => {
    //console.log(element.department.name);
    const { name } = element.department;
    const {createdAt}  = element;
    element.departmentName = name;
    element.createdAtFormat = moment(createdAt).format('YYYY-MM-DD hh:mm:ss');
  });
  const newRows =  sheet.addRows(journal);
  //console.log(newRows);
  res.setHeader("Content-Type","application/octet-stream;charset=utf-8");
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
  // return workbook.xlsx.write(res).then(() => {
  //   console.log('완료');
  //   res.status(200).end();
  // });
  return workbook.xlsx.writeFile("./excel/temp.xlsx").then(function(){
      console.log('엑셀생성');
      res.download('./excel/temp.xlsx',function(err){
          console.log('error:'+err);
      });
  });
};
