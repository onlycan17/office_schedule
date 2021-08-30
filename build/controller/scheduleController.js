"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.customSchedule = exports.deleteSchedule = exports.postAddSchedule = exports.getSchedule = void 0;

var _menu = _interopRequireDefault(require("../schema/menu"));

var _schedule = _interopRequireDefault(require("../schema/schedule"));

var _pusher = _interopRequireDefault(require("../pusher"));

var _user = _interopRequireDefault(require("../schema/user"));

var _department = _interopRequireDefault(require("../schema/department"));

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ObjectId = require('mongoose').Types.ObjectId;

var url;

var getSchedule = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var schedule, now, dateMonth, _url, menu, subMenu, department, dep, _dep, color;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log("getSchedule!");
            url = req.url;
            now = new Date();
            dateMonth = now.getFullYear() + "-" + (now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1);
            console.log(dateMonth); //console.log(JSON.stringify(req.session.user.department._id));
            //관리자일 경우

            if (!(req.session.user.department._id === "612490cc21f010838f50a41b")) {
              _context.next = 23;
              break;
            }

            _url = req.url;
            _context.next = 9;
            return _menu["default"].findOne({
              subMenu: {
                $elemMatch: {
                  subMenuUrl: _url
                }
              }
            }).populate("subMenu");

          case 9:
            menu = _context.sent;
            _context.next = 12;
            return menu.subMenu.find(isUrl);

          case 12:
            subMenu = _context.sent;
            department = subMenu.department[0];
            console.log(department._id);
            dep = {
              _id: new ObjectId(department._id)
            };
            console.log('-------------');
            console.log(dep);
            _context.next = 20;
            return _schedule["default"].find({
              department: dep,
              $or: [{
                start: new RegExp(dateMonth)
              }, {
                end: new RegExp(dateMonth)
              }]
            });

          case 20:
            schedule = _context.sent;
            _context.next = 27;
            break;

          case 23:
            //console.log(typeof req.session.user.department._id);
            _dep = {
              _id: new ObjectId(req.session.user.department._id)
            };
            _context.next = 26;
            return _schedule["default"].find({
              department: _dep,
              $or: [{
                start: new RegExp(dateMonth)
              }, {
                end: new RegExp(dateMonth)
              }]
            }).populate("department");

          case 26:
            schedule = _context.sent;

          case 27:
            console.log(schedule);
            color = req.session.user.color;
            console.log(color);
            return _context.abrupt("return", res.render("schedule", {
              pageTitle: "스케줄 샘플",
              schedule: schedule,
              color: color
            }));

          case 31:
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
  if (element.subMenuUrl === url) {
    return true;
  }
};

var postAddSchedule = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body, title, description, url, start, end, allDay, color, user, department, departmentInfo, schedule, userInfo;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, title = _req$body.title, description = _req$body.description, url = _req$body.url, start = _req$body.start, end = _req$body.end, allDay = _req$body.allDay, color = _req$body.color, user = _req$body.user, department = _req$body.department;
            console.log(title, description);
            departmentInfo = JSON.parse(department);
            console.log('~~~~~~~~~~');
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
            console.log(schedule._id);
            console.log('-----------------');
            console.log(department);
            console.log('~~~~~~~~~~');
            console.log(departmentInfo);
            _context2.next = 16;
            return _user["default"].findById(user);

          case 16:
            userInfo = _context2.sent;
            console.log('~~~~~~~~~~');
            console.log(departmentInfo.name);

            _pusher["default"].trigger(departmentInfo._id + "", departmentInfo._id + "", {
              message: userInfo.name + "님의 일정이 등록되었습니다."
            });

            return _context2.abrupt("return", res.status(201).json({
              id: schedule._id
            }));

          case 21:
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
            console.log('deleteSchedule~~~!');
            console.log(req.body);
            id = req.body.id;
            _context3.next = 5;
            return _schedule["default"].findOneAndDelete(id);

          case 5:
            result = _context3.sent;
            return _context3.abrupt("return", res.sendStatus(200));

          case 7:
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
    var schedule, _req$query, url, monthCaculate, now, dateMonth, menu, subMenu, department, color;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            //url = req.url;
            //console.log(req);
            _req$query = req.query, url = _req$query.url, monthCaculate = _req$query.monthCaculate;
            console.log(req.query);
            console.log(url);
            now = new Date();
            dateMonth = now.getFullYear() + "-" + (now.getMonth() + Number(monthCaculate) + 1 < 10 ? "0" + (now.getMonth() + Number(monthCaculate) + 1) : now.getMonth() + Number(monthCaculate) + 1);
            console.log(dateMonth); //console.log(JSON.stringify(req.session.user.department._id));
            //관리자일 경우

            if (!(req.session.user.department._id === "612490cc21f010838f50a41b")) {
              _context4.next = 19;
              break;
            }

            _context4.next = 9;
            return _menu["default"].findOne({
              subMenu: {
                $elemMatch: {
                  subMenuUrl: url
                }
              }
            }).populate("subMenu");

          case 9:
            menu = _context4.sent;
            _context4.next = 12;
            return menu.subMenu.find(isUrl);

          case 12:
            subMenu = _context4.sent;
            department = subMenu.department[0]; // console.log(department);

            _context4.next = 16;
            return _schedule["default"].find({
              //department,
              $or: [{
                start: new RegExp(dateMonth)
              }, {
                end: new RegExp(dateMonth)
              }]
            });

          case 16:
            schedule = _context4.sent;
            _context4.next = 22;
            break;

          case 19:
            _context4.next = 21;
            return _schedule["default"].find({
              department: req.session.user.department,
              $or: [{
                start: new RegExp(dateMonth)
              }, {
                end: new RegExp(dateMonth)
              }]
            });

          case 21:
            schedule = _context4.sent;

          case 22:
            // console.log(schedule);
            color = req.session.user.color; //console.log(color);

            return _context4.abrupt("return", res.status(200).json({
              schedule: schedule
            }));

          case 24:
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