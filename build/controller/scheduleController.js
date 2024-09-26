"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postAddSchedule = exports.getSchedule = exports.deleteSchedule = exports.customWeekSchedule = exports.customSchedule = void 0;
var _menu = _interopRequireDefault(require("../schema/menu"));
var _schedule = _interopRequireDefault(require("../schema/schedule"));
var _pusher = _interopRequireDefault(require("../pusher"));
var _user = _interopRequireDefault(require("../schema/user"));
var _department = _interopRequireDefault(require("../schema/department"));
var _nodeSchedule = _interopRequireDefault(require("node-schedule"));
var _auth = _interopRequireDefault(require("../schema/auth"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var ObjectId = require("mongoose").Types.ObjectId;
var urlParam, urlStr, orderParam;
var getSchedule = exports.getSchedule = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var schedule, now, dateMonth, order, menu, subMenu, auth, dep, _dep, color;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          console.log("getSchedule!");
          console.log(urlParam);
          now = new Date();
          dateMonth = now.getFullYear() + "-" + (now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1); //console.log(dateMonth);
          //console.log(JSON.stringify(req.session.user.department._id));
          //관리자일 경우
          if (!(req.session.user.department._id === "612490cc21f010838f50a41b" || res.locals.menuName && res.locals.flag === true && res.locals.lastOrder)) {
            _context.next = 34;
            break;
          }
          urlStr = req.url;
          urlStr = urlStr.split("?");
          urlParam = urlStr[0];
          order = req.query.order; //console.log(urlParam);
          console.log("------order---");
          //console.log(req.query);
          console.log(order);
          orderParam = order;
          _context.next = 14;
          return _menu["default"].findOne({
            subMenu: {
              $elemMatch: {
                subMenuUrl: urlParam,
                order: order
              }
            }
          }).populate("subMenu");
        case 14:
          menu = _context.sent;
          if (menu) {
            _context.next = 17;
            break;
          }
          return _context.abrupt("return", res.sendStatus(500));
        case 17:
          _context.next = 19;
          return menu.subMenu.find(isUrl);
        case 19:
          subMenu = _context.sent;
          console.log(subMenu);
          if (subMenu) {
            _context.next = 23;
            break;
          }
          return _context.abrupt("return", res.sendStatus(500));
        case 23:
          _context.next = 25;
          return _auth["default"].findOne({
            subUrl: urlParam,
            order: order
          }).select("department");
        case 25:
          auth = _context.sent;
          console.log('-----auth-departmentId-------');
          console.log(auth);
          dep = {
            _id: new ObjectId(auth.department._id)
          }; //console.log("-------------");
          //console.log(dep);
          _context.next = 31;
          return _schedule["default"].find({
            department: dep,
            $or: [{
              start: new RegExp(dateMonth)
            }, {
              end: new RegExp(dateMonth)
            }]
          }).populate("user");
        case 31:
          schedule = _context.sent;
          _context.next = 39;
          break;
        case 34:
          //console.log(typeof req.session.user.department._id);
          urlParam = req.url;
          _dep = {
            _id: new ObjectId(req.session.user.department._id)
          };
          _context.next = 38;
          return _schedule["default"].find({
            department: _dep,
            $or: [{
              start: new RegExp(dateMonth)
            }, {
              end: new RegExp(dateMonth)
            }]
          }).populate("department").populate("user");
        case 38:
          schedule = _context.sent;
        case 39:
          //console.log(schedule);
          color = req.session.user.color; //console.log(color);
          return _context.abrupt("return", res.render("schedule", {
            pageTitle: req.session.user.department.name + "스케줄",
            schedule: schedule,
            color: color
          }));
        case 41:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function getSchedule(_x, _x2) {
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
var postAddSchedule = exports.postAddSchedule = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$body, title, description, url, start, end, allDay, color, user, department, departmentInfo, schedule, userInfo, startDate, startYear, startMonth, startDay, dateNow, year, month, date, today, hour, minute;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, title = _req$body.title, description = _req$body.description, url = _req$body.url, start = _req$body.start, end = _req$body.end, allDay = _req$body.allDay, color = _req$body.color, user = _req$body.user, department = _req$body.department; //console.log(title, description);
          departmentInfo = JSON.parse(department);
          _context2.next = 4;
          return _schedule["default"].create({
            title: title,
            description: description,
            url: url,
            start: start,
            end: end,
            allDay: allDay,
            color: color,
            user: user,
            department: departmentInfo._id
          });
        case 4:
          schedule = _context2.sent;
          _context2.next = 7;
          return _user["default"].findById(user);
        case 7:
          userInfo = _context2.sent;
          // console.log("~~~~~~~~~~");
          // console.log(departmentInfo.name);

          _pusher["default"].trigger(departmentInfo._id + "", departmentInfo._id + "", {
            message: userInfo.name + "님의 일정이 등록되었습니다."
          });
          startDate = start.substr(0, 10);
          startYear = start.substr(0, 4);
          startMonth = start.substr(5, 2);
          startDay = start.substr(8, 2); // console.log("substr 확인------");
          //console.log(startYear + " " + startMonth + " " + startDay);
          dateNow = new Date();
          year = dateNow.getFullYear();
          month = "0" + (dateNow.getMonth() + 1);
          date = "0" + (dateNow.getDate() - 1); //console.log(date);
          dateNow = year + "-" + month + "-" + date;
          if (new Date(startDate) > new Date(dateNow) && allDay) {
            _nodeSchedule["default"].scheduleJob(new Date().getSeconds() + " 30 9 " + startDay + " " + startMonth + " " + startYear, function () {
              _pusher["default"].trigger("morningAllDay_" + departmentInfo._id, "morningAllDay_" + departmentInfo._id, {
                message: userInfo.name + "님 오늘의 일정입니다./n " + title
              });
            });
          } else if (new Date(startDate) > new Date(dateNow) && !allDay) {
            today = start; // const startYear = start.substr(0, 4);
            // const startMonth = start.substr(5, 2);
            // const startDay = start.substr(8, 2);
            hour = today.substr(11, 2);
            minute = today.substr(14, 2);
            if (Number(minute) <= 5) {
              hour = Number(hour) - 1 + "";
              minute = 60 - 5 - Number(minute) + "";
            } else {
              minute = Number(minute) - 5 + "";
            }
            //console.log(startYear + " " + startMonth + " " + startDay);
            _nodeSchedule["default"].scheduleJob(new Date().getSeconds() + " " + minute + " " + hour + " " + startDay + " " + " " + startMonth + " " + startYear, function () {
              _pusher["default"].trigger("timeAlram_" + departmentInfo._id, "timeAlram_" + departmentInfo._id, {
                message: userInfo.name + "님 곧 시작되는 일정이 있습니다. 확인해주세요."
              });
            });
          }
          return _context2.abrupt("return", res.status(201).json({
            id: schedule._id
          }));
        case 20:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function postAddSchedule(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var deleteSchedule = exports.deleteSchedule = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var id, result;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          //console.log("deleteSchedule~~~!");
          //console.log(req.params);
          //console.log(req.body);
          id = req.body.id; //console.log(id);
          _context3.next = 3;
          return _schedule["default"].findByIdAndDelete(id);
        case 3:
          result = _context3.sent;
          return _context3.abrupt("return", res.sendStatus(200));
        case 5:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function deleteSchedule(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var customSchedule = exports.customSchedule = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _req$session;
    var schedule, _req$query, url, calendarDate, order, menuName, flag, flagTemp, menu, subMenu, auth, dep, color;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          //url = req.url;
          //console.log(req);
          //console.log(req.query);
          _req$query = req.query, url = _req$query.url, calendarDate = _req$query.calendarDate, order = _req$query.order, menuName = _req$query.menuName, flag = _req$query.flag;
          console.log(order);
          orderParam = Number(order);
          //console.log(req.query);
          //console.log(url);

          //console.log(JSON.stringify(req.session.user.department._id));
          //console.log(menuName);
          //console.log(order);
          //console.log(typeof flag);
          flagTemp = JSON.parse(flag); //console.log(req?.session?.user?.department?._id);
          //관리자일 경우
          if (!((req === null || req === void 0 || (_req$session = req.session) === null || _req$session === void 0 || (_req$session = _req$session.user) === null || _req$session === void 0 || (_req$session = _req$session.department) === null || _req$session === void 0 ? void 0 : _req$session._id) === "612490cc21f010838f50a41b" || menuName && flagTemp === true && order)) {
            _context4.next = 23;
            break;
          }
          _context4.next = 7;
          return _menu["default"].findOne({
            subMenu: {
              $elemMatch: {
                subMenuUrl: url
              }
            }
          }).populate("subMenu");
        case 7:
          menu = _context4.sent;
          _context4.next = 10;
          return menu.subMenu.find(isUrl);
        case 10:
          subMenu = _context4.sent;
          if (subMenu) {
            _context4.next = 13;
            break;
          }
          return _context4.abrupt("return", res.sendStatus(500));
        case 13:
          _context4.next = 15;
          return _auth["default"].findOne({
            subUrl: url,
            order: orderParam
          }).select("department");
        case 15:
          auth = _context4.sent;
          //console.log('-----auth-departmentId-------');
          console.log(auth);
          dep = {
            _id: new ObjectId(auth.department._id)
          };
          _context4.next = 20;
          return _schedule["default"].find({
            department: dep,
            $or: [{
              start: new RegExp(calendarDate)
            }, {
              end: new RegExp(calendarDate)
            }]
          }).populate("user");
        case 20:
          schedule = _context4.sent;
          _context4.next = 26;
          break;
        case 23:
          _context4.next = 25;
          return _schedule["default"].find({
            department: req.session.user.department,
            $or: [{
              start: new RegExp(calendarDate)
            }, {
              end: new RegExp(calendarDate)
            }]
          }).populate("user");
        case 25:
          schedule = _context4.sent;
        case 26:
          // console.log(schedule);
          color = req.session.user.color; //console.log(color);
          return _context4.abrupt("return", res.status(200).json({
            schedule: schedule
          }));
        case 28:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function customSchedule(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var customWeekSchedule = exports.customWeekSchedule = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var schedule, _req$query2, url, startDate, endDate, order, menuName, flag, flagTemp, now, menu, auth, dep, color;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          //url = req.url;
          //console.log(req);
          _req$query2 = req.query, url = _req$query2.url, startDate = _req$query2.startDate, endDate = _req$query2.endDate, order = _req$query2.order, menuName = _req$query2.menuName, flag = _req$query2.flag; //console.log(menuName);
          //console.log(order);
          //console.log(flag);
          orderParam = Number(order);
          flagTemp = JSON.parse(flag); //console.log(req.query);
          //console.log(url);
          now = new Date(); //관리자일 경우
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
          console.log('-----auth-departmentId-------');
          console.log(auth);
          dep = {
            _id: new ObjectId(auth.department._id)
          }; // console.log(department);
          _context5.next = 16;
          return _schedule["default"].find(_defineProperty({
            department: dep,
            $or: [{
              start: {
                $gte: startDate
              }
            }, {
              start: {
                $lte: endDate
              }
            }]
          }, "$or", [{
            end: {
              $gte: startDate
            }
          }, {
            end: {
              $lte: endDate
            }
          }])).populate("user");
        case 16:
          schedule = _context5.sent;
          _context5.next = 22;
          break;
        case 19:
          _context5.next = 21;
          return _schedule["default"].find(_defineProperty({
            department: req.session.user.department,
            $or: [{
              start: {
                $gte: startDate
              }
            }, {
              start: {
                $lte: endDate
              }
            }]
          }, "$or", [{
            end: {
              $gte: startDate
            }
          }, {
            end: {
              $lte: endDate
            }
          }])).populate("user");
        case 21:
          schedule = _context5.sent;
        case 22:
          // console.log(schedule);
          color = req.session.user.color; //console.log(color);
          return _context5.abrupt("return", res.status(200).json({
            schedule: schedule
          }));
        case 24:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function customWeekSchedule(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();