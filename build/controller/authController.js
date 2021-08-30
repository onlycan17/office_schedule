"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAuthDetail = exports.postAuth = exports.getAuth = void 0;

var _regeneratorRuntime = require("regenerator-runtime");

var _auth = _interopRequireDefault(require("../schema/auth"));

var _department = _interopRequireDefault(require("../schema/department"));

var _user = _interopRequireDefault(require("../schema/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getAuth = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var authList, userList, departmentList;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _auth["default"].find();

          case 2:
            authList = _context.sent;
            _context.next = 5;
            return _user["default"].find();

          case 5:
            userList = _context.sent;
            _context.next = 8;
            return _department["default"].find();

          case 8:
            departmentList = _context.sent;
            return _context.abrupt("return", res.render("auth", {
              pageTitle: "권한설정",
              authList: authList,
              userList: userList,
              departmentList: departmentList
            }));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getAuth(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getAuth = getAuth;

var postAuth = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body, name, users, department, authCheck, authId, authList, userList, departmentList;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log(req.body);
            _req$body = req.body, name = _req$body.name, users = _req$body.users, department = _req$body.department;
            _context2.prev = 2;
            _context2.next = 5;
            return _auth["default"].find({
              name: name
            });

          case 5:
            authCheck = _context2.sent;

            if (!(authCheck.length > 0)) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", res.sendStatus(404));

          case 8:
            _context2.next = 10;
            return _auth["default"].create({
              name: name,
              users: users ? users : null,
              department: department ? department : null
            });

          case 10:
            authId = _context2.sent;
            return _context2.abrupt("return", res.redirect("/auth"));

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](2);
            _context2.next = 18;
            return _auth["default"].find().populate("user").populate("department");

          case 18:
            authList = _context2.sent;
            _context2.next = 21;
            return _user["default"].find();

          case 21:
            userList = _context2.sent;
            _context2.next = 24;
            return _department["default"].find();

          case 24:
            departmentList = _context2.sent;
            console.log(_context2.t0);
            return _context2.abrupt("return", res.status(400).render("auth", {
              pageTitle: "권한",
              authList: authList,
              userList: userList,
              departmentList: departmentList
            }));

          case 27:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 14]]);
  }));

  return function postAuth(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.postAuth = postAuth;

var getAuthDetail = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var id, auth, userList, departmentList;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _context3.next = 3;
            return _auth["default"].findById(id).populate("user").populate("department");

          case 3:
            auth = _context3.sent;
            _context3.next = 6;
            return _user["default"].find();

          case 6:
            userList = _context3.sent;
            _context3.next = 9;
            return _department["default"].find();

          case 9:
            departmentList = _context3.sent;
            return _context3.abrupt("return", res.render("authDetail", {
              pageTitle: "권한설정 상세페이지",
              auth: auth,
              userList: userList,
              departmentList: departmentList
            }));

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getAuthDetail(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getAuthDetail = getAuthDetail;