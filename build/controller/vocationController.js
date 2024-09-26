"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postSearchVocation = exports.postAddVocation = exports.getVocation = exports.getSearchVocationForm = exports.excelDownload = exports.editPatchVocationComment = exports.deleteVocationComment = exports.deleteVocation = exports.customWeekVocation = exports.customVocation = exports.addPostVocationComment = void 0;
var _menu = _interopRequireDefault(require("../schema/menu"));
var _vocation = _interopRequireDefault(require("../schema/vocation"));
var _user = _interopRequireDefault(require("../schema/user"));
var _file = _interopRequireDefault(require("../schema/file"));
var _fs = _interopRequireDefault(require("fs"));
var _iconvLite = _interopRequireDefault(require("iconv-lite"));
var _comment = _interopRequireDefault(require("../schema/comment"));
var _regeneratorRuntime2 = require("regenerator-runtime");
var _department = _interopRequireDefault(require("../schema/department"));
var _pusher = _interopRequireDefault(require("../pusher"));
var _exceljs = _interopRequireDefault(require("exceljs"));
var _moment = _interopRequireDefault(require("moment"));
var _auth = _interopRequireDefault(require("../schema/auth"));
var _middleware = require("../middleware");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var ObjectId = require("mongoose").Types.ObjectId;
var urlParam, urlStr, orderParam;
var getVocation = exports.getVocation = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var vocation, now, dateMonth, dep, color;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          //console.log("getVocation!");
          //console.log(urlParam);
          now = new Date();
          dateMonth = now.getFullYear() + "-" + (now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1); //console.log(dateMonth);
          //console.log(JSON.stringify(req.session.user.department._id));
          //console.log(typeof req.session.user.department._id);
          urlParam = req.url;
          dep = {
            _id: new ObjectId(req.session.user.department._id)
          };
          _context.next = 6;
          return _vocation["default"].find({
            department: dep,
            $or: [{
              start: new RegExp(dateMonth)
            }, {
              end: new RegExp(dateMonth)
            }]
          }).populate("department").populate({
            path: "comments",
            populate: {
              path: "user"
            }
          });
        case 6:
          vocation = _context.sent;
          //console.log(typeof vocation);
          color = req.session.user.color; //console.log(color);
          return _context.abrupt("return", res.render("vocation", {
            pageTitle: req.session.user.department.name + "휴가신청",
            vocation: vocation,
            color: color
          }));
        case 9:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function getVocation(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var isUrl = function isUrl(element, index) {
  //console.log("-----isUrl------");
  //console.log(element.order);
  if (element.subMenuUrl === urlParam && element.order === Number(orderParam)) {
    return true;
  }
};
var postAddVocation = exports.postAddVocation = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$body, description, start, end, allDay, color, user, department, vocation, fileId, filePath, strFileName, departmentInfo, singleFile, _singleFile$, originalname, mimetype, filename, path, size, file, userInfo;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, description = _req$body.description, start = _req$body.start, end = _req$body.end, allDay = _req$body.allDay, color = _req$body.color, user = _req$body.user, department = _req$body.department;
          departmentInfo = JSON.parse(department); //console.log(req.files);
          _context2.next = 4;
          return _vocation["default"].create({
            title: req.session.user.name,
            description: description,
            // file: file._id,
            start: start,
            end: end,
            allDay: allDay,
            color: color,
            user: user,
            department: departmentInfo._id
          });
        case 4:
          vocation = _context2.sent;
          if (!req.files.singleFile) {
            _context2.next = 17;
            break;
          }
          singleFile = req.files.singleFile;
          _singleFile$ = singleFile[0], originalname = _singleFile$.originalname, mimetype = _singleFile$.mimetype, filename = _singleFile$.filename, path = _singleFile$.path, size = _singleFile$.size;
          filePath = path;
          strFileName = originalname;
          _context2.next = 12;
          return _file["default"].create({
            originalname: originalname,
            mimetype: mimetype,
            filename: filename,
            path: path,
            size: size,
            dropboxUrl: "/vocation/".concat(vocation._id, "/").concat(originalname)
          });
        case 12:
          file = _context2.sent;
          fileId = file._id;
          (0, _middleware.dropbox)({
            resource: "files/upload",
            parameters: {
              path: "/vocation/".concat(vocation._id, "/").concat(originalname)
            },
            readStream: _fs["default"].createReadStream(path)
          }, function (err, result, response) {
            //upload completed
            console.log("----fileupload----");
            console.log(err);
          });
          _context2.next = 17;
          return _vocation["default"].findByIdAndUpdate(vocation._id, {
            file: file._id
          });
        case 17:
          _context2.next = 19;
          return _user["default"].findById(user);
        case 19:
          userInfo = _context2.sent;
          return _context2.abrupt("return", res.status(201).json({
            id: vocation._id,
            filePath: filePath,
            fileName: strFileName,
            fileId: fileId
          }));
        case 21:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function postAddVocation(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
//한글 파일명 에러 문제 해결 함수 (영문만 쓸거면 필요없음 / file.originalname 으로 대체하면 됨.)
var deleteVocation = exports.deleteVocation = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var id, result;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          //console.log("deleteVocation~~~!");
          //console.log(req.params);
          //console.log(req.body);
          id = req.body.id; //console.log(id);
          _context3.next = 3;
          return _vocation["default"].findByIdAndDelete(id);
        case 3:
          result = _context3.sent;
          return _context3.abrupt("return", res.sendStatus(200));
        case 5:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function deleteVocation(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var customVocation = exports.customVocation = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var vocation, _req$query, url, calendarDate, order, menuName, flag, flagTemp, menu, subMenu, auth, dep, color;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          //url = req.url;
          //console.log(req);
          _req$query = req.query, url = _req$query.url, calendarDate = _req$query.calendarDate, order = _req$query.order, menuName = _req$query.menuName, flag = _req$query.flag; //console.log(req.query);
          //console.log(url);
          orderParam = Number(order);
          flagTemp = JSON.parse(flag); //console.log(JSON.stringify(req.session.user.department._id));
          //관리자일 경우
          if (!(req.session.user.department._id === "612490cc21f010838f50a41b" || menuName && flagTemp === true && order)) {
            _context4.next = 22;
            break;
          }
          _context4.next = 6;
          return _menu["default"].findOne({
            subMenu: {
              $elemMatch: {
                subMenuUrl: url
              }
            }
          }).populate("subMenu");
        case 6:
          menu = _context4.sent;
          _context4.next = 9;
          return menu.subMenu.find(isUrl);
        case 9:
          subMenu = _context4.sent;
          if (subMenu) {
            _context4.next = 12;
            break;
          }
          return _context4.abrupt("return", res.sendStatus(500));
        case 12:
          _context4.next = 14;
          return _auth["default"].findOne({
            subUrl: url,
            order: orderParam
          }).select("department");
        case 14:
          auth = _context4.sent;
          //console.log('-----auth-departmentId-------');
          console.log(auth);
          dep = {
            _id: new ObjectId(auth.department._id)
          }; // console.log(department);
          _context4.next = 19;
          return _vocation["default"].find({
            department: dep,
            $or: [{
              start: new RegExp(calendarDate)
            }, {
              end: new RegExp(calendarDate)
            }]
          }).populate({
            path: "comments",
            populate: {
              path: "user"
            }
          }).populate("file");
        case 19:
          vocation = _context4.sent;
          _context4.next = 25;
          break;
        case 22:
          _context4.next = 24;
          return _vocation["default"].find({
            department: req.session.user.department,
            $or: [{
              start: new RegExp(calendarDate)
            }, {
              end: new RegExp(calendarDate)
            }]
          }).populate({
            path: "comments",
            populate: {
              path: "user"
            }
          }).populate("file");
        case 24:
          vocation = _context4.sent;
        case 25:
          //console.log(vocation);
          color = req.session.user.color; //console.log(color);
          return _context4.abrupt("return", res.status(200).json({
            vocation: vocation
          }));
        case 27:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function customVocation(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var customWeekVocation = exports.customWeekVocation = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var vocation, _req$query2, startDate, endDate, url, order, menuName, flag, now, flagTemp, menu, auth, dep, color;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          //url = req.url;
          //console.log(req);
          _req$query2 = req.query, startDate = _req$query2.startDate, endDate = _req$query2.endDate, url = _req$query2.url, order = _req$query2.order, menuName = _req$query2.menuName, flag = _req$query2.flag; //console.log(req.query);
          //console.log(url);
          now = new Date(); // const dateMonth =
          //   now.getFullYear() +
          //   "-" +
          //   (now.getMonth()+ Number(monthCaculate) + 1 < 10 ? "0" + (now.getMonth()+ Number(monthCaculate) + 1) : now.getMonth() + Number(monthCaculate) + 1);
          // console.log(dateMonth);
          //console.log(JSON.stringify(req.session.user.department._id));
          orderParam = Number(order);
          flagTemp = JSON.parse(flag); //관리자일 경우
          if (!(req.session.user.department._id === "612490cc21f010838f50a41b" || menuName && flagTemp === true && order)) {
            _context5.next = 19;
            break;
          }
          _context5.next = 7;
          return _menu["default"].findOne({
            subMenu: {
              $elemMatch: {
                subMenuUrl: url
              }
            }
          }).populate("subMenu");
        case 7:
          menu = _context5.sent;
          _context5.next = 10;
          return _auth["default"].findOne({
            subUrl: url,
            order: orderParam
          }).select("department");
        case 10:
          auth = _context5.sent;
          console.log("-----auth-departmentId-------");
          console.log(auth);
          dep = {
            _id: new ObjectId(auth.department._id)
          }; // console.log(department);
          _context5.next = 16;
          return _vocation["default"].find({
            department: dep,
            $and: [{
              start: {
                $gte: startDate
              }
            }, {
              start: {
                $lte: endDate
              }
            }, {
              end: {
                $gte: startDate
              }
            }, {
              end: {
                $lte: endDate
              }
            }]
          }).populate({
            path: "comments",
            populate: {
              path: "user"
            }
          }).populate("file");
        case 16:
          vocation = _context5.sent;
          _context5.next = 23;
          break;
        case 19:
          console.log(req.session.user.department);
          _context5.next = 22;
          return _vocation["default"].find({
            department: req.session.user.department._id,
            $and: [{
              start: {
                $gte: startDate
              }
            }, {
              start: {
                $lte: endDate
              }
            }, {
              end: {
                $gte: startDate
              }
            }, {
              end: {
                $lte: endDate
              }
            }]
          }).populate({
            path: "comments",
            populate: {
              path: "user"
            }
          }).populate("file");
        case 22:
          vocation = _context5.sent;
        case 23:
          // console.log(Vocation);
          color = req.session.user.color; //console.log(color);
          return _context5.abrupt("return", res.status(200).json({
            vocation: vocation
          }));
        case 25:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function customWeekVocation(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var addPostVocationComment = exports.addPostVocationComment = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var _req$body2, commentText, vocationId, user, userOJ, comment, vocation;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _req$body2 = req.body, commentText = _req$body2.commentText, vocationId = _req$body2.vocationId, user = _req$body2.user;
          if (!commentText) {
            _context6.next = 16;
            break;
          }
          _context6.next = 4;
          return _comment["default"].create({
            text: commentText,
            user: user,
            vocation: vocationId
          });
        case 4:
          comment = _context6.sent;
          _context6.next = 7;
          return _vocation["default"].findById(vocationId);
        case 7:
          vocation = _context6.sent;
          if (vocation) {
            _context6.next = 10;
            break;
          }
          return _context6.abrupt("return", res.sendStatus(404));
        case 10:
          vocation.comments.push(comment._id);
          vocation.save();
          //console.log('userId-----');
          //console.log(vocation.user._id);
          _pusher["default"].trigger(vocation.user._id + "", vocation.user._id + "", {
            message: "일일업무에 댓글이 등록되었습니다. 확인해보세요!"
          });
          _context6.next = 15;
          return _user["default"].findById(user);
        case 15:
          userOJ = _context6.sent;
        case 16:
          return _context6.abrupt("return", res.status(200).json({
            id: vocationId,
            user: userOJ
          }));
        case 17:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function addPostVocationComment(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var editPatchVocationComment = exports.editPatchVocationComment = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var _req$body3, commentId, commentText, vocationId, user, comment, userOJ;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          console.log(req.body);
          _req$body3 = req.body, commentId = _req$body3.commentId, commentText = _req$body3.commentText, vocationId = _req$body3.vocationId, user = _req$body3.user;
          _context7.next = 4;
          return _comment["default"].findById(commentId);
        case 4:
          comment = _context7.sent;
          if (comment) {
            _context7.next = 7;
            break;
          }
          return _context7.abrupt("return", res.sendStatus(404));
        case 7:
          _context7.next = 9;
          return _comment["default"].findByIdAndUpdate(commentId, {
            text: commentText
          });
        case 9:
          _context7.next = 11;
          return _user["default"].findById(user);
        case 11:
          userOJ = _context7.sent;
          return _context7.abrupt("return", res.status(200).json({
            id: vocationId,
            user: userOJ
          }));
        case 13:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function editPatchVocationComment(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
var deleteVocationComment = exports.deleteVocationComment = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var commentId, comment;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          //console.log('delete~~~~~');
          commentId = req.body.commentId; //console.log(req.params);
          //console.log(req.body);
          //console.log(commentId);
          _context8.next = 3;
          return _comment["default"].findById(commentId);
        case 3:
          comment = _context8.sent;
          if (comment) {
            _context8.next = 6;
            break;
          }
          return _context8.abrupt("return", res.sendStatus(404));
        case 6:
          _context8.next = 8;
          return _comment["default"].findByIdAndDelete(commentId);
        case 8:
          res.sendStatus(200);
        case 9:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function deleteVocationComment(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
var getSearchVocationForm = exports.getSearchVocationForm = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var partList;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return _department["default"].find().sort({
            order: 1
          });
        case 2:
          partList = _context9.sent;
          return _context9.abrupt("return", res.render("searchVocation", {
            pageTitle: "일일업무조회",
            partList: partList
          }));
        case 4:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return function getSearchVocationForm(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();
var postSearchVocation = exports.postSearchVocation = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var _req$body4, start, draw, length, startDate, endDate, userName, email, departmentId, vocation, vocationCount, user, searchParam;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          // console.log('params');
          // console.log(req.params);
          // console.log('body');
          //console.log(req.body);
          //console.log(req.params);
          _req$body4 = req.body, start = _req$body4.start, draw = _req$body4.draw, length = _req$body4.length, startDate = _req$body4.startDate, endDate = _req$body4.endDate, userName = _req$body4.userName, email = _req$body4.email, departmentId = _req$body4.departmentId; //const pageNum = Number(start) + Number(length); //Calculate page number
          console.log(userName);
          if (!userName) {
            _context10.next = 7;
            break;
          }
          console.log("searchName");
          _context10.next = 6;
          return _user["default"].findOne({
            name: {
              $regex: ".*" + userName + ".*"
            }
          }).ne('department', '612490cc21f010838f50a41b');
        case 6:
          user = _context10.sent;
        case 7:
          if (!email) {
            _context10.next = 12;
            break;
          }
          console.log("searchEmail");
          _context10.next = 11;
          return _user["default"].findOne({
            email: {
              $regex: ".*" + email + ".*"
            }
          });
        case 11:
          user = _context10.sent;
        case 12:
          // console.log(user);
          // console.log(user?._id);
          // console.log(typeof user?._id);
          if (user) {
            if (!departmentId) {
              searchParam = {
                user: new ObjectId(user._id + ""),
                $or: [{
                  start: {
                    $gte: startDate,
                    $lte: endDate
                  }
                }, {
                  end: {
                    $gte: startDate,
                    $lte: endDate
                  }
                }]
              };
            } else {
              searchParam = {
                user: new ObjectId(user._id + ""),
                department: new ObjectId(departmentId),
                $or: [{
                  start: {
                    $gte: startDate,
                    $lte: endDate
                  }
                }, {
                  end: {
                    $gte: startDate,
                    $lte: endDate
                  }
                }]
              };
            }
          } else {
            if (!departmentId) {
              searchParam = {
                $or: [{
                  start: {
                    $gte: startDate,
                    $lte: endDate
                  }
                }, {
                  end: {
                    $gte: startDate,
                    $lte: endDate
                  }
                }]
              };
            } else {
              searchParam = {
                department: new ObjectId(departmentId),
                $or: [{
                  start: {
                    $gte: startDate,
                    $lte: endDate
                  }
                }, {
                  end: {
                    $gte: startDate,
                    $lte: endDate
                  }
                }]
              };
            }
          }
          _context10.next = 15;
          return _vocation["default"].find(searchParam).countDocuments().populate("department").populate("user");
        case 15:
          vocationCount = _context10.sent;
          _context10.next = 18;
          return _vocation["default"].find(searchParam).sort("-createdAt").skip(Number(start)).limit(Number(length)).populate("department").populate("user");
        case 18:
          vocation = _context10.sent;
          return _context10.abrupt("return", res.status(200).json({
            draw: draw,
            start: start,
            recordsTotal: vocationCount,
            recordsFiltered: vocationCount,
            data: vocation
          }));
        case 20:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  }));
  return function postSearchVocation(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();
var excelDownload = exports.excelDownload = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    var _req$body5, startDate, endDate, userName, email, departmentId, workbook, sheet, vocation, user, searchParam, newRows;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          //console.log(req.body);
          //console.log(req.params);
          _req$body5 = req.body, startDate = _req$body5.startDate, endDate = _req$body5.endDate, userName = _req$body5.userName, email = _req$body5.email, departmentId = _req$body5.departmentId;
          workbook = new _exceljs["default"].Workbook();
          sheet = workbook.addWorksheet("일일업무조회");
          sheet.columns = [{
            header: "작성자",
            key: "title"
          }, {
            header: "부서",
            key: "departmentName"
          }, {
            header: "업무내용",
            key: "description"
          }, {
            header: "시작일자",
            key: "start"
          }, {
            header: "종료일자",
            key: "end"
          }, {
            header: "생성일자",
            key: "createdAtFormat"
          }];
          if (!userName) {
            _context11.next = 9;
            break;
          }
          console.log("searchName");
          _context11.next = 8;
          return _user["default"].findOne({
            name: {
              $regex: ".*" + userName + ".*"
            }
          }).ne('department', '612490cc21f010838f50a41b');
        case 8:
          user = _context11.sent;
        case 9:
          if (!email) {
            _context11.next = 14;
            break;
          }
          console.log("searchEmail");
          _context11.next = 13;
          return _user["default"].findOne({
            email: {
              $regex: ".*" + email + ".*"
            }
          });
        case 13:
          user = _context11.sent;
        case 14:
          if (user) {
            if (!departmentId) {
              searchParam = {
                user: user._id,
                $or: [{
                  start: {
                    $gte: startDate,
                    $lte: endDate
                  }
                }, {
                  end: {
                    $gte: startDate,
                    $lte: endDate
                  }
                }]
              };
            } else {
              searchParam = {
                user: user._id,
                department: new ObjectId(departmentId),
                $or: [{
                  start: {
                    $gte: startDate,
                    $lte: endDate
                  }
                }, {
                  end: {
                    $gte: startDate,
                    $lte: endDate
                  }
                }]
              };
            }
          } else {
            if (!departmentId) {
              searchParam = {
                $or: [{
                  start: {
                    $gte: startDate,
                    $lte: endDate
                  }
                }, {
                  end: {
                    $gte: startDate,
                    $lte: endDate
                  }
                }]
              };
            } else {
              searchParam = {
                department: new ObjectId(departmentId),
                $or: [{
                  start: {
                    $gte: startDate,
                    $lte: endDate
                  }
                }, {
                  end: {
                    $gte: startDate,
                    $lte: endDate
                  }
                }]
              };
            }
          }
          _context11.next = 17;
          return _vocation["default"].find(searchParam).sort("-start -end").populate("department").populate("user");
        case 17:
          vocation = _context11.sent;
          vocation.forEach(function (element) {
            //console.log(element.department.name);
            var name = element.department.name;
            var createdAt = element.createdAt;
            element.departmentName = name;
            element.createdAtFormat = (0, _moment["default"])(createdAt).format("YYYY-MM-DD hh:mm:ss");
            var descriptionExp = element.description;
            descriptionExp = descriptionExp.replace(/(<([^>]+)>)/gi, "");
            console.log(descriptionExp);
            element.description = descriptionExp;
          });
          newRows = sheet.addRows(vocation); //console.log(newRows);
          res.setHeader("Content-Type", "application/octet-stream;charset=utf-8");
          res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
          res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
          // return workbook.xlsx.write(res).then(() => {
          //   console.log('완료');
          //   res.status(200).end();
          // });
          return _context11.abrupt("return", workbook.xlsx.writeFile("./excel/temp.xlsx").then(function () {
            //console.log('엑셀생성');
            res.download("./excel/temp.xlsx", function (err) {
              console.log("error:" + err);
            });
          }));
        case 24:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  }));
  return function excelDownload(_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}();