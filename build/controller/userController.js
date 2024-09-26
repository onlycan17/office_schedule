"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postLogin = exports.postJoinUserUpdate = exports.postJoinUpdate = exports.postJoinAdd = exports.logout = exports.joinList = exports.getLogin = exports.getJoinUserUpdate = exports.getJoinUpdate = exports.getJoinForm = exports.getJoinAdd = void 0;
var _user = _interopRequireDefault(require("../schema/user"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _regeneratorRuntime2 = require("regenerator-runtime");
var _department = _interopRequireDefault(require("../schema/department"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _menu = _interopRequireDefault(require("../schema/menu"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var ObjectId = require("mongoose").Types.ObjectId;
var getLogin = exports.getLogin = function getLogin(req, res) {
  return res.render("login", {
    pageTitle: "Login"
  });
};
var postLogin = exports.postLogin = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var pageTitle, _req$body, email, password, user, ok, menu, objOrder;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
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
              subMenu === null || subMenu === void 0 || subMenu.department.forEach(function (dep) {
                var _user$department, _user$department2;
                console.log(dep._id);
                console.log("-------------");
                console.log(user === null || user === void 0 || (_user$department = user.department) === null || _user$department === void 0 ? void 0 : _user$department._id);
                if (subMenu.subMenuUrl === "/schedule" && dep._id + "" === (user === null || user === void 0 || (_user$department2 = user.department) === null || _user$department2 === void 0 ? void 0 : _user$department2._id) + "") {
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
          return _context.abrupt("return", res.redirect("/searchJournal?order=4"));
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
    }, _callee, null, [[2, 31]]);
  }));
  return function postLogin(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var logout = exports.logout = function logout(req, res) {
  req.flash("info", "Bye Bye");
  req.session.destroy();
  return res.redirect("/");
};
var getJoinForm = exports.getJoinForm = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var partList;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
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
    }, _callee2);
  }));
  return function getJoinForm(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var joinList = exports.joinList = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var _req$body2, start, draw, length, order, userName, email, departmentId, thisOrder, userCount, userList, departmentObj;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
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
                console.log();
                //userObjArry.push({...element});
              }
            });
          });
          //console.log(userObjArry);
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
          }

          //console.log(userList);
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
    }, _callee3);
  }));
  return function joinList(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var getJoinAdd = exports.getJoinAdd = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var partList, userList;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
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
    }, _callee4);
  }));
  return function getJoinAdd(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var getJoinUpdate = exports.getJoinUpdate = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var id, partList, user;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
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
    }, _callee5);
  }));
  return function getJoinUpdate(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var getJoinUserUpdate = exports.getJoinUserUpdate = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var id, partList, user, teamList;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
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
    }, _callee6);
  }));
  return function getJoinUserUpdate(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var postJoinAdd = exports.postJoinAdd = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var partList, userList, _req$body3, name, email, password, password2, partId, color, pageTitle, department, exists, userId;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
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
    }, _callee7, null, [[15, 28]]);
  }));
  return function postJoinAdd(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
var postJoinUpdate = exports.postJoinUpdate = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var partList, userList, _req$body4, id, name, oldEmail, email, password, password2, partId, color, pageTitle, department, exists, enPassword, userId;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
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
    }, _callee8, null, [[16, 32]]);
  }));
  return function postJoinUpdate(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
var postJoinUserUpdate = exports.postJoinUserUpdate = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var partList, userList, _req$body5, id, name, oldEmail, email, password, password2, partId, color, pageTitle, department, exists, enPassword, userId;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
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
    }, _callee9, null, [[17, 27]]);
  }));
  return function postJoinUserUpdate(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();