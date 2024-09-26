"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subMenuAuthAdd = exports.postAddSubMenu = exports.postAddMenu = exports.getSubMenuDelete = exports.getMenuDetail = exports.getMenu = exports.getDeleteMenu = exports.getAddMenu = void 0;
var _regeneratorRuntime2 = require("regenerator-runtime");
var _department = _interopRequireDefault(require("../schema/department"));
var _menu3 = _interopRequireDefault(require("../schema/menu"));
var _user = _interopRequireDefault(require("../schema/user"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var getMenu = exports.getMenu = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var menuList, departmentList, userList;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _menu3["default"].find().populate({
            path: "user"
          }).populate({
            path: "department",
            options: {
              sort: "order"
            }
          }).sort("order");
        case 2:
          menuList = _context.sent;
          _context.next = 5;
          return _department["default"].find().sort("order");
        case 5:
          departmentList = _context.sent;
          _context.next = 8;
          return _user["default"].find();
        case 8:
          userList = _context.sent;
          return _context.abrupt("return", res.render("menu", {
            pageTitle: "메뉴관리",
            menuList: menuList,
            departmentList: departmentList,
            userList: userList
          }));
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function getMenu(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getAddMenu = exports.getAddMenu = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var departmentList, userList;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _department["default"].find().sort("order");
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
    }, _callee2);
  }));
  return function getAddMenu(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var getDeleteMenu = exports.getDeleteMenu = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var id, checkMenu, departmentList, userList, menuList;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          _context4.next = 3;
          return _menu3["default"].findById(id).populate("subMenu");
        case 3:
          checkMenu = _context4.sent;
          _context4.next = 6;
          return _department["default"].find().sort("order");
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
            checkMenu.user.forEach(/*#__PURE__*/function () {
              var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(element) {
                return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                  while (1) switch (_context3.prev = _context3.next) {
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
    }, _callee4);
  }));
  return function getDeleteMenu(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var postAddMenu = exports.postAddMenu = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var _req$body, menuName, menuUrl, order, userId, departmentId, _menu, user, department, menuList, departmentList, userList;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          //console.log(req.body);
          _req$body = req.body, menuName = _req$body.menuName, menuUrl = _req$body.menuUrl, order = _req$body.order, userId = _req$body.userId, departmentId = _req$body.departmentId;
          _context5.prev = 1;
          _context5.next = 4;
          return _menu3["default"].create({
            menuName: menuName,
            menuUrl: menuUrl,
            order: order,
            user: userId ? userId : null,
            department: departmentId ? departmentId : null
          });
        case 4:
          _menu = _context5.sent;
          if (!userId) {
            _context5.next = 11;
            break;
          }
          _context5.next = 8;
          return _user["default"].findById(userId);
        case 8:
          user = _context5.sent;
          user.menu.push(_menu._id);
          user.save();
        case 11:
          if (!departmentId) {
            _context5.next = 17;
            break;
          }
          _context5.next = 14;
          return _department["default"].findById(departmentId);
        case 14:
          department = _context5.sent;
          department.menu.push(_menu._id);
          department.save();
        case 17:
          _menu.save();
          return _context5.abrupt("return", res.redirect("/menu"));
        case 21:
          _context5.prev = 21;
          _context5.t0 = _context5["catch"](1);
          _context5.next = 25;
          return _menu3["default"].find().populate({
            path: "user"
          }).populate({
            path: "department"
          });
        case 25:
          menuList = _context5.sent;
          _context5.next = 28;
          return _department["default"].find().sort("order");
        case 28:
          departmentList = _context5.sent;
          _context5.next = 31;
          return _user["default"].find();
        case 31:
          userList = _context5.sent;
          return _context5.abrupt("return", res.status(400).render("menu", {
            pageTitle: "menu 등록",
            errorMessage: _context5.t0._message,
            menuList: menuList,
            departmentList: departmentList,
            userList: userList
          }));
        case 33:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1, 21]]);
  }));
  return function postAddMenu(_x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}();
var getMenuDetail = exports.getMenuDetail = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var id, menucheck, departmentList, userList, subMenuDetail;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          //console.log("---------getMenuDetail------------");
          //console.log(req.params);
          id = req.params.id;
          _context6.next = 3;
          return _menu3["default"].findById(id);
        case 3:
          menucheck = _context6.sent;
          _context6.next = 6;
          return _department["default"].find().sort("order");
        case 6:
          departmentList = _context6.sent;
          _context6.next = 9;
          return _user["default"].find();
        case 9:
          userList = _context6.sent;
          if (!menucheck.subMenu) {
            _context6.next = 14;
            break;
          }
          _context6.next = 13;
          return _menu3["default"].findById(id).populate({
            path: "subMenu",
            sort: "order",
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
            path: "department",
            sort: "order"
          }).populate({
            path: "user"
          });
        case 13:
          subMenuDetail = _context6.sent;
        case 14:
          return _context6.abrupt("return", res.render("menuDetail", {
            pageTitle: "서브메뉴관리",
            subMenuDetail: subMenuDetail,
            userList: userList,
            departmentList: departmentList,
            menucheck: menucheck
          }));
        case 15:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function getMenuDetail(_x10, _x11) {
    return _ref6.apply(this, arguments);
  };
}();

// export const getAddSubMenu = async(req,res) => {
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

var postAddSubMenu = exports.postAddSubMenu = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var _req$body2, subMenuName, subMenuUrl, order, userId, departmentId, id, menudetailObj, checkSubMenu, _menucheck, departmentList, userList, subMenuDetail, user, department, submenuLength, _departmentList, _userList, _subMenuDetail;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
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
          if (!checkSubMenu) {
            _context7.next = 21;
            break;
          }
          _context7.next = 9;
          return _menu3["default"].findById(id);
        case 9:
          _menucheck = _context7.sent;
          _context7.next = 12;
          return _department["default"].find().sort("order");
        case 12:
          departmentList = _context7.sent;
          _context7.next = 15;
          return _user["default"].find();
        case 15:
          userList = _context7.sent;
          if (!_menucheck.subMenu) {
            _context7.next = 20;
            break;
          }
          _context7.next = 19;
          return _menu3["default"].findById(id).populate(_defineProperty({
            path: "subMenu",
            populate: {
              path: "department"
            }
          }, "populate", {
            path: "user",
            select: "_id name email"
          }));
        case 19:
          subMenuDetail = _context7.sent;
        case 20:
          return _context7.abrupt("return", res.status(404).render("menuDetail", {
            pageTitle: "메뉴등록 상세페이지",
            errorMessage: "이미 등록된 메뉴정보(메뉴명,정렬순서) 입니다.",
            departmentList: departmentList,
            userList: userList,
            menucheck: _menucheck,
            subMenuDetail: subMenuDetail
          }));
        case 21:
          if (!id) {
            _context7.next = 27;
            break;
          }
          _context7.next = 24;
          return _menu3["default"].findById(id);
        case 24:
          _context7.t0 = _context7.sent;
          _context7.next = 28;
          break;
        case 27:
          _context7.t0 = null;
        case 28:
          menudetailObj = _context7.t0;
          if (!userId) {
            _context7.next = 35;
            break;
          }
          _context7.next = 32;
          return _user["default"].findById(userId);
        case 32:
          _context7.t1 = _context7.sent;
          _context7.next = 36;
          break;
        case 35:
          _context7.t1 = null;
        case 36:
          user = _context7.t1;
          if (!departmentId) {
            _context7.next = 43;
            break;
          }
          _context7.next = 40;
          return _department["default"].findById(departmentId);
        case 40:
          _context7.t2 = _context7.sent;
          _context7.next = 44;
          break;
        case 43:
          _context7.t2 = null;
        case 44:
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
            department.save();
          }
          if (user) {
            menudetailObj.subMenu[submenuLength - 1].user.push(user._id);
            user.menu.push(menudetailObj._id);
            console.log(user);
            user.save();
          }
          menudetailObj.save();
          //console.log('---test---');
          //console.log(menudetailObj);
          return _context7.abrupt("return", res.redirect("/menuDetail/" + id));
        case 53:
          _context7.prev = 53;
          _context7.t3 = _context7["catch"](2);
          console.log(_context7.t3);
          _context7.next = 58;
          return _department["default"].find().sort("order");
        case 58:
          _departmentList = _context7.sent;
          _context7.next = 61;
          return _user["default"].find();
        case 61:
          _userList = _context7.sent;
          if (!menucheck.subMenu) {
            _context7.next = 66;
            break;
          }
          _context7.next = 65;
          return _menu3["default"].findById(id).populate(_defineProperty({
            path: "subMenu",
            populate: {
              path: "department"
            }
          }, "populate", {
            path: "user",
            select: "_id name email"
          }));
        case 65:
          _subMenuDetail = _context7.sent;
        case 66:
          return _context7.abrupt("return", res.status(400).render("menuDetail", {
            pageTitle: "menu 등록 상세페이지",
            errorMessage: _context7.t3._message,
            menucheck: menudetailObj,
            departmentList: _departmentList,
            userList: _userList,
            subMenuDetail: _subMenuDetail
          }));
        case 67:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[2, 53]]);
  }));
  return function postAddSubMenu(_x12, _x13) {
    return _ref7.apply(this, arguments);
  };
}();
var getSubMenuDelete = exports.getSubMenuDelete = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var _req$params, menuId, subMenuId, _menu2, user, departmentList, userList, subMenuDetail;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
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
          return _department["default"].find().sort("order");
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
    }, _callee8, null, [[1, 13]]);
  }));
  return function getSubMenuDelete(_x14, _x15) {
    return _ref8.apply(this, arguments);
  };
}();
var subMenuAuthAdd = exports.subMenuAuthAdd = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var _req$body3, menuId, subMenuId, idx, userId, departmentId, menu, user, department;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          //console.log("subMenuAuthAdd");
          //console.log(req.body);
          _req$body3 = req.body, menuId = _req$body3.menuId, subMenuId = _req$body3.subMenuId, idx = _req$body3.idx, userId = _req$body3.userId, departmentId = _req$body3.departmentId;
          _context9.next = 3;
          return _menu3["default"].findById(menuId).populate(subMenuId);
        case 3:
          menu = _context9.sent;
          if (!userId) {
            _context9.next = 13;
            break;
          }
          menu.subMenu[idx].user.push(userId);
          _context9.next = 8;
          return _user["default"].findById(userId);
        case 8:
          user = _context9.sent;
          console.log(user);
          user.menu.push(menu.subMenu[idx]._id);
          console.log(user);
          user.save();
        case 13:
          if (!departmentId) {
            _context9.next = 20;
            break;
          }
          menu.subMenu[idx].department.push(departmentId);
          _context9.next = 17;
          return _department["default"].findById(departmentId);
        case 17:
          department = _context9.sent;
          department.menu.push(menu.subMenu[idx]._id);
          department.save();
        case 20:
          menu.save();
          res.json({
            message: "success"
          });
        case 22:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return function subMenuAuthAdd(_x16, _x17) {
    return _ref9.apply(this, arguments);
  };
}();