"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _core = require("@fullcalendar/core");
var _adaptive = _interopRequireDefault(require("@fullcalendar/adaptive"));
var _interaction = _interopRequireWildcard(require("@fullcalendar/interaction"));
var _daygrid = _interopRequireDefault(require("@fullcalendar/daygrid"));
var _list = _interopRequireDefault(require("@fullcalendar/list"));
var _timegrid = _interopRequireDefault(require("@fullcalendar/timegrid"));
var _resourceTimeline = _interopRequireDefault(require("@fullcalendar/resource-timeline"));
var _axios = _interopRequireDefault(require("axios"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var modal = document.querySelector(".modal");
var coloseButton = document.querySelector(".close-button");
var cancelButton = document.querySelector("#cancel");
var deleteButton = document.querySelector("#delete");
var submitButton = document.querySelector("#submit");
var color = document.getElementById("color").value;
var calValue = document.getElementById("calValue").value;
var user = document.getElementById("user").value;
var sessionUserName = document.getElementById("sessionUserName").value;
var department = document.getElementById("department").value;
var order = document.getElementById("order").value;
var menuName = document.getElementById("menuName").value;
var flag = document.getElementById("flag").value;
coloseButton.addEventListener("click", cancel);
submitButton.addEventListener("click", addParam);
cancelButton.addEventListener("click", cancel);
deleteButton.addEventListener("click", deleteBtnEvent);
var globalId, title, description, url, start, end, allDay;
var globalCalendar;
var monthCaculate = 0;
var deleteflag = false;
var dateType = "week";
var asyncValue = true;
var scheduleData = JSON.parse(calValue); // 캘린더 스케줄 데이터

document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  var calendar = new _core.Calendar(calendarEl, {
    plugins: [_adaptive["default"], _interaction["default"], _daygrid["default"], _list["default"], _timegrid["default"], _resourceTimeline["default"]],
    schedulerLicenseKey: "GPL-My-Project-Is-Open-Source",
    themeSystem: "bootstrap",
    //now: "2018-02-07",
    now: new Date(),
    editable: true,
    // enable draggable events
    aspectRatio: 1.8,
    scrollTime: "00:00",
    // undo default 6am scrollTime
    headerToolbar: {
      left: "today prev,next",
      center: "title",
      right: "timeGridWeek,dayGridMonth,listWeek"
      //"resourceTimelineDay,resourceTimelineThreeDays,timeGridWeek,dayGridMonth,listWeek",
    },
    //initialView: 'resourceTimelineDay',
    initialView: "timeGridWeek",
    navLinks: true,
    // 날짜를 선택하면 Day 캘린더나 Week 캘린더로 링크
    selectable: true,
    // 달력 일자 드래그 설정가능
    nowIndicator: true,
    // 현재 시간 마크
    dayMaxEvents: true,
    // 이벤트가 오버되면 높이 제한 (+ 몇 개식으로 표현)
    locale: "ko",
    // 한국어 설정
    droppable: true,
    dropAccept: ".drop-event",
    businessHours: {
      // days of week. an array of zero-based day of week integers (0=Sunday)
      daysOfWeek: [1, 2, 3, 4, 5, 6],
      // Monday - Thursday

      startTime: "09:00",
      // a start time (10am in this example)
      endTime: "18:00" // an end time (6pm in this example)
    },
    // drop: function () {
    //   alert("이벤트 성공!!!");
    // },
    eventDidMount: function eventDidMount(info) {
      console.log(info);
      if (info.event.extendedProps.description) {
        var tooltip = new Tooltip(info.el, {
          title: info.event.extendedProps.description,
          placement: "top",
          trigger: "hover",
          container: "body"
        });
      }
    },
    eventClick: function eventClick(e) {
      console.log(e);
      //description = e.description;
      e.jsEvent.preventDefault();
      // console.log(e.event);
      if (!deleteflag) {
        var _e$event$extendedProp;
        modal.style.display = "block";
        document.getElementById("title").value = e.event.title;
        document.getElementById("description").value = e.event.extendedProps.description;
        //document.getElementById("url").value = e.event.url;
        document.getElementById("userName").value = (_e$event$extendedProp = e.event.extendedProps.user) === null || _e$event$extendedProp === void 0 ? void 0 : _e$event$extendedProp.name;
        // console.log("------update----");
        // console.log(e.event.id);
        globalId = e.event.id;
        start = e.event.start;
        end = e.event.end;
        allDay = e.event.allDay;
        toggleModal();
        // if(e.event.url){
        //   const url = e.event.url;
        //   if(url.indexOf("http")){
        //     window.open("http://"+e.event.url, "_blank");  
        //   }else{
        //     window.open(e.event.url, "_blank");
        //   }
        // }
        // console.log('user === user');
        // console.log(typeof e.event.extendedProps.user._id, typeof user);
        if (e.event._def.extendedProps.user._id === user) {
          deleteButton.style.display = "inline";
          submitButton.style.display = 'inline';
          var _title = document.getElementById('title');
          var _description = document.getElementById('description');
          //const url =  document.getElementById('url');
          _title.disabled = false;
          _description.disabled = false;
          //url.disabled = false;
          submitButton.removeEventListener("click", addParam);
          submitButton.addEventListener("click", function () {
            updateParam(globalId);
          });
        } else {
          deleteButton.style.display = "none";
          var _title2 = document.getElementById('title');
          var _description2 = document.getElementById('description');
          //const url =  document.getElementById('url');
          _title2.disabled = true;
          _description2.disabled = true;
          //url.disabled = true;
          submitButton.style.display = 'none';
        }
      }
      deleteflag = false;
    },
    select: function select(arg) {
      // 캘린더에서 드래그로 이벤트를 생성할 수 있다.
      //var title = prompt("제목:");
      var department = JSON.parse(document.getElementById("department").value);
      if (department._id === "612490cc21f010838f50a41b") {
        alert('관리자는 등록하실 수 없습니다.');
        return false;
      }
      start = arg.start;
      end = arg.end;
      allDay = arg.allDay;
      modal.style.display = "block";
      deleteButton.style.display = "none";
      submitButton.style.display = 'inline';
      document.getElementById("userName").value = sessionUserName;
      var title = document.getElementById('title');
      var description = document.getElementById('description');
      //const url =  document.getElementById('url');
      title.disabled = false;
      description.disabled = false;
      //url.disabled = false;
      toggleModal();
    },
    eventAdd: function () {
      var _eventAdd = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(obj) {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              // 이벤트가 추가되면 발생하는 이벤트
              console.log("eventAdd");
              console.log(obj);
            case 2:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function eventAdd(_x) {
        return _eventAdd.apply(this, arguments);
      }
      return eventAdd;
    }(),
    eventChange: function () {
      var _eventChange = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(obj) {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              // 이벤트가 수정되면 발생하는 이벤트(insert-> delete를 사용하기 때문에 필요 없음.)
              console.log("eventEdit");
              console.log(obj);
            case 2:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function eventChange(_x2) {
        return _eventChange.apply(this, arguments);
      }
      return eventChange;
    }(),
    eventRemove: function () {
      var _eventRemove = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(obj) {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              // 이벤트가 삭제되면 발생하는 이벤트
              console.log("eventDelete");
              console.log(obj);
              $('.tooltip').remove();
            case 3:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      function eventRemove(_x3) {
        return _eventRemove.apply(this, arguments);
      }
      return eventRemove;
    }(),
    customButtons: {
      prev: {
        text: "Prev",
        click: function () {
          var _click = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
            var temp, calendarDate, res, _calendarDate, startDate, endDate, _res;
            return _regeneratorRuntime().wrap(function _callee4$(_context4) {
              while (1) switch (_context4.prev = _context4.next) {
                case 0:
                  console.log("PREV");
                  calendar.prev();
                  calendar.removeAllEvents();
                  //console.log(dateStart);
                  if (!(dateType === 'month')) {
                    _context4.next = 15;
                    break;
                  }
                  temp = calendar.getDate();
                  calendarDate = moment(temp).format('YYYY-MM');
                  console.log(calendarDate);
                  //console.log(window.location.href);
                  //console.log(window.location.pathname);
                  _context4.next = 9;
                  return (0, _axios["default"])({
                    method: "get",
                    url: "/customOfficeRoom",
                    params: {
                      calendarDate: calendarDate,
                      url: window.location.pathname,
                      order: order,
                      menuName: menuName,
                      flag: flag
                    },
                    timeout: 15000
                  });
                case 9:
                  res = _context4.sent;
                  console.log(res.data.officeRoom);
                  res.data.officeRoom.forEach(function (element) {
                    calendar.addEvent(element);
                  });
                  calendar.unselect();
                  _context4.next = 24;
                  break;
                case 15:
                  _calendarDate = calendar.getDate().toISOString();
                  startDate = moment(_calendarDate).format('YYYY-MM-DD');
                  endDate = moment(calendar.view.currentEnd).format('YYYY-MM-DD');
                  _context4.next = 20;
                  return (0, _axios["default"])({
                    method: "get",
                    url: "/customWeekOfficeRoom",
                    params: {
                      startDate: startDate,
                      endDate: endDate,
                      url: window.location.pathname,
                      order: order,
                      menuName: menuName,
                      flag: flag
                    },
                    timeout: 15000
                  });
                case 20:
                  _res = _context4.sent;
                  console.log(_res.data.officeRoom);
                  _res.data.officeRoom.forEach(function (element) {
                    calendar.addEvent(element);
                  });
                  calendar.unselect();
                case 24:
                case "end":
                  return _context4.stop();
              }
            }, _callee4);
          }));
          function click() {
            return _click.apply(this, arguments);
          }
          return click;
        }()
      },
      next: {
        text: "Next",
        click: function () {
          var _click2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
            var temp, calendarDate, res, _calendarDate2, startDate, endDate, _res2;
            return _regeneratorRuntime().wrap(function _callee5$(_context5) {
              while (1) switch (_context5.prev = _context5.next) {
                case 0:
                  console.log("NEXT");
                  calendar.next();
                  //console.log(startDate);
                  //console.log(dateStart);
                  calendar.removeAllEvents();
                  if (!(dateType === 'month')) {
                    _context5.next = 15;
                    break;
                  }
                  temp = calendar.getDate();
                  calendarDate = moment(temp).format('YYYY-MM');
                  console.log(calendarDate);

                  //console.log(window.location.href);
                  //console.log(window.location.pathname);
                  _context5.next = 9;
                  return (0, _axios["default"])({
                    method: "get",
                    url: "/customOfficeRoom",
                    params: {
                      calendarDate: calendarDate,
                      url: window.location.pathname,
                      order: order,
                      menuName: menuName,
                      flag: flag
                    },
                    timeout: 15000
                  });
                case 9:
                  res = _context5.sent;
                  console.log(res.data.officeRoom);
                  res.data.officeRoom.forEach(function (element) {
                    calendar.addEvent(element);
                  });
                  calendar.unselect();
                  _context5.next = 24;
                  break;
                case 15:
                  _calendarDate2 = calendar.getDate().toISOString();
                  startDate = moment(_calendarDate2).format('YYYY-MM-DD');
                  endDate = moment(calendar.view.currentEnd).format('YYYY-MM-DD');
                  console.log("endData  : ".concat(endDate));
                  _context5.next = 21;
                  return (0, _axios["default"])({
                    method: "get",
                    url: "/customWeekOfficeRoom",
                    params: {
                      startDate: startDate,
                      endDate: endDate,
                      url: window.location.pathname,
                      order: order,
                      menuName: menuName,
                      flag: flag
                    },
                    timeout: 15000
                  });
                case 21:
                  _res2 = _context5.sent;
                  console.log(_res2);
                  if (_res2.status == 200) {
                    _res2.data.officeRoom.forEach(function (element) {
                      calendar.addEvent(element);
                    });
                    calendar.unselect();
                  }
                case 24:
                case "end":
                  return _context5.stop();
              }
            }, _callee5);
          }));
          function click() {
            return _click2.apply(this, arguments);
          }
          return click;
        }()
      },
      timeGridWeek: {
        text: "Week",
        click: function click() {
          calendar.changeView('timeGridWeek');
          dateType = "week";
        }
      },
      listWeek: {
        text: "list week",
        click: function click() {
          calendar.changeView('listWeek');
          dateType = "week";
        }
      },
      dayGridMonth: {
        text: "Month",
        click: function click() {
          calendar.changeView('dayGridMonth');
          dateType = "month";
        }
      }
    },
    views: {
      resourceTimelineThreeDays: {
        type: "resourceTimeline",
        duration: {
          days: 3
        },
        buttonText: "3 day"
      },
      listDay: {
        buttonText: "list day"
      },
      listWeek: {
        buttonText: "list week"
      },
      listMonth: {
        buttonText: "list month"
      }
    },
    resourceAreaHeaderContent: "Rooms",
    resources: [{
      id: "A",
      title: "국장님실 예약"
    }, {
      id: "B",
      title: "예배실 예약"
    }, {
      id: "C",
      title: "크로마키실 예약"
    }, {
      id: "D",
      title: "녹음실 예약"
    }],
    events: scheduleData
  });
  calendar.render();
  globalCalendar = calendar;
});
function toggleModal() {
  modal.classList.toggle("show-modal");
}
function cancel() {
  title = "";
  document.getElementById("title").value = "";
  description = "";
  document.getElementById("description").value = "";
  // url = "";
  // document.getElementById("url").value = "";
  globalCalendar.unselect();
  modal.classList.toggle("show-modal");
}
function deleteBtnEvent() {
  return _deleteBtnEvent.apply(this, arguments);
}
function _deleteBtnEvent() {
  _deleteBtnEvent = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
    var res, calendar;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          if (!confirm("삭제 하시겠습니까?")) {
            _context6.next = 5;
            break;
          }
          _context6.next = 3;
          return (0, _axios["default"])({
            method: "delete",
            url: "/deleteOfficeRoom",
            data: {
              id: globalId
            },
            timeout: 15000
          });
        case 3:
          res = _context6.sent;
          if (res.status === 200) {
            console.log("저장완료!");
            calendar = globalCalendar.getEventById(globalId);
            calendar.remove();
            modal.classList.toggle("show-modal");
            location.reload(true);
          }
        case 5:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return _deleteBtnEvent.apply(this, arguments);
}
function addParam() {
  return _addParam.apply(this, arguments);
}
function _addParam() {
  _addParam = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
    var form_data, res;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          title = document.getElementById("title").value;
          console.log("title :  ".concat(title));
          if (!asyncValue) {
            _context7.next = 11;
            break;
          }
          asyncValue = false;
          description = document.getElementById("description").value;
          //url = document.getElementById("url").value;
          form_data = {
            title: title,
            description: description,
            //url,
            start: start,
            end: end,
            allDay: allDay,
            color: color,
            user: user,
            department: department
          };
          _context7.next = 8;
          return (0, _axios["default"])({
            method: "post",
            url: "/addOfficeRoom",
            data: form_data,
            timeout: 15000
          });
        case 8:
          res = _context7.sent;
          if (res.status === 201) {
            //console.log(res.data.id);
            viewAddEvents(res.data.id);
            //calendar.refetchEvents();
            console.log("저장완료! id:" + res.data.id);
          }
          asyncValue = true;
        case 11:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return _addParam.apply(this, arguments);
}
function viewAddEvents(id) {
  if (title) {
    globalCalendar.addEvent({
      id: id,
      title: title,
      start: start,
      end: end,
      allDay: allDay,
      description: description,
      //url,
      color: color
    });
  }
  title = "";
  document.getElementById("title").value = "";
  description = "";
  document.getElementById("description").value = "";
  // url = "";
  // document.getElementById("url").value = "";
  globalCalendar.unselect();
  toggleModal();
  location.reload(true);
}
function updateParam(_x4) {
  return _updateParam.apply(this, arguments);
}
function _updateParam() {
  _updateParam = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(id) {
    var resDel, element, form_data, res;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          if (!asyncValue) {
            _context8.next = 16;
            break;
          }
          asyncValue = false;
          console.log('updateParam----');
          console.log(id);
          _context8.next = 6;
          return (0, _axios["default"])({
            method: "delete",
            url: "/deleteOfficeRoom",
            data: {
              id: id
            },
            timeout: 15000
          });
        case 6:
          resDel = _context8.sent;
          if (resDel.status === 200) {
            console.log("삭제완료!");
            element = globalCalendar.getEventById(id);
            element.remove();
          }
          title = document.getElementById("title").value;
          description = document.getElementById("description").value;
          //url = document.getElementById("url").value;
          form_data = {
            title: title,
            description: description,
            //url,
            start: start,
            end: end,
            allDay: allDay,
            color: color,
            user: user,
            department: department
          };
          _context8.next = 13;
          return (0, _axios["default"])({
            method: "post",
            url: "/addOfficeRoom",
            data: form_data,
            timeout: 15000
          });
        case 13:
          res = _context8.sent;
          if (res.status === 201) {
            console.log(res.data.id);
            viewAddEvents(res.data.id);
            console.log("저장완료! id:" + res.data.id);
          }
          asyncValue = true;
        case 16:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return _updateParam.apply(this, arguments);
}