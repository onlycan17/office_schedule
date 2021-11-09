"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postJoinUpdate = exports.postJoinAdd = exports.getJoinUpdate = exports.getJoinAdd = exports.getJoin = exports.logout = exports.postLogin = exports.getLogin = void 0;

var _user = _interopRequireDefault(require("../schema/user"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _regeneratorRuntime = require("regenerator-runtime");

var _department = _interopRequireDefault(require("../schema/department"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getLogin = function getLogin(req, res) {
  return res.render("login", {
    pageTitle: "Login"
  });
};

exports.getLogin = getLogin;

var postLogin = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var pageTitle, _req$body, email, password, user, ok;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            pageTitle = "로그인";
            _req$body = req.body, email = _req$body.email, password = _req$body.password;
            _context.prev = 2;
            _context.next = 5;
            return _user["default"].findOne({
              email: email
            }).populate("department").populate({
              path: "menu",
              populate: {
                path: "subMenu"
              }
            });

          case 5:
            user = _context.sent;

            if (user) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", res.status(400).render("login", {
              pageTitle: pageTitle,
              errorMessage: "해당 계정이 존재하지 않습니다."
            }));

          case 8:
            _context.next = 10;
            return _bcrypt["default"].compare(password, user.password);

          case 10:
            ok = _context.sent;

            if (ok) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return", res.status(400).render("login", {
              pageTitle: pageTitle,
              errorMessage: "아이디/패스워드 입력을 다시 확인해 주세요."
            }));

          case 13:
            req.session.loggedIn = true;
            req.session.user = user;
            console.log("부서확인");
            console.log(user.department._id);
            req.flash("info", "로그인 성공!");

            if (!(user.department._id + "" === "612490cc21f010838f50a41b")) {
              _context.next = 22;
              break;
            }

            return _context.abrupt("return", res.redirect("/home"));

          case 22:
            return _context.abrupt("return", res.redirect("/schedule"));

          case 23:
            _context.next = 28;
            break;

          case 25:
            _context.prev = 25;
            _context.t0 = _context["catch"](2);
            return _context.abrupt("return", res.sendStatus(404));

          case 28:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 25]]);
  }));

  return function postLogin(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.postLogin = postLogin;

var logout = function logout(req, res) {
  req.flash("info", "Bye Bye");
  req.session.destroy();
  return res.redirect("/");
};

exports.logout = logout;

var getJoin = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var userList;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _user["default"].find().populate("department");

          case 2:
            userList = _context2.sent;
            return _context2.abrupt("return", res.render("join", {
              pageTitle: "회원관리",
              userList: userList
            }));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getJoin(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getJoin = getJoin;

var getJoinAdd = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var partList, userList;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _department["default"].find().sort({
              order: 1
            });

          case 2:
            partList = _context3.sent;
            _context3.next = 5;
            return _user["default"].find();

          case 5:
            userList = _context3.sent;
            console.log("partList = ");
            console.log(partList);
            return _context3.abrupt("return", res.render("joinAdd", {
              pageTitle: "회원등록",
              partList: partList,
              userList: userList
            }));

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getJoinAdd(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getJoinAdd = getJoinAdd;

var getJoinUpdate = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var id, partList, user;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _context4.next = 3;
            return _department["default"].find().sort({
              order: 1
            });

          case 3:
            partList = _context4.sent;
            _context4.next = 6;
            return _user["default"].findById(id);

          case 6:
            user = _context4.sent;
            return _context4.abrupt("return", res.render("joinUpdate", {
              pageTitle: "회원수정",
              partList: partList,
              user: user
            }));

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getJoinUpdate(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getJoinUpdate = getJoinUpdate;

var postJoinAdd = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var partList, userList, _req$body2, name, email, password, password2, partId, color, pageTitle, department, exists, userId;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _department["default"].find().sort({
              order: 1
            });

          case 2:
            partList = _context5.sent;
            _context5.next = 5;
            return _user["default"].find();

          case 5:
            userList = _context5.sent;
            _req$body2 = req.body, name = _req$body2.name, email = _req$body2.email, password = _req$body2.password, password2 = _req$body2.password2, partId = _req$body2.partId, color = _req$body2.color;
            pageTitle = "회원등록";

            if (!(password !== password2)) {
              _context5.next = 10;
              break;
            }

            return _context5.abrupt("return", res.status(400).render("join", {
              pageTitle: pageTitle,
              errorMessage: "비밀번호가 맞지 않습니다.",
              partList: partList,
              userList: userList
            }));

          case 10:
            _context5.next = 12;
            return _user["default"].find({
              email: email
            });

          case 12:
            exists = _context5.sent;

            if (!(exists.length > 0)) {
              _context5.next = 15;
              break;
            }

            return _context5.abrupt("return", res.status(400).render("join", {
              pageTitle: pageTitle,
              errorMessage: "이메일이 이미 존재합니다.",
              partList: partList,
              userList: userList
            }));

          case 15:
            _context5.prev = 15;
            _context5.next = 18;
            return _user["default"].create({
              name: name,
              email: email,
              password: password,
              department: partId,
              color: color
            });

          case 18:
            userId = _context5.sent;

            if (!partId) {
              _context5.next = 25;
              break;
            }

            _context5.next = 22;
            return _department["default"].findById(partId);

          case 22:
            department = _context5.sent;
            // console.log("join:"+userId._id);
            // console.log(department);
            // console.log('-------------department');
            department.user.push(userId._id);
            department.save();

          case 25:
            return _context5.abrupt("return", res.redirect("/join"));

          case 28:
            _context5.prev = 28;
            _context5.t0 = _context5["catch"](15);
            return _context5.abrupt("return", res.status(400).render("join", {
              pageTitle: "회원등록",
              errorMessage: _context5.t0._message,
              partList: partList,
              userList: userList
            }));

          case 31:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[15, 28]]);
  }));

  return function postJoinAdd(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.postJoinAdd = postJoinAdd;

var postJoinUpdate = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var partList, userList, _req$body3, id, name, oldEmail, email, password, password2, partId, color, pageTitle, department, exists, enPassword, userId;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _department["default"].find();

          case 2:
            partList = _context6.sent;
            _context6.next = 5;
            return _user["default"].find();

          case 5:
            userList = _context6.sent;
            _req$body3 = req.body, id = _req$body3.id, name = _req$body3.name, oldEmail = _req$body3.oldEmail, email = _req$body3.email, password = _req$body3.password, password2 = _req$body3.password2, partId = _req$body3.partId, color = _req$body3.color;
            console.log("color~~~~ : " + color);
            pageTitle = "회원수정";

            if (!(password !== password2)) {
              _context6.next = 11;
              break;
            }

            return _context6.abrupt("return", res.status(400).render("join", {
              pageTitle: pageTitle,
              errorMessage: "비밀번호가 맞지 않습니다.",
              partList: partList,
              userList: userList
            }));

          case 11:
            if (!(oldEmail !== email)) {
              _context6.next = 17;
              break;
            }

            _context6.next = 14;
            return _user["default"].find({
              email: email
            });

          case 14:
            exists = _context6.sent;

            if (!(exists.length > 0)) {
              _context6.next = 17;
              break;
            }

            return _context6.abrupt("return", res.status(400).render("join", {
              pageTitle: pageTitle,
              errorMessage: "이메일이 이미 존재합니다.",
              partList: partList,
              userList: userList
            }));

          case 17:
            _context6.prev = 17;
            _context6.next = 20;
            return _bcrypt["default"].hash(password, 5);

          case 20:
            enPassword = _context6.sent;
            _context6.next = 23;
            return _user["default"].updateOne({
              _id: id
            }, {
              $set: {
                name: name,
                email: email,
                password: enPassword,
                department: partId,
                color: color
              }
            });

          case 23:
            userId = _context6.sent;

            if (!partId) {
              _context6.next = 30;
              break;
            }

            _context6.next = 27;
            return _department["default"].findById(partId);

          case 27:
            department = _context6.sent;
            // console.log("join:"+userId._id);
            // console.log(department);
            // console.log('-------------department');
            department.user.push(userId._id);
            department.save();

          case 30:
            return _context6.abrupt("return", res.redirect("/join"));

          case 33:
            _context6.prev = 33;
            _context6.t0 = _context6["catch"](17);
            return _context6.abrupt("return", res.status(400).render("join", {
              pageTitle: "회원수정",
              errorMessage: _context6.t0._message,
              partList: partList,
              userList: userList
            }));

          case 36:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[17, 33]]);
  }));

  return function postJoinUpdate(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.postJoinUpdate = postJoinUpdate;