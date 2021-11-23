import moment from "moment";
import { dropbox, fileUpload } from "../middleware";
import Board from "../schema/board";
import File from "../schema/file";
import fs from "fs";
import iconv from "iconv-lite";
import multer from "multer";
import pusher from "../pusher";

export const getNoticeBoardListForm = (req, res) => {
  console.log("getNoticeBoardListForm~~~~~~");
  return res.render("noticeBoardList", { pageTitle: "공지사항" });
};

export const getNoticeBoardList = async (req, res) => {
  const { start, draw, length, searchTitle } = req.body;
  const noticeBoarCount = await Board.find({
    title: { $regex: ".*" + searchTitle + ".*" },
  }).countDocuments();
  const noticeBoard = await Board.find({
    title: { $regex: ".*" + searchTitle + ".*" },
    publicYn: "Y",
    deleteYn: "N",
    boardGroupId: 1,
  })
    .skip(Number(start))
    .limit(Number(length))
    .sort("-createdAt")
    .populate("writer");

  console.log(noticeBoard);
  res.status(200).json({
    draw,
    start,
    recordsTotal: noticeBoarCount,
    recordsFiltered: noticeBoarCount,
    data: noticeBoard,
  });
};

export const addNoticeBoardForm = (req, res) => {
  return res.render("noticeAdd", {
    pageTitle: "공지사항 > 등록",
  });
};

export const addNoticeBoard = async (req, res) => {
  console.log(req.files);
  //console.log(req);
  const { boardGroupId, title, editor4, publicYn } = req.body;
  const groupId = Number(boardGroupId);
  //   console.log('req.session.user._id : -----');
  //   console.log(req.session.user._id);

  const boardId = await Board.create({
    boardGroupId: groupId,
    title,
    content: editor4,
    publicYn,
    writer: req.session.user._id,
  });
  if (req.files?.singleFile) {
    const { originalname, path, mimetype, filename, size } =
      req.files.singleFile[0];
    const file = await File.create({
      originalname,
      mimetype,
      filename,
      path,
      size,
      dropboxUrl: `/noticeBoard/${boardId._id}/${originalname}`,
    });
    dropbox(
      {
        resource: "files/upload",
        parameters: {
          path: `/noticeBoard/${boardId._id}/${originalname}`,
        },
        readStream: fs.createReadStream(path),
      },
      (err, result, response) => {
        //upload completed
        console.log("----fileupload----");
        console.log(err);
      }
    );
    //   await Board.findByIdAndUpdate(boardId._id, {
    //     files: file._id,
    //   });
    boardId.files.push(file._id);
    boardId.save();
  }
  if(publicYn === "Y"){
    pusher.trigger("noticeAll","noticeAlram", {
      message: "새로운 공지사항이 올라왔습니다. 확인해보세요!",
    });
  }
  
  return res.redirect("/noticeBoardList");
};

export const noticeBoardListDetail = async (req, res) => {
  console.log("detail~~~~~");
  const { id } = req.params;
  console.log(id);
  const notice = await Board.findById(id).populate("writer").populate("files");
  console.log(notice);
  if (notice?.createdAt) {
    notice.createdAtFormat = moment(notice.createdAt).format(
      "YYYY-MM-DD HH:mm:ss"
    );
  }
  return res.render("noticeDetail", { pageTitle: "공지사항상세", notice, id });
};

export const noticeBoardListDetailUpdate = async (req, res) => {
  const { boardId, boardGroupId, title, editor4, publicYn } = req.body;
  console.log('noticeBoardListDetailUpdate------');
  console.log(boardId);
  const notiUpdate =  await Board.findByIdAndUpdate(boardId, { title, content: editor4, publicYn });
  console.log(notiUpdate);
  if (req.files?.singleFile) {
    //const noticeBoard = await Board.findById(boardId);
    console.log('files--------');
    if(notiUpdate.files[0]){
      await File.findByIdAndDelete(notiUpdate.files[0]._id);
    }
    const { originalname, path, mimetype, filename, size } =
      req.files.singleFile[0];
    const file = await File.create({
      originalname,
      mimetype,
      filename,
      path,
      size,
      dropboxUrl: `/noticeBoard/${boardId}/${originalname}`,
    });
    dropbox(
      {
        resource: "files/upload",
        parameters: {
          path: `/noticeBoard/${boardId}/${originalname}`,
        },
        readStream: fs.createReadStream(path),
      },
      (err, result, response) => {
        //upload completed
        console.log("----fileupload----");
        console.log(err);
      }
    );
    //   await Board.findByIdAndUpdate(boardId._id, {
    //     files: file._id,
    //   });
    notiUpdate.files.push(file._id);
    notiUpdate.save();
  }
  return res.redirect("/noticeBoardList");
};

export const noticeBoardListDetailDelete = async (req, res) => {
  const { boardId } = req.body;
  console.log(boardId);
  await Board.findByIdAndUpdate(boardId, { deleteYn: "Y" });
  return res.sendStatus(200);
};

export const noticeBoardListFileDownload = async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  console.log("----filedownload--------");
  console.log(id);
  const file = await File.findById(id);
   
  //const filestream = fs.createWriteStream(`./${file.originalname}`);
  dropbox(
    {
      resource: "files/download",
      parameters: {
        path: file.dropboxUrl,
      },
    },
    (err, result, response) => {
      //download completed
      console.log(err);
      
      res.setHeader(
        "Content-disposition",
        "attachment; filename=" + getDownloadFilename(req, file.originalname)
      );
      res.setHeader("Content-type", file.mimetype);
      console.log('path---------');
      
      return res.status(200).send(response);
    }
  ).pipe(fs.createWriteStream(`${process.env.PWD}/uploads/files/${file.originalname}`));

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
