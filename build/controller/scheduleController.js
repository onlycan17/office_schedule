"use strict";

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ObjectId = require("mongoose").Types.ObjectId;

var urlParam, urlStr, orderParam;

var getSchedule = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var schedule, now, dateMonth, order, menu, subMenu, auth, dep, _dep, color;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
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

            console.log("------order---"); //console.log(req.query);

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
      }
    }, _callee);
  }));

  return function getSchedule(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getSchedule = getSchedule;

var isUrl = function isUrl(element, index) {
  //console.log("-----isUrl------");
  //console.log(element.order);
  if (element.subMenuUrl === urlParam && element.order === Number(orderParam)) {
    return true;
  }
};

var postAddSchedule = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body, title, description, url, start, end, allDay, color, user, department, departmentInfo, schedule, userInfo, startDate, startYear, startMonth, startDay, dateNow, year, month, date, today, hour, minute;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
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
              } //console.log(startYear + " " + startMonth + " " + startDay);


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
      }
    }, _callee2);
  }));

  return function postAddSchedule(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.postAddSchedule = postAddSchedule;

var deleteSchedule = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var id, result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
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
      }
    }, _callee3);
  }));

  return function deleteSchedule(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.deleteSchedule = deleteSchedule;

var customSchedule = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var _req$session, _req$session$user, _req$session$user$dep;

    var schedule, _req$query, url, calendarDate, order, menuName, flag, flagTemp, menu, subMenu, auth, dep, color;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            //url = req.url;
            //console.log(req);
            //console.log(req.query);
            _req$query = req.query, url = _req$query.url, calendarDate = _req$query.calendarDate, order = _req$query.order, menuName = _req$query.menuName, flag = _req$query.flag;
            console.log(order);
            orderParam = Number(order); //console.log(req.query);
            //console.log(url);
            //console.log(JSON.stringify(req.session.user.department._id));
            //console.log(menuName);
            //console.log(order);
            //console.log(typeof flag);

            flagTemp = JSON.parse(flag); //console.log(req?.session?.user?.department?._id);
            //관리자일 경우

            if (!((req === null || req === void 0 ? void 0 : (_req$session = req.session) === null || _req$session === void 0 ? void 0 : (_req$session$user = _req$session.user) === null || _req$session$user === void 0 ? void 0 : (_req$session$user$dep = _req$session$user.department) === null || _req$session$user$dep === void 0 ? void 0 : _req$session$user$dep._id) === "612490cc21f010838f50a41b" || menuName && flagTemp === true && order)) {
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
      }
    }, _callee4);
  }));

  return function customSchedule(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.customSchedule = customSchedule;

var customWeekSchedule = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var schedule, _req$query2, url, startDate, endDate, order, menuName, flag, flagTemp, now, menu, auth, dep, color;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
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
      }
    }, _callee5);
  }));

  return function customWeekSchedule(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.customWeekSchedule = customWeekSchedule;