"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDeleteDepartmentDetail = exports.postDepartmentDetail = exports.getDepartmentDetail = exports.deleteDepartment = exports.postDepartmentAdd = exports.getDepartmentAdd = exports.getDepartment = void 0;

var _user = _interopRequireDefault(require("../schema/user"));

var _department = _interopRequireDefault(require("../schema/department"));

var _regeneratorRuntime = require("regenerator-runtime");

var _mongoose = require("mongoose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getDepartment = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var departments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _department["default"].find().populate("user");

          case 2:
            departments = _context.sent;
            console.log('getDepartment');
            console.log(departments);
            return _context.abrupt("return", res.render("department", {
              pageTitle: "부서관리 페이지",
              departments: departments
            }));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getDepartment(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getDepartment = getDepartment;

var getDepartmentAdd = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var userList;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _user["default"].find();

          case 2:
            userList = _context2.sent;
            return _context2.abrupt("return", res.render("departmentAdd", {
              pageTitle: "부서등록",
              userList: userList
            }));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getDepartmentAdd(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getDepartmentAdd = getDepartmentAdd;

var postDepartmentAdd = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$body, name, user, check, departments, userList, department;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, user = _req$body.user;
            _context3.next = 3;
            return _department["default"].findOne({
              name: name
            });

          case 3:
            check = _context3.sent;
            console.log(check);

            if (!check) {
              _context3.next = 13;
              break;
            }

            _context3.next = 8;
            return _department["default"].find().populate("user");

          case 8:
            departments = _context3.sent;
            _context3.next = 11;
            return _user["default"].find();

          case 11:
            userList = _context3.sent;
            return _context3.abrupt("return", res.status(404).render("department", {
              pageTitle: "부서등록",
              errorMessage: "이미 등록된 부서명 입니다.",
              departments: departments,
              userList: userList
            }));

          case 13:
            _context3.prev = 13;
            _context3.next = 16;
            return _department["default"].create({
              name: name,
              user: user ? user : null
            });

          case 16:
            department = _context3.sent;

            if (!user) {
              _context3.next = 20;
              break;
            }

            _context3.next = 20;
            return _user["default"].findByIdAndUpdate(user, {
              department: department._id
            });

          case 20:
            return _context3.abrupt("return", res.redirect("/department"));

          case 23:
            _context3.prev = 23;
            _context3.t0 = _context3["catch"](13);
            return _context3.abrupt("return", res.status(400).render("/department", {
              pageTitle: "부서등록",
              errorMessage: _context3.t0._message
            }));

          case 26:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[13, 23]]);
  }));

  return function postDepartmentAdd(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.postDepartmentAdd = postDepartmentAdd;

var deleteDepartment = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var id, depId;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;

            if (!id) {
              _context4.next = 7;
              break;
            }

            _context4.next = 4;
            return _department["default"].findByIdAndDelete(id);

          case 4:
            depId = _context4.sent;
            _context4.next = 8;
            break;

          case 7:
            return _context4.abrupt("return", res.status(404).render("404", {
              pageTitle: "부서가 존재하지 않습니다.",
              errorMessage: "부서가 존재하지 않습니다."
            }));

          case 8:
            _context4.next = 10;
            return _user["default"].updateMany({
              department: depId
            }, {
              $set: {
                department: null
              }
            });

          case 10:
            return _context4.abrupt("return", res.redirect("/department"));

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function deleteDepartment(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.deleteDepartment = deleteDepartment;

var getDepartmentDetail = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var id, detail, userList;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id; //console.log(req.params);

            _context5.next = 3;
            return _department["default"].findById(id).populate("user");

          case 3:
            detail = _context5.sent;
            _context5.next = 6;
            return _user["default"].find();

          case 6:
            userList = _context5.sent;
            return _context5.abrupt("return", res.render("departmentDetail", {
              pageTitle: "부서관리 상세페이지",
              detail: detail,
              userList: userList
            }));

          case 8:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function getDepartmentDetail(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getDepartmentDetail = getDepartmentDetail;

var postDepartmentDetail = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var _req$body2, name, userId, id, departmentObj, check, userObj, detail, userList;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _req$body2 = req.body, name = _req$body2.name, userId = _req$body2.userId;
            id = req.params.id;
            console.log(id);
            console.log('test!');
            console.log(req.body);

            if (name) {
              _context6.next = 7;
              break;
            }

            return _context6.abrupt("return", res.status(404).render("404", {
              pageTitle: "부서명이 존재하지 않습니다."
            }));

          case 7:
            _context6.prev = 7;
            _context6.next = 10;
            return _department["default"].findByIdAndUpdate(id, {
              name: name
            });

          case 10:
            departmentObj = _context6.sent;
            _context6.next = 13;
            return _department["default"].find({
              _id: id,
              user: {
                $eq: userId
              }
            });

          case 13:
            check = _context6.sent;

            if (!(check.length > 0)) {
              _context6.next = 18;
              break;
            }

            return _context6.abrupt("return", res.redirect("/departmentDetail/" + id));

          case 18:
            _context6.next = 20;
            return _user["default"].findByIdAndUpdate(userId, {
              department: departmentObj._id
            });

          case 20:
            userObj = _context6.sent;
            departmentObj.user.push(userObj._id);
            departmentObj.save();
            return _context6.abrupt("return", res.redirect("/departmentDetail/" + id));

          case 24:
            _context6.next = 35;
            break;

          case 26:
            _context6.prev = 26;
            _context6.t0 = _context6["catch"](7);
            _context6.next = 30;
            return _department["default"].findById(id).populate("user");

          case 30:
            detail = _context6.sent;
            _context6.next = 33;
            return _user["default"].find();

          case 33:
            userList = _context6.sent;
            return _context6.abrupt("return", res.status(400).render("departmentDetail", {
              pageTitle: "부서등록상세페이지",
              errorMessage: _context6.t0._message,
              detail: detail,
              userList: userList
            }));

          case 35:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[7, 26]]);
  }));

  return function postDepartmentDetail(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.postDepartmentDetail = postDepartmentDetail;

var getDeleteDepartmentDetail = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var _req$params, departmentId, userId, user, department, detail, userList;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _req$params = req.params, departmentId = _req$params.departmentId, userId = _req$params.userId;
            console.log(req.params);
            _context7.prev = 2;
            _context7.next = 5;
            return _user["default"].findByIdAndUpdate(userId, {
              department: null
            });

          case 5:
            user = _context7.sent;
            console.log(user);
            _context7.next = 9;
            return _department["default"].findById(departmentId);

          case 9:
            department = _context7.sent;
            department.user.pull(userId);
            department.save();
            console.log(department);
            return _context7.abrupt("return", res.redirect("/departmentDetail/" + departmentId));

          case 16:
            _context7.prev = 16;
            _context7.t0 = _context7["catch"](2);
            _context7.next = 20;
            return _department["default"].findById(departmentId).populate("user");

          case 20:
            detail = _context7.sent;
            _context7.next = 23;
            return _user["default"].find();

          case 23:
            userList = _context7.sent;
            return _context7.abrupt("return", res.status(400).render("departmentDetail", {
              pageTitle: "부서등록상세페이지",
              errorMessage: _context7.t0._message,
              detail: detail,
              userList: userList
            }));

          case 25:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[2, 16]]);
  }));

  return function getDeleteDepartmentDetail(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.getDeleteDepartmentDetail = getDeleteDepartmentDetail;