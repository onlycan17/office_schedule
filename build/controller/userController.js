"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postLogin = exports.postJoinUserUpdate = exports.postJoinUpdate = exports.postJoinAdd = exports.logout = exports.joinList = exports.getLogin = exports.getJoinUserUpdate = exports.getJoinUpdate = exports.getJoinForm = exports.getJoinAdd = void 0;

var _user = _interopRequireDefault(require("../schema/user"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _regeneratorRuntime = require("regenerator-runtime");

var _department = _interopRequireDefault(require("../schema/department"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _menu = _interopRequireDefault(require("../schema/menu"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ObjectId = require("mongoose").Types.ObjectId;

var getLogin = function getLogin(req, res) {
  return res.render("login", {
    pageTitle: "Login"
  });
};

exports.getLogin = getLogin;

var postLogin = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var pageTitle, _req$body, email, password, user, ok, menu, objOrder;

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
            return _bcryptjs["default"].compareSync(password, user.password);

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
            _context.next = 15;
            return _menu["default"].find().populate("subMenu");

          case 15:
            menu = _context.sent;
            menu.forEach(function (menu) {
              menu.subMenu.forEach(function (subMenu) {
                subMenu === null || subMenu === void 0 ? void 0 : subMenu.department.forEach(function (dep) {
                  var _user$department, _user$department2;

                  console.log(dep._id);
                  console.log("-------------");
                  console.log(user === null || user === void 0 ? void 0 : (_user$department = user.department) === null || _user$department === void 0 ? void 0 : _user$department._id);

                  if (subMenu.subMenuUrl === "/schedule" && dep._id + "" === (user === null || user === void 0 ? void 0 : (_user$department2 = user.department) === null || _user$department2 === void 0 ? void 0 : _user$department2._id) + "") {
                    console.log("test----------");
                    objOrder = subMenu.order;
                  }
                });
              });
            });
            console.log("order -- " + objOrder);
            console.log(user);
            req.session.loggedIn = true;
            req.session.user = user;
            console.log("부서확인");
            console.log(user.department._id);
            req.flash("info", "로그인 성공!");

            if (!(user.department._id + "" === "612490cc21f010838f50a41b")) {
              _context.next = 28;
              break;
            }

            return _context.abrupt("return", res.redirect("/home"));

          case 28:
            return _context.abrupt("return", res.redirect("/schedule?order=" + objOrder));

          case 29:
            _context.next = 34;
            break;

          case 31:
            _context.prev = 31;
            _context.t0 = _context["catch"](2);
            return _context.abrupt("return", res.sendStatus(404));

          case 34:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 31]]);
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

var getJoinForm = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var partList;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _department["default"].find().sort({
              order: 1
            });

          case 2:
            partList = _context2.sent;
            return _context2.abrupt("return", res.render("join", {
              pageTitle: "회원관리",
              partList: partList
            }));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getJoinForm(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getJoinForm = getJoinForm;

var joinList = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$body2, start, draw, length, order, userName, email, departmentId, thisOrder, userCount, userList, departmentObj;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body2 = req.body, start = _req$body2.start, draw = _req$body2.draw, length = _req$body2.length, order = _req$body2.order, userName = _req$body2.userName, email = _req$body2.email, departmentId = _req$body2.departmentId; // let dirTemp;
            // if (order[0].dir === "desc") {
            //   dirTemp = -1;
            // } else {
            //   dirTemp = 1;
            // }

            if (order[0].column === '0' && order[0].dir === 'desc') {
              thisOrder = -1;
            } else if (order[0].column === '0' && order[0].dir === 'asc') {
              thisOrder = 1;
            } else {
              thisOrder = 1;
            }

            if (!departmentId) {
              _context3.next = 11;
              break;
            }

            _context3.next = 5;
            return _user["default"].find({
              department: new ObjectId(departmentId),
              name: {
                $regex: ".*" + userName + ".*"
              },
              email: {
                $regex: ".*" + email + ".*"
              }
            }).countDocuments();

          case 5:
            userCount = _context3.sent;
            _context3.next = 8;
            return _user["default"].find({
              department: new ObjectId(departmentId),
              name: {
                $regex: ".*" + userName + ".*"
              },
              email: {
                $regex: ".*" + email + ".*"
              }
            }).skip(Number(start)).limit(Number(length)).sort({
              name: thisOrder
            }).populate({
              path: "department"
            });

          case 8:
            userList = _context3.sent;
            _context3.next = 18;
            break;

          case 11:
            _context3.next = 13;
            return _user["default"].find({
              name: {
                $regex: ".*" + userName + ".*"
              },
              email: {
                $regex: ".*" + email + ".*"
              }
            }).countDocuments();

          case 13:
            userCount = _context3.sent;
            _context3.next = 16;
            return _user["default"].find({
              name: {
                $regex: ".*" + userName + ".*"
              },
              email: {
                $regex: ".*" + email + ".*"
              }
            }).skip(Number(start)).limit(Number(length)).sort({
              name: thisOrder
            }).populate({
              path: "department"
            });

          case 16:
            userList = _context3.sent;
            ;

          case 18:
            _context3.next = 20;
            return _department["default"].find();

          case 20:
            departmentObj = _context3.sent;
            //let userObjArry = new Array();
            userList.forEach(function (element, idx) {
              departmentObj.forEach(function (depElement) {
                // console.log('----test------')
                // console.log(typeof element.department._id);
                console.log(element);

                if (element.department._id + "" === depElement._id + "") {
                  // console.log('success----------');
                  // console.log(depElement.name);
                  element._doc.departmentName = depElement.name;
                  console.log(); //userObjArry.push({...element});
                }
              });
            }); //console.log(userObjArry);

            console.log(order);

            if (order[0].column === '2') {
              if (order[0].dir === "desc") {
                console.log('desc');
                userList.sort(function (a, b) {
                  console.log('departmentName--------');
                  console.log(a);
                  console.log(b);
                  var upperCaseA = a._doc.departmentName;
                  var upperCaseB = b._doc.departmentName;
                  if (upperCaseA < upperCaseB) return 1;
                  if (upperCaseA > upperCaseB) return -1;
                  if (upperCaseA === upperCaseB) return 0;
                });
              } else {
                console.log('asc');
                userList.sort(function (a, b) {
                  var upperCaseA = a._doc.departmentName;
                  var upperCaseB = b._doc.departmentName;
                  if (upperCaseA > upperCaseB) return 1;
                  if (upperCaseA < upperCaseB) return -1;
                  if (upperCaseA === upperCaseB) return 0;
                });
              }
            } //console.log(userList);


            return _context3.abrupt("return", res.status(200).json({
              draw: draw,
              start: start,
              recordsTotal: userCount,
              recordsFiltered: userCount,
              data: userList
            }));

          case 25:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function joinList(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.joinList = joinList;

var getJoinAdd = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var partList, userList;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _department["default"].find().sort({
              order: 1
            });

          case 2:
            partList = _context4.sent;
            _context4.next = 5;
            return _user["default"].find();

          case 5:
            userList = _context4.sent;
            console.log("partList = ");
            console.log(partList);
            return _context4.abrupt("return", res.render("joinAdd", {
              pageTitle: "회원등록",
              partList: partList,
              userList: userList
            }));

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getJoinAdd(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getJoinAdd = getJoinAdd;

var getJoinUpdate = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var id, partList, user;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _context5.next = 3;
            return _department["default"].find().sort({
              order: 1
            });

          case 3:
            partList = _context5.sent;
            _context5.next = 6;
            return _user["default"].findById(id);

          case 6:
            user = _context5.sent;
            return _context5.abrupt("return", res.render("joinUpdate", {
              pageTitle: "회원수정",
              partList: partList,
              user: user
            }));

          case 8:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function getJoinUpdate(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getJoinUpdate = getJoinUpdate;

var getJoinUserUpdate = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var id, partList, user, teamList;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id = req.params.id;
            _context6.next = 3;
            return _department["default"].find().sort({
              order: 1
            });

          case 3:
            partList = _context6.sent;
            _context6.next = 6;
            return _user["default"].findById(id);

          case 6:
            user = _context6.sent;
            //console.log(partList);
            teamList = partList.filter(function (dep) {
              return dep._id + "" === user.department + "";
            });
            console.log(user);
            return _context6.abrupt("return", res.render("joinUserUpdate", {
              pageTitle: "회원수정",
              teamList: teamList,
              user: user
            }));

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function getJoinUserUpdate(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.getJoinUserUpdate = getJoinUserUpdate;

var postJoinAdd = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var partList, userList, _req$body3, name, email, password, password2, partId, color, pageTitle, department, exists, userId;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _department["default"].find().sort({
              order: 1
            });

          case 2:
            partList = _context7.sent;
            _context7.next = 5;
            return _user["default"].find();

          case 5:
            userList = _context7.sent;
            _req$body3 = req.body, name = _req$body3.name, email = _req$body3.email, password = _req$body3.password, password2 = _req$body3.password2, partId = _req$body3.partId, color = _req$body3.color;
            pageTitle = "회원등록";

            if (!(password !== password2)) {
              _context7.next = 10;
              break;
            }

            return _context7.abrupt("return", res.status(400).render("join", {
              pageTitle: pageTitle,
              errorMessage: "비밀번호가 맞지 않습니다.",
              partList: partList,
              userList: userList
            }));

          case 10:
            _context7.next = 12;
            return _user["default"].find({
              email: email
            });

          case 12:
            exists = _context7.sent;

            if (!(exists.length > 0)) {
              _context7.next = 15;
              break;
            }

            return _context7.abrupt("return", res.status(400).render("join", {
              pageTitle: pageTitle,
              errorMessage: "이메일이 이미 존재합니다.",
              partList: partList,
              userList: userList
            }));

          case 15:
            _context7.prev = 15;
            _context7.next = 18;
            return _user["default"].create({
              name: name,
              email: email,
              password: password,
              department: partId,
              color: color
            });

          case 18:
            userId = _context7.sent;

            if (!partId) {
              _context7.next = 25;
              break;
            }

            _context7.next = 22;
            return _department["default"].findById(partId);

          case 22:
            department = _context7.sent;
            // console.log("join:"+userId._id);
            // console.log(department);
            // console.log('-------------department');
            department.user.push(userId._id);
            department.save();

          case 25:
            return _context7.abrupt("return", res.redirect("/join"));

          case 28:
            _context7.prev = 28;
            _context7.t0 = _context7["catch"](15);
            return _context7.abrupt("return", res.status(400).render("join", {
              pageTitle: "회원등록",
              errorMessage: _context7.t0._message,
              partList: partList,
              userList: userList
            }));

          case 31:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[15, 28]]);
  }));

  return function postJoinAdd(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.postJoinAdd = postJoinAdd;

var postJoinUpdate = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var partList, userList, _req$body4, id, name, oldEmail, email, password, password2, partId, color, pageTitle, department, exists, enPassword, userId;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _department["default"].find();

          case 2:
            partList = _context8.sent;
            _context8.next = 5;
            return _user["default"].find();

          case 5:
            userList = _context8.sent;
            _req$body4 = req.body, id = _req$body4.id, name = _req$body4.name, oldEmail = _req$body4.oldEmail, email = _req$body4.email, password = _req$body4.password, password2 = _req$body4.password2, partId = _req$body4.partId, color = _req$body4.color; //console.log("color~~~~ : " + color);

            pageTitle = "회원수정";

            if (!(password !== password2)) {
              _context8.next = 10;
              break;
            }

            return _context8.abrupt("return", res.status(400).render("join", {
              pageTitle: pageTitle,
              errorMessage: "비밀번호가 맞지 않습니다.",
              partList: partList,
              userList: userList
            }));

          case 10:
            if (!(oldEmail !== email)) {
              _context8.next = 16;
              break;
            }

            _context8.next = 13;
            return _user["default"].find({
              email: email
            });

          case 13:
            exists = _context8.sent;

            if (!(exists.length > 0)) {
              _context8.next = 16;
              break;
            }

            return _context8.abrupt("return", res.status(400).render("join", {
              pageTitle: pageTitle,
              errorMessage: "이메일이 이미 존재합니다.",
              partList: partList,
              userList: userList
            }));

          case 16:
            _context8.prev = 16;
            _context8.next = 19;
            return _bcryptjs["default"].hashSync(password, 5);

          case 19:
            enPassword = _context8.sent;
            _context8.next = 22;
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

          case 22:
            userId = _context8.sent;

            if (!partId) {
              _context8.next = 29;
              break;
            }

            _context8.next = 26;
            return _department["default"].findById(partId);

          case 26:
            department = _context8.sent;
            // console.log("join:"+userId._id);
            // console.log(department);
            // console.log('-------------department');
            department.user.push(userId._id);
            department.save();

          case 29:
            return _context8.abrupt("return", res.redirect("/join"));

          case 32:
            _context8.prev = 32;
            _context8.t0 = _context8["catch"](16);
            return _context8.abrupt("return", res.status(400).render("join", {
              pageTitle: "회원수정",
              errorMessage: _context8.t0._message,
              partList: partList,
              userList: userList
            }));

          case 35:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[16, 32]]);
  }));

  return function postJoinUpdate(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

exports.postJoinUpdate = postJoinUpdate;

var postJoinUserUpdate = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
    var partList, userList, _req$body5, id, name, oldEmail, email, password, password2, partId, color, pageTitle, department, exists, enPassword, userId;

    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return _department["default"].find();

          case 2:
            partList = _context9.sent;
            _context9.next = 5;
            return _user["default"].find();

          case 5:
            userList = _context9.sent;
            _req$body5 = req.body, id = _req$body5.id, name = _req$body5.name, oldEmail = _req$body5.oldEmail, email = _req$body5.email, password = _req$body5.password, password2 = _req$body5.password2, partId = _req$body5.partId, color = _req$body5.color;
            console.log("color~~~~ : " + color);
            pageTitle = "회원수정";

            if (!(password !== password2)) {
              _context9.next = 11;
              break;
            }

            return _context9.abrupt("return", res.status(400).render("join", {
              pageTitle: pageTitle,
              errorMessage: "비밀번호가 맞지 않습니다.",
              partList: partList,
              userList: userList
            }));

          case 11:
            if (!(oldEmail !== email)) {
              _context9.next = 17;
              break;
            }

            _context9.next = 14;
            return _user["default"].find({
              email: email
            });

          case 14:
            exists = _context9.sent;

            if (!(exists.length > 0)) {
              _context9.next = 17;
              break;
            }

            return _context9.abrupt("return", res.status(400).render("join", {
              pageTitle: pageTitle,
              errorMessage: "이메일이 이미 존재합니다.",
              partList: partList,
              userList: userList
            }));

          case 17:
            _context9.prev = 17;
            _context9.next = 20;
            return _bcryptjs["default"].hashSync(password, 5);

          case 20:
            enPassword = _context9.sent;
            _context9.next = 23;
            return _user["default"].updateOne({
              _id: id
            }, {
              $set: {
                name: name,
                email: email,
                password: enPassword,
                //department: partId,
                color: color
              }
            });

          case 23:
            userId = _context9.sent;
            return _context9.abrupt("return", res.redirect("/logout"));

          case 27:
            _context9.prev = 27;
            _context9.t0 = _context9["catch"](17);
            return _context9.abrupt("return", res.status(400).render("join", {
              pageTitle: "회원수정",
              errorMessage: _context9.t0._message,
              partList: partList,
              userList: userList
            }));

          case 30:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[17, 27]]);
  }));

  return function postJoinUserUpdate(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

exports.postJoinUserUpdate = postJoinUserUpdate;