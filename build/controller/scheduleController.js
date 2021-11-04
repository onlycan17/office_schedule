"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.customWeekSchedule = exports.customSchedule = exports.deleteSchedule = exports.postAddSchedule = exports.getSchedule = void 0;

var _menu = _interopRequireDefault(require("../schema/menu"));

var _schedule = _interopRequireDefault(require("../schema/schedule"));

var _pusher = _interopRequireDefault(require("../pusher"));

var _user = _interopRequireDefault(require("../schema/user"));

var _department = _interopRequireDefault(require("../schema/department"));

var _nodeSchedule = _interopRequireDefault(require("node-schedule"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ObjectId = require("mongoose").Types.ObjectId;

var urlParam, urlStr, orderParam;

var getSchedule = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var schedule, now, dateMonth, order, menu, subMenu, department, dep, _dep, color;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log("getSchedule!");
            console.log(urlParam);
            now = new Date();
            dateMonth = now.getFullYear() + "-" + (now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1);
            console.log(dateMonth); //console.log(JSON.stringify(req.session.user.department._id));
            //관리자일 경우

            if (!(req.session.user.department._id === "612490cc21f010838f50a41b")) {
              _context.next = 38;
              break;
            }

            urlStr = req.url;
            urlStr = urlStr.split("?");
            urlParam = urlStr[0];
            order = req.query.order;
            console.log(urlParam);
            console.log("------order---");
            console.log(req.query);
            console.log(order);
            orderParam = order;
            _context.next = 17;
            return _menu["default"].findOne({
              subMenu: {
                $elemMatch: {
                  subMenuUrl: urlParam,
                  order: order
                }
              }
            }).populate("subMenu");

          case 17:
            menu = _context.sent;
            console.log(menu);

            if (menu) {
              _context.next = 21;
              break;
            }

            return _context.abrupt("return", res.sendStatus(500));

          case 21:
            _context.next = 23;
            return menu.subMenu.find(isUrl);

          case 23:
            subMenu = _context.sent;

            if (subMenu) {
              _context.next = 26;
              break;
            }

            return _context.abrupt("return", res.sendStatus(500));

          case 26:
            console.log("------submenufilter-----");
            console.log(subMenu);
            department = subMenu.department[0];
            console.log(department._id);
            dep = {
              _id: new ObjectId(department._id)
            };
            console.log("-------------");
            console.log(dep);
            _context.next = 35;
            return _schedule["default"].find({
              department: dep,
              $or: [{
                start: new RegExp(dateMonth)
              }, {
                end: new RegExp(dateMonth)
              }]
            });

          case 35:
            schedule = _context.sent;
            _context.next = 43;
            break;

          case 38:
            //console.log(typeof req.session.user.department._id);
            urlParam = req.url;
            _dep = {
              _id: new ObjectId(req.session.user.department._id)
            };
            _context.next = 42;
            return _schedule["default"].find({
              department: _dep,
              $or: [{
                start: new RegExp(dateMonth)
              }, {
                end: new RegExp(dateMonth)
              }]
            }).populate("department");

          case 42:
            schedule = _context.sent;

          case 43:
            console.log(schedule);
            color = req.session.user.color;
            console.log(color);
            return _context.abrupt("return", res.render("schedule", {
              pageTitle: req.session.user.department.name + "스케줄",
              schedule: schedule,
              color: color
            }));

          case 47:
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
  console.log("-----isUrl------");
  console.log(element.order);

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
            _req$body = req.body, title = _req$body.title, description = _req$body.description, url = _req$body.url, start = _req$body.start, end = _req$body.end, allDay = _req$body.allDay, color = _req$body.color, user = _req$body.user, department = _req$body.department;
            console.log(title, description);
            departmentInfo = JSON.parse(department);
            console.log("~~~~~~~~~~");
            console.log(req.body);
            console.log(user);
            _context2.next = 8;
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

          case 8:
            schedule = _context2.sent;
            _context2.next = 11;
            return _user["default"].findById(user);

          case 11:
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

            console.log(startYear + " " + startMonth + " " + startDay);
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

              console.log(startYear + " " + startMonth + " " + startDay);

              _nodeSchedule["default"].scheduleJob(new Date().getSeconds() + " " + minute + " " + hour + " " + startDay + " " + " " + startMonth + " " + startYear, function () {
                _pusher["default"].trigger("timeAlram_" + departmentInfo._id, "timeAlram_" + departmentInfo._id, {
                  message: userInfo.name + "님 곧 시작되는 일정이 있습니다. 확인해주세요."
                });
              });
            }

            return _context2.abrupt("return", res.status(201).json({
              id: schedule._id
            }));

          case 25:
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
            console.log("deleteSchedule~~~!");
            console.log(req.params);
            console.log(req.body);
            id = req.body.id;
            console.log(id);
            _context3.next = 7;
            return _schedule["default"].findByIdAndDelete(id);

          case 7:
            result = _context3.sent;
            return _context3.abrupt("return", res.sendStatus(200));

          case 9:
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
    var schedule, _req$query, url, calendarDate, menu, subMenu, department, color;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            //url = req.url;
            //console.log(req);
            _req$query = req.query, url = _req$query.url, calendarDate = _req$query.calendarDate;
            console.log(req.query);
            console.log(url); //console.log(JSON.stringify(req.session.user.department._id));
            //관리자일 경우

            if (!(req.session.user.department._id === "612490cc21f010838f50a41b")) {
              _context4.next = 18;
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
            department = subMenu.department[0]; // console.log(department);

            _context4.next = 15;
            return _schedule["default"].find({
              department: department,
              $or: [{
                start: new RegExp(calendarDate)
              }, {
                end: new RegExp(calendarDate)
              }]
            });

          case 15:
            schedule = _context4.sent;
            _context4.next = 21;
            break;

          case 18:
            _context4.next = 20;
            return _schedule["default"].find({
              department: req.session.user.department,
              $or: [{
                start: new RegExp(calendarDate)
              }, {
                end: new RegExp(calendarDate)
              }]
            });

          case 20:
            schedule = _context4.sent;

          case 21:
            // console.log(schedule);
            color = req.session.user.color; //console.log(color);

            return _context4.abrupt("return", res.status(200).json({
              schedule: schedule
            }));

          case 23:
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
    var schedule, _req$query2, url, startDate, endDate, now, menu, subMenu, department, color;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            //url = req.url;
            //console.log(req);
            _req$query2 = req.query, url = _req$query2.url, startDate = _req$query2.startDate, endDate = _req$query2.endDate;
            console.log(req.query);
            console.log(url);
            now = new Date(); // const dateMonth =
            //   now.getFullYear() +
            //   "-" +
            //   (now.getMonth()+ Number(monthCaculate) + 1 < 10 ? "0" + (now.getMonth()+ Number(monthCaculate) + 1) : now.getMonth() + Number(monthCaculate) + 1);
            // console.log(dateMonth);
            //console.log(JSON.stringify(req.session.user.department._id));
            //관리자일 경우

            if (!(req.session.user.department._id === "612490cc21f010838f50a41b")) {
              _context5.next = 17;
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
            return menu.subMenu.find(isUrl);

          case 10:
            subMenu = _context5.sent;
            department = subMenu.department[0]; // console.log(department);

            _context5.next = 14;
            return _schedule["default"].find(_defineProperty({
              department: department,
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
            }]));

          case 14:
            schedule = _context5.sent;
            _context5.next = 20;
            break;

          case 17:
            _context5.next = 19;
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
            }]));

          case 19:
            schedule = _context5.sent;

          case 20:
            // console.log(schedule);
            color = req.session.user.color; //console.log(color);

            return _context5.abrupt("return", res.status(200).json({
              schedule: schedule
            }));

          case 22:
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