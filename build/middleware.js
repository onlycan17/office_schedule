"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.publicOnlyMiddleware = exports.protectorMiddleware = exports.photoUpload = exports.localsMiddleware = exports.fileUpload = exports.dropbox = void 0;
var _regeneratorRuntime2 = require("regenerator-runtime");
var _requestIp = _interopRequireDefault(require("request-ip"));
var _multer = _interopRequireDefault(require("multer"));
var _dropboxV2Api = _interopRequireDefault(require("dropbox-v2-api"));
var _actionLog = _interopRequireDefault(require("./schema/actionLog"));
var _menu2 = _interopRequireDefault(require("./schema/menu"));
var _rssToJson = _interopRequireDefault(require("rss-to-json"));
var _auth = _interopRequireDefault(require("./schema/auth"));
var _awsSdk = _interopRequireDefault(require("aws-sdk"));
var _multerS = _interopRequireDefault(require("multer-s3"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var ObjectId = require("mongoose").Types.ObjectId;
var isAWSEB = process.env.NODE_ENV === "production";
var publicOnlyMiddleware = exports.publicOnlyMiddleware = function publicOnlyMiddleware(req, res, next) {
  //console.log("~~~~~~~~~~~~~~~~");
  //console.log(isAWSEB);
  // await ActionLog.create({
  //   url: req.url,
  //   params: JSON.stringify(req.params),
  //   body: JSON.stringify(req.body),
  //   ip: requestIp.getClientIp(req),
  //   bigo: JSON.stringify(req.__peername),
  //   header: JSON.stringify(req.rawHeaders),
  // });
  if (!req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "Not authorized");
    return res.redirect("/");
  }
};
var localsMiddleware = exports.localsMiddleware = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res, next) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!(JSON.stringify(req.body) !== "{}")) {
            _context.next = 3;
            break;
          }
          _context.next = 3;
          return _actionLog["default"].create({
            url: req.url,
            params: JSON.stringify(req.params),
            body: JSON.stringify(req.body),
            ip: _requestIp["default"].getClientIp(req),
            bigo: JSON.stringify(req.__peername),
            header: JSON.stringify(req.rawHeaders)
          });
        case 3:
          res.locals.loggedIn = Boolean(req.session.loggedIn);
          res.locals.siteName = "명작";
          res.locals.loggedInUser = req.session.user || {};
          res.locals.isAWSEB = isAWSEB;
          //console.log(res.locals.loggedInUser);
          next();
        case 8:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function localsMiddleware(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var protectorMiddleware = exports.protectorMiddleware = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res, next) {
    var url, startUrl, lastOrder, arry, order, flag, auth, menufind, subMenu, result, result2, menu, _menu, dep, userId, menuList, rss, temp;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          //console.log('-----미들웨어');
          //console.log(req.url);
          url = req.url;
          if (url.indexOf("?") !== -1) {
            arry = url.split("?");
            order = arry[1].split("=");
            startUrl = arry[0];
            lastOrder = order[1];
            res.locals.startUrl = startUrl;
            res.locals.lastOrder = lastOrder;
            //console.log(startUrl, lastOrder);
          } else {
            res.locals.startUrl = url;
          }
          //console.log(req.session.loggedIn);
          if (!req.session.loggedIn) {
            _context2.next = 54;
            break;
          }
          flag = false; //console.log("urltest-----------");
          //console.log(startUrl);
          console.log(_typeof(lastOrder));
          if (!(startUrl === "/schedule" || startUrl === "/journal")) {
            _context2.next = 28;
            break;
          }
          if (!lastOrder) {
            _context2.next = 26;
            break;
          }
          _context2.next = 9;
          return _auth["default"].findOne({
            subUrl: startUrl,
            order: Number(lastOrder)
          });
        case 9:
          auth = _context2.sent;
          console.log(auth);
          //console.log("++++++++++++++++++++++");
          //console.log(req.session.user.department._id);
          if (!(req.session.user.department._id + "" !== "612490cc21f010838f50a41b")) {
            _context2.next = 21;
            break;
          }
          _context2.next = 14;
          return _menu2["default"].findOne({
            subMenu: {
              $elemMatch: {
                subMenuUrl: startUrl
              }
            }
          });
        case 14:
          menufind = _context2.sent;
          //console.log("submenu-------");
          subMenu = menufind.subMenu.filter(function (subMenu) {
            return subMenu.subMenuUrl === startUrl && subMenu.order === Number(lastOrder);
          }); //console.log(subMenu[0].user);
          result = subMenu[0].user.filter(function (userParam) {
            //console.log("usercheck");
            //console.log(userParam, req.session.user._id);
            //console.log("+++++++++++");
            if (userParam + "" === req.session.user._id + "") {
              return true;
            }
            return false;
          });
          result2 = subMenu[0].department.filter(function (departmentParam) {
            // console.log("departmentcheck");
            // console.log(departmentParam, req.session.user.department._id);
            // console.log("+++++++++++");
            if (departmentParam + "" === req.session.user.department._id + "") {
              return true;
            }
          }); // console.log(result, result2);
          if (result.length > 0 || result2.length > 0) {
            flag = true;
          } else {
            flag = false;
          }
          _context2.next = 22;
          break;
        case 21:
          flag = true;
        case 22:
          _context2.next = 24;
          return _menu2["default"].find().populate({
            path: "subMenu",
            options: {
              sort: {
                order: 1
              }
            }
          });
        case 24:
          menu = _context2.sent;
          menu.forEach(function (menu) {
            menu.subMenu.forEach(function (subMenu) {
              if (req.url.indexOf(subMenu.subMenuUrl) != -1) {
                res.locals.menuName = menu.menuName;
              }
            });
          });
        case 26:
          _context2.next = 32;
          break;
        case 28:
          _context2.next = 30;
          return _menu2["default"].find().populate({
            path: "subMenu",
            options: {
              sort: {
                order: 1
              }
            }
          });
        case 30:
          _menu = _context2.sent;
          _menu.forEach(function (menu) {
            menu.subMenu.forEach(function (subMenu) {
              if (req.url.indexOf(subMenu.subMenuUrl) != -1) {
                res.locals.menuName = menu.menuName;
                subMenu.department.forEach(function (department) {
                  //console.log('===================');
                  //console.log(department);
                  //console.log(req.session.user.department._id);
                  if (req.session.user.department._id + "" === department + "") {
                    flag = true;
                  }
                });
                if (subMenu.user) {
                  subMenu.user.forEach(function (user) {
                    // console.log(req.session.user._id);
                    // console.log(user);
                    if (req.session.user._id + "" === user + "") {
                      flag = true;
                      //res.locals.lastOrder = subMenu.order;
                    }
                  });
                }
              }
            });
          });
        case 32:
          console.log("---------flag");
          console.log(flag);

          // console.log('-----flag----');
          // console.log(flag);
          if (req.url !== "/home" && !flag) {
            res.sendStatus(404);
          }
          dep = {
            _id: new ObjectId(req.session.user.department._id)
          };
          userId = {
            _id: new ObjectId(req.session.user._id)
          };
          _context2.next = 39;
          return _menu2["default"].find({
            // $or: [
            //   { user: req.session.user._id },
            //   //{ department: dep},
            // ],
            subMenu: {
              $elemMatch: {
                $or: [{
                  user: userId
                }, {
                  department: dep
                }]
              }
            }
          }).sort("order");
        case 39:
          menuList = _context2.sent;
          //console.log("menutest-----------------");
          //console.log(menuList);
          res.locals.menuList = menuList;
          res.locals.loggedIn = req.session.loggedIn;
          res.locals.siteName = "명작";
          res.locals.loggedInUser = req.session.user || {};
          res.locals.flag = flag;
          res.locals.isAWSEB = isAWSEB;
          _context2.next = 48;
          return (0, _rssToJson["default"])("https://www.kma.go.kr/wid/queryDFSRSS.jsp?zone=4471025000");
        case 48:
          rss = _context2.sent;
          temp = rss.items[0].description.body.data[0].wfEn;
          res.locals.weather = temp;
          //console.log(temp);
          //console.log(JSON.stringify(rss, null, 3));
          return _context2.abrupt("return", next());
        case 54:
          req.flash("error", "세션이 종료되었습니다. 로그인페이지로 이동합니다.");
          return _context2.abrupt("return", res.redirect("/"));
        case 56:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function protectorMiddleware(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var fileUpload = exports.fileUpload = (0, _multer["default"])({
  dest: "uploads/files/",
  limits: {
    fileSize: 999900000000
  }
});
var dropbox = exports.dropbox = _dropboxV2Api["default"].authenticate({
  client_id: process.env.DBX_APP_KEY,
  client_secret: process.env.DBX_APP_SECRET,
  redirect_uri: process.env.REDIRECT || 'http://localhost:4500/auth',
  token: process.env.DBX_TOKEN
});
var authUrl = dropbox.generateAuthUrl();
console.log('----dropboxUrl------');
console.log(authUrl);
//  use session ref to call API, i.e.:
// dropbox({
//   resource: 'users/get_account',
//   parameters: {
//       'account_id': 'dbid:AAH4f99T0taONIb-OurWxbNQ6ywGRopQngc'
//   }
// }, (err, result, response) => {
//   if (err) { return console.log(err); }
//   console.log(result);
// });

var s3 = new _awsSdk["default"].S3({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET
  }
});
var s3ImageUploader = (0, _multerS["default"])({
  s3: s3,
  bucket: 'masterpiece-photo-uploads',
  acl: "public-read"
});
var photoUpload = exports.photoUpload = (0, _multer["default"])({
  dest: "uploads/photos/",
  limits: {
    fileSize: 999900000000
  },
  //storage: isAWSEB ? s3ImageUploader : undefined,
  storage: s3ImageUploader
});