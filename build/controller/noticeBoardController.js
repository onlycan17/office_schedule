"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noticeBoardListFileDownload = exports.noticeBoardListDetailUpdate = exports.noticeBoardListDetailDelete = exports.noticeBoardListDetail = exports.getNoticeBoardListForm = exports.getNoticeBoardList = exports.addNoticeBoardForm = exports.addNoticeBoard = void 0;
var _moment = _interopRequireDefault(require("moment"));
var _middleware = require("../middleware");
var _board = _interopRequireDefault(require("../schema/board"));
var _file = _interopRequireDefault(require("../schema/file"));
var _fs = _interopRequireDefault(require("fs"));
var _iconvLite = _interopRequireDefault(require("iconv-lite"));
var _multer = _interopRequireDefault(require("multer"));
var _pusher = _interopRequireDefault(require("../pusher"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var getNoticeBoardListForm = exports.getNoticeBoardListForm = function getNoticeBoardListForm(req, res) {
  console.log("getNoticeBoardListForm~~~~~~");
  return res.render("noticeBoardList", {
    pageTitle: "공지사항"
  });
};
var getNoticeBoardList = exports.getNoticeBoardList = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$body, start, draw, length, searchTitle, noticeBoarCount, noticeBoard;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, start = _req$body.start, draw = _req$body.draw, length = _req$body.length, searchTitle = _req$body.searchTitle;
          _context.next = 3;
          return _board["default"].find({
            title: {
              $regex: ".*" + searchTitle + ".*"
            },
            publicYn: "Y",
            deleteYn: "N",
            boardGroupId: 1
          }).countDocuments();
        case 3:
          noticeBoarCount = _context.sent;
          _context.next = 6;
          return _board["default"].find({
            title: {
              $regex: ".*" + searchTitle + ".*"
            },
            publicYn: "Y",
            deleteYn: "N",
            boardGroupId: 1
          }).skip(Number(start)).limit(Number(length)).sort("-createdAt").populate("writer");
        case 6:
          noticeBoard = _context.sent;
          console.log(noticeBoard);
          res.status(200).json({
            draw: draw,
            start: start,
            recordsTotal: noticeBoarCount,
            recordsFiltered: noticeBoarCount,
            data: noticeBoard
          });
        case 9:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function getNoticeBoardList(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var addNoticeBoardForm = exports.addNoticeBoardForm = function addNoticeBoardForm(req, res) {
  return res.render("noticeAdd", {
    pageTitle: "공지사항 > 등록"
  });
};
var addNoticeBoard = exports.addNoticeBoard = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$files;
    var _req$body2, boardGroupId, title, editor4, publicYn, groupId, boardId, _req$files$singleFile, originalname, path, mimetype, filename, size, file;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          console.log(req.files);
          //console.log(req);
          _req$body2 = req.body, boardGroupId = _req$body2.boardGroupId, title = _req$body2.title, editor4 = _req$body2.editor4, publicYn = _req$body2.publicYn;
          groupId = Number(boardGroupId); //   console.log('req.session.user._id : -----');
          //   console.log(req.session.user._id);
          _context2.next = 5;
          return _board["default"].create({
            boardGroupId: groupId,
            title: title,
            content: editor4,
            publicYn: publicYn,
            writer: req.session.user._id
          });
        case 5:
          boardId = _context2.sent;
          if (!((_req$files = req.files) !== null && _req$files !== void 0 && _req$files.singleFile)) {
            _context2.next = 14;
            break;
          }
          _req$files$singleFile = req.files.singleFile[0], originalname = _req$files$singleFile.originalname, path = _req$files$singleFile.path, mimetype = _req$files$singleFile.mimetype, filename = _req$files$singleFile.filename, size = _req$files$singleFile.size;
          _context2.next = 10;
          return _file["default"].create({
            originalname: originalname,
            mimetype: mimetype,
            filename: filename,
            path: path,
            size: size,
            dropboxUrl: "/noticeBoard/".concat(boardId._id, "/").concat(originalname)
          });
        case 10:
          file = _context2.sent;
          (0, _middleware.dropbox)({
            resource: "files/upload",
            parameters: {
              path: "/noticeBoard/".concat(boardId._id, "/").concat(originalname)
            },
            readStream: _fs["default"].createReadStream(path)
          }, function (err, result, response) {
            //upload completed
            console.log("----fileupload----");
            console.log(err);
          });
          //   await Board.findByIdAndUpdate(boardId._id, {
          //     files: file._id,
          //   });
          boardId.files.push(file._id);
          boardId.save();
        case 14:
          if (publicYn === "Y") {
            _pusher["default"].trigger("noticeAll", "noticeAlram", {
              message: "새로운 공지사항이 올라왔습니다. 확인해보세요!"
            });
          }
          return _context2.abrupt("return", res.redirect("/noticeBoardList"));
        case 16:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function addNoticeBoard(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var noticeBoardListDetail = exports.noticeBoardListDetail = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var id, notice;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          console.log("detail~~~~~");
          id = req.params.id;
          console.log(id);
          _context3.next = 5;
          return _board["default"].findById(id).populate("writer").populate("files");
        case 5:
          notice = _context3.sent;
          console.log(notice);
          if (notice !== null && notice !== void 0 && notice.createdAt) {
            notice.createdAtFormat = (0, _moment["default"])(notice.createdAt).format("YYYY-MM-DD HH:mm:ss");
          }
          return _context3.abrupt("return", res.render("noticeDetail", {
            pageTitle: "공지사항상세",
            notice: notice,
            id: id
          }));
        case 9:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function noticeBoardListDetail(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var noticeBoardListDetailUpdate = exports.noticeBoardListDetailUpdate = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _req$files2;
    var _req$body3, boardId, boardGroupId, title, editor4, publicYn, notiUpdate, _req$files$singleFile2, originalname, path, mimetype, filename, size, file;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _req$body3 = req.body, boardId = _req$body3.boardId, boardGroupId = _req$body3.boardGroupId, title = _req$body3.title, editor4 = _req$body3.editor4, publicYn = _req$body3.publicYn;
          console.log('noticeBoardListDetailUpdate------');
          console.log(boardId);
          _context4.next = 5;
          return _board["default"].findByIdAndUpdate(boardId, {
            title: title,
            content: editor4,
            publicYn: publicYn
          });
        case 5:
          notiUpdate = _context4.sent;
          console.log(notiUpdate);
          if (!((_req$files2 = req.files) !== null && _req$files2 !== void 0 && _req$files2.singleFile)) {
            _context4.next = 19;
            break;
          }
          //const noticeBoard = await Board.findById(boardId);
          console.log('files--------');
          if (!notiUpdate.files[0]) {
            _context4.next = 12;
            break;
          }
          _context4.next = 12;
          return _file["default"].findByIdAndDelete(notiUpdate.files[0]._id);
        case 12:
          _req$files$singleFile2 = req.files.singleFile[0], originalname = _req$files$singleFile2.originalname, path = _req$files$singleFile2.path, mimetype = _req$files$singleFile2.mimetype, filename = _req$files$singleFile2.filename, size = _req$files$singleFile2.size;
          _context4.next = 15;
          return _file["default"].create({
            originalname: originalname,
            mimetype: mimetype,
            filename: filename,
            path: path,
            size: size,
            dropboxUrl: "/noticeBoard/".concat(boardId, "/").concat(originalname)
          });
        case 15:
          file = _context4.sent;
          (0, _middleware.dropbox)({
            resource: "files/upload",
            parameters: {
              path: "/noticeBoard/".concat(boardId, "/").concat(originalname)
            },
            readStream: _fs["default"].createReadStream(path)
          }, function (err, result, response) {
            //upload completed
            console.log("----fileupload----");
            console.log(err);
          });
          //   await Board.findByIdAndUpdate(boardId._id, {
          //     files: file._id,
          //   });
          notiUpdate.files.push(file._id);
          notiUpdate.save();
        case 19:
          return _context4.abrupt("return", res.redirect("/noticeBoardList"));
        case 20:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function noticeBoardListDetailUpdate(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var noticeBoardListDetailDelete = exports.noticeBoardListDetailDelete = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var boardId;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          boardId = req.body.boardId;
          console.log(boardId);
          _context5.next = 4;
          return _board["default"].findByIdAndUpdate(boardId, {
            deleteYn: "Y"
          });
        case 4:
          return _context5.abrupt("return", res.sendStatus(200));
        case 5:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function noticeBoardListDetailDelete(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var noticeBoardListFileDownload = exports.noticeBoardListFileDownload = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var id, file;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          id = req.params.id;
          console.log(req.params);
          console.log("----filedownload--------");
          console.log(id);
          _context6.next = 6;
          return _file["default"].findById(id);
        case 6:
          file = _context6.sent;
          //const filestream = fs.createWriteStream(`./${file.originalname}`);
          (0, _middleware.dropbox)({
            resource: "files/download",
            parameters: {
              path: file.dropboxUrl
            }
          }, function (err, result, response) {
            //download completed
            console.log(err);
            res.setHeader("Content-disposition", "attachment; filename=" + getDownloadFilename(req, file.originalname));
            res.setHeader("Content-type", file.mimetype);
            console.log('path---------');
            return res.status(200).send(response);
          }).pipe(_fs["default"].createWriteStream("".concat(process.env.PWD, "/uploads/files/").concat(file.originalname)));
        case 8:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function noticeBoardListFileDownload(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

//한글 파일명 에러 문제 해결 함수 (영문만 쓸거면 필요없음 / file.originalname 으로 대체하면 됨.)
function getDownloadFilename(req, filename) {
  var header = req.headers["user-agent"];
  if (header.includes("MSIE") || header.includes("Trident")) {
    return encodeURIComponent(filename).replace(/\\+/gi, "%20");
  } else if (header.includes("Chrome")) {
    return _iconvLite["default"].decode(_iconvLite["default"].encode(filename, "UTF-8"), "ISO-8859-1");
  } else if (header.includes("Opera")) {
    return _iconvLite["default"].decode(_iconvLite["default"].encode(filename, "UTF-8"), "ISO-8859-1");
  } else if (header.includes("Firefox")) {
    return _iconvLite["default"].decode(_iconvLite["default"].encode(filename, "UTF-8"), "ISO-8859-1");
  }
  return filename;
}