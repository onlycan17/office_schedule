"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subMenuAuthAdd = exports.getSubMenuDelete = exports.postAddSubMenu = exports.getMenuDetail = exports.postAddMenu = exports.getDeleteMenu = exports.getAddMenu = exports.getMenu = void 0;

var _regeneratorRuntime = require("regenerator-runtime");

var _department = _interopRequireDefault(require("../schema/department"));

var _menu3 = _interopRequireDefault(require("../schema/menu"));

var _user = _interopRequireDefault(require("../schema/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getMenu = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var menuList, departmentList, userList;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _menu3["default"].find().populate({
              path: "user"
            }).populate({
              path: "department"
            });

          case 2:
            menuList = _context.sent;
            console.log(menuList);
            _context.next = 6;
            return _department["default"].find();

          case 6:
            departmentList = _context.sent;
            _context.next = 9;
            return _user["default"].find();

          case 9:
            userList = _context.sent;
            return _context.abrupt("return", res.render("menu", {
              pageTitle: "메뉴관리",
              menuList: menuList,
              departmentList: departmentList,
              userList: userList
            }));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getMenu(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getMenu = getMenu;

var getAddMenu = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var departmentList, userList;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _department["default"].find();

          case 2:
            departmentList = _context2.sent;
            _context2.next = 5;
            return _user["default"].find();

          case 5:
            userList = _context2.sent;
            return _context2.abrupt("return", res.render("menuAdd", {
              pageTitle: "메뉴등록",
              departmentList: departmentList,
              userList: userList
            }));

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getAddMenu(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getAddMenu = getAddMenu;

var getDeleteMenu = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var id, checkMenu, departmentList, userList, menuList;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _context4.next = 3;
            return _menu3["default"].findById(id).populate("subMenu");

          case 3:
            checkMenu = _context4.sent;
            _context4.next = 6;
            return _department["default"].find();

          case 6:
            departmentList = _context4.sent;
            _context4.next = 9;
            return _user["default"].find();

          case 9:
            userList = _context4.sent;
            _context4.next = 12;
            return _menu3["default"].find().populate({
              path: "user"
            }).populate({
              path: "department"
            });

          case 12:
            menuList = _context4.sent;

            if (!checkMenu.subMenu) {
              _context4.next = 16;
              break;
            }

            if (!(checkMenu.subMenu.length > 0)) {
              _context4.next = 16;
              break;
            }

            return _context4.abrupt("return", res.status(404).render("menu", {
              pageTitle: "하위메뉴가 남아있어서 삭제할 수 없습니다.",
              errorMessage: "하위메뉴가 남아있어서 삭제할 수 없습니다.",
              menuList: menuList,
              departmentList: departmentList,
              userList: userList
            }));

          case 16:
            if (checkMenu.user) {
              checkMenu.user.forEach( /*#__PURE__*/function () {
                var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(element) {
                  return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          _context3.next = 2;
                          return _user["default"].updateMany({
                            _id: element
                          }, {
                            $set: {
                              menu: null
                            }
                          });

                        case 2:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3);
                }));

                return function (_x7) {
                  return _ref4.apply(this, arguments);
                };
              }());
            }

            _context4.next = 19;
            return _menu3["default"].findByIdAndDelete(id);

          case 19:
            return _context4.abrupt("return", res.redirect("/menu"));

          case 20:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getDeleteMenu(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getDeleteMenu = getDeleteMenu;

var postAddMenu = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var _req$body, menuName, menuUrl, order, userId, departmentId, _menu, user, department, menuList, departmentList, userList;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            console.log(req.body);
            _req$body = req.body, menuName = _req$body.menuName, menuUrl = _req$body.menuUrl, order = _req$body.order, userId = _req$body.userId, departmentId = _req$body.departmentId;
            _context5.prev = 2;
            _context5.next = 5;
            return _menu3["default"].create({
              menuName: menuName,
              menuUrl: menuUrl,
              order: order,
              user: userId ? userId : null,
              department: departmentId ? departmentId : null
            });

          case 5:
            _menu = _context5.sent;

            if (!userId) {
              _context5.next = 12;
              break;
            }

            _context5.next = 9;
            return _user["default"].findById(userId);

          case 9:
            user = _context5.sent;
            user.menu.push(_menu._id);
            user.save();

          case 12:
            if (!departmentId) {
              _context5.next = 18;
              break;
            }

            _context5.next = 15;
            return _department["default"].findById(departmentId);

          case 15:
            department = _context5.sent;
            department.menu.push(_menu._id);
            department.save();

          case 18:
            _menu.save();

            return _context5.abrupt("return", res.redirect("/menu"));

          case 22:
            _context5.prev = 22;
            _context5.t0 = _context5["catch"](2);
            _context5.next = 26;
            return _menu3["default"].find().populate({
              path: "user"
            }).populate({
              path: "department"
            });

          case 26:
            menuList = _context5.sent;
            _context5.next = 29;
            return _department["default"].find();

          case 29:
            departmentList = _context5.sent;
            _context5.next = 32;
            return _user["default"].find();

          case 32:
            userList = _context5.sent;
            console.log(_context5.t0);
            return _context5.abrupt("return", res.status(400).render("menu", {
              pageTitle: "menu 등록",
              errorMessage: _context5.t0._message,
              menuList: menuList,
              departmentList: departmentList,
              userList: userList
            }));

          case 35:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[2, 22]]);
  }));

  return function postAddMenu(_x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}();

exports.postAddMenu = postAddMenu;

var getMenuDetail = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var id, menucheck, departmentList, userList, subMenuDetail;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            console.log("---------getMenuDetail------------");
            console.log(req.params);
            id = req.params.id;
            _context6.next = 5;
            return _menu3["default"].findById(id);

          case 5:
            menucheck = _context6.sent;
            _context6.next = 8;
            return _department["default"].find();

          case 8:
            departmentList = _context6.sent;
            _context6.next = 11;
            return _user["default"].find();

          case 11:
            userList = _context6.sent;

            if (!menucheck.subMenu) {
              _context6.next = 17;
              break;
            }

            _context6.next = 15;
            return _menu3["default"].findById(id).populate({
              path: "subMenu",
              populate: {
                path: "user",
                select: "_id name email"
              }
            }).populate({
              path: "subMenu",
              populate: {
                path: "department",
                select: "_id name"
              }
            }).populate({
              path: "department"
            }).populate({
              path: "user"
            });

          case 15:
            subMenuDetail = _context6.sent;
            console.log(subMenuDetail);

          case 17:
            console.log(res);
            return _context6.abrupt("return", res.render("menuDetail", {
              pageTitle: "서브메뉴관리",
              subMenuDetail: subMenuDetail,
              userList: userList,
              departmentList: departmentList,
              menucheck: menucheck
            }));

          case 19:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function getMenuDetail(_x10, _x11) {
    return _ref6.apply(this, arguments);
  };
}(); // export const getAddSubMenu = async(req,res) => {
//   console.log(req.params);
//   const {id} = req.params;
//   const departmentList = await Department.find();
//   const userList = await User.find();
//   console.log(res);
//   return res.render("subMenuAdd", {
//     pageTitle: "서브메뉴등록",
//     id,
//     departmentList,
//     userList,
//   }); 
// }


exports.getMenuDetail = getMenuDetail;

var postAddSubMenu = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var _req$body2, subMenuName, subMenuUrl, order, userId, departmentId, id, menudetailObj, checkSubMenu, _menucheck, departmentList, userList, subMenuDetail, user, department, submenuLength, _departmentList, _userList, _subMenuDetail;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _req$body2 = req.body, subMenuName = _req$body2.subMenuName, subMenuUrl = _req$body2.subMenuUrl, order = _req$body2.order, userId = _req$body2.userId, departmentId = _req$body2.departmentId;
            id = req.params.id; //console.log(req.body);
            //console.log(req.params);

            _context7.prev = 2;
            _context7.next = 5;
            return _menu3["default"].findOne({
              _id: id,
              subMenu: _defineProperty({
                $elemMatch: {
                  subMenuName: subMenuName
                }
              }, "$elemMatch", {
                order: order
              })
            });

          case 5:
            checkSubMenu = _context7.sent;
            console.log(checkSubMenu);

            if (!checkSubMenu) {
              _context7.next = 23;
              break;
            }

            _context7.next = 10;
            return _menu3["default"].findById(id);

          case 10:
            _menucheck = _context7.sent;
            _context7.next = 13;
            return _department["default"].find();

          case 13:
            departmentList = _context7.sent;
            _context7.next = 16;
            return _user["default"].find();

          case 16:
            userList = _context7.sent;

            if (!_menucheck.subMenu) {
              _context7.next = 21;
              break;
            }

            _context7.next = 20;
            return _menu3["default"].findById(id).populate(_defineProperty({
              path: "subMenu",
              populate: {
                path: "department"
              }
            }, "populate", {
              path: "user",
              select: "_id name email"
            }));

          case 20:
            subMenuDetail = _context7.sent;

          case 21:
            console.log("------?------");
            return _context7.abrupt("return", res.status(404).render("menuDetail", {
              pageTitle: "메뉴등록 상세페이지",
              errorMessage: "이미 등록된 메뉴정보(메뉴명,정렬순서) 입니다.",
              departmentList: departmentList,
              userList: userList,
              menucheck: _menucheck,
              subMenuDetail: subMenuDetail
            }));

          case 23:
            if (!id) {
              _context7.next = 29;
              break;
            }

            _context7.next = 26;
            return _menu3["default"].findById(id);

          case 26:
            _context7.t0 = _context7.sent;
            _context7.next = 30;
            break;

          case 29:
            _context7.t0 = null;

          case 30:
            menudetailObj = _context7.t0;

            if (!userId) {
              _context7.next = 37;
              break;
            }

            _context7.next = 34;
            return _user["default"].findById(userId);

          case 34:
            _context7.t1 = _context7.sent;
            _context7.next = 38;
            break;

          case 37:
            _context7.t1 = null;

          case 38:
            user = _context7.t1;

            if (!departmentId) {
              _context7.next = 45;
              break;
            }

            _context7.next = 42;
            return _department["default"].findById(departmentId);

          case 42:
            _context7.t2 = _context7.sent;
            _context7.next = 46;
            break;

          case 45:
            _context7.t2 = null;

          case 46:
            department = _context7.t2;
            //console.log(department);
            menudetailObj.subMenu.push({
              subMenuName: subMenuName,
              subMenuUrl: subMenuUrl,
              order: order
            });
            submenuLength = menudetailObj.subMenu.length; //console.log(submenuLength);
            //console.log(menudetailObj.subMenu[submenuLength-1]);

            if (department) {
              menudetailObj.subMenu[submenuLength - 1].department.push(department._id);
              department.menu.push(menudetailObj.subMenu[submenuLength - 1]._id);
            }

            if (user) {
              menudetailObj.subMenu[submenuLength - 1].user.push(user._id);
              user.menu.push(menudetailObj.subMenu[submenuLength - 1]._id);
            }

            menudetailObj.save(); //console.log('---test---');
            //console.log(menudetailObj);

            return _context7.abrupt("return", res.redirect("/menuDetail/" + id));

          case 55:
            _context7.prev = 55;
            _context7.t3 = _context7["catch"](2);
            console.log(_context7.t3);
            _context7.next = 60;
            return _department["default"].find();

          case 60:
            _departmentList = _context7.sent;
            _context7.next = 63;
            return _user["default"].find();

          case 63:
            _userList = _context7.sent;

            if (!menucheck.subMenu) {
              _context7.next = 68;
              break;
            }

            _context7.next = 67;
            return _menu3["default"].findById(id).populate(_defineProperty({
              path: "subMenu",
              populate: {
                path: "department"
              }
            }, "populate", {
              path: "user",
              select: "_id name email"
            }));

          case 67:
            _subMenuDetail = _context7.sent;

          case 68:
            console.log("--------------------------");
            console.log(_subMenuDetail);
            return _context7.abrupt("return", res.status(400).render("menuDetail", {
              pageTitle: "menu 등록 상세페이지",
              errorMessage: _context7.t3._message,
              menucheck: menudetailObj,
              departmentList: _departmentList,
              userList: _userList,
              subMenuDetail: _subMenuDetail
            }));

          case 71:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[2, 55]]);
  }));

  return function postAddSubMenu(_x12, _x13) {
    return _ref7.apply(this, arguments);
  };
}();

exports.postAddSubMenu = postAddSubMenu;

var getSubMenuDelete = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var _req$params, menuId, subMenuId, _menu2, user, departmentList, userList, subMenuDetail;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _req$params = req.params, menuId = _req$params.menuId, subMenuId = _req$params.subMenuId;
            _context8.prev = 1;
            _context8.next = 4;
            return _menu3["default"].findById(menuId).populate("subMenu");

          case 4:
            _menu2 = _context8.sent;

            _menu2.subMenu.pull(subMenuId);

            _menu2.save();

            _context8.next = 9;
            return _user["default"].findById();

          case 9:
            user = _context8.sent;
            return _context8.abrupt("return", res.redirect("/menuDetail/" + menuId));

          case 13:
            _context8.prev = 13;
            _context8.t0 = _context8["catch"](1);
            _context8.next = 17;
            return _department["default"].find();

          case 17:
            departmentList = _context8.sent;
            _context8.next = 20;
            return _user["default"].find();

          case 20:
            userList = _context8.sent;

            if (!menucheck.subMenu) {
              _context8.next = 26;
              break;
            }

            _context8.next = 24;
            return _menu3["default"].findById(menuId).populate(_defineProperty({
              path: "subMenu",
              populate: {
                path: "department"
              }
            }, "populate", {
              path: "user",
              select: "_id name email"
            }));

          case 24:
            subMenuDetail = _context8.sent;
            return _context8.abrupt("return", res.status(400).render("menuDetail", {
              pageTitle: "menu 등록 상세페이지",
              errorMessage: _context8.t0._message,
              menucheck: menu,
              departmentList: departmentList,
              userList: userList,
              subMenuDetail: subMenuDetail
            }));

          case 26:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[1, 13]]);
  }));

  return function getSubMenuDelete(_x14, _x15) {
    return _ref8.apply(this, arguments);
  };
}();

exports.getSubMenuDelete = getSubMenuDelete;

var subMenuAuthAdd = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
    var _req$body3, menuId, subMenuId, idx, userId, departmentId, menu, user, department;

    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            console.log("subMenuAuthAdd");
            console.log(req.body);
            _req$body3 = req.body, menuId = _req$body3.menuId, subMenuId = _req$body3.subMenuId, idx = _req$body3.idx, userId = _req$body3.userId, departmentId = _req$body3.departmentId;
            _context9.next = 5;
            return _menu3["default"].findById(menuId).populate(subMenuId);

          case 5:
            menu = _context9.sent;

            if (!userId) {
              _context9.next = 12;
              break;
            }

            menu.subMenu[idx].user.push(userId);
            _context9.next = 10;
            return _user["default"].findById(userId);

          case 10:
            user = _context9.sent;
            user.menu.push(menu.subMenu[idx]._id);

          case 12:
            if (!departmentId) {
              _context9.next = 18;
              break;
            }

            menu.subMenu[idx].department.push(departmentId);
            _context9.next = 16;
            return _department["default"].findById(departmentId);

          case 16:
            department = _context9.sent;
            department.menu.push(menu.subMenu[idx]._id);

          case 18:
            menu.save();
            res.json({
              message: "success"
            });

          case 20:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function subMenuAuthAdd(_x16, _x17) {
    return _ref9.apply(this, arguments);
  };
}();

exports.subMenuAuthAdd = subMenuAuthAdd;