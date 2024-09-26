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
var _ckeditor5BuildDecoupledDocument = _interopRequireDefault(require("@ckeditor/ckeditor5-build-decoupled-document"));
var _moment = _interopRequireDefault(require("moment"));
var _nodeFetch = _interopRequireDefault(require("node-fetch"));
var _UploadAdapter = _interopRequireDefault(require("./UploadAdapter"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; } //import "../css/calendar.css";
//import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
//
// import { text } from "express";

var submitButton = document.querySelector("#submit");
var commentSaveBtn = document.querySelector("#commentSaveBtn");
var color = document.getElementById("color").value;
var calValue = document.getElementById("calValue").value;
var user = document.getElementById("user").value;
var userName = document.getElementById("userName").value;
var department = document.getElementById("department").value;
var menu = document.querySelector("menu");
var order = document.getElementById("order").value;
var menuName = document.getElementById("menuName").value;
var flag = document.getElementById("flag").value;

//coloseButton.addEventListener("click", cancel);
submitButton.addEventListener("click", addParam);
var editor;
var contentDescription;
function createEditor() {
  _ckeditor5BuildDecoupledDocument["default"].create(document.querySelector("#ckeditor"), {
    language: "ko",
    extraPlugins: [MyCustomUploadAdapterPlugin]
    // image: {
    //     resizeUnit: "%",
    //     resizeOptions: [
    //         {
    //             name: 'resizeImage:original',
    //             value: null
    //         },
    //         {
    //             name: 'resizeImage:50',
    //             value: '50'
    //         },
    //         {
    //             name: 'resizeImage:75',
    //             value: '75'
    //         }],
    //     toolbar: ['resizeImage']
    // }
  }).then(function (newEditor) {
    var toolbarContainer = document.querySelector("#toolbar-container");
    toolbarContainer.appendChild(newEditor.ui.view.toolbar.element);
    newEditor.on('change:isReadOnly', function (evt, propertyName, isReadOnly) {
      if (isReadOnly) {
        toolbarContainer.style.display = 'none';
      } else {
        toolbarContainer.style.display = 'flex';
      }
    });
    editor = newEditor;
  })["catch"](function (error) {
    console.error(error);
  });
}
function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = function (loader) {
    return new _UploadAdapter["default"](loader);
  };
}
createEditor();
var globalId, title, description, url, start, end, allDay;
var globalCalendar;
var monthCaculate = 0;
var deleteflag = false;
var dateType = "month";
var asyncValue = true;
var tooltip;
var scheduleData = JSON.parse(calValue); // 캘린더 스케줄 데이터
var index;
document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  var calendar = new _core.Calendar(calendarEl, {
    plugins: [_adaptive["default"], _interaction["default"], _daygrid["default"], _list["default"], _timegrid["default"], _resourceTimeline["default"]],
    schedulerLicenseKey: "GPL-My-Project-Is-Open-Source",
    themeSystem: "bootstrap",
    //now: "2018-02-07",
    now: new Date(),
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
    initialView: "dayGridMonth",
    navLinks: true,
    // 날짜를 선택하면 Day 캘린더나 Week 캘린더로 링크
    editable: true,
    // 수정 가능?
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
      menu.style.display = "block";
      // if (info.event.extendedProps.description) {
      //   const descriptionExp = info.event.extendedProps.description;
      //   tooltip = new Tooltip(info.el, {
      //     title: descriptionExp.replace(/(<([^>]+)>)/gi, ""),
      //     placement: "top",
      //     trigger: "hover",
      //     container: "body",
      //   });
      // }
      console.log(info.el);
      console.log(info.event);
      //info.el.append('<span class="closeon">x</span>');
      var month = (0, _moment["default"])(info.event.start).format("YYYYMM");
      var startDay = (0, _moment["default"])(info.event.start).format("DD");
      var todayMonth = (0, _moment["default"])(new Date()).format("YYYYMM");
      var today = (0, _moment["default"])(new Date()).format("DD");
      // console.log(info.event._def.extendedProps.user === user);
      if ((Number(month) === Number(todayMonth) || Number(month) + 1 === Number(todayMonth) && Number(today) <= 7 || Number(todayMonth) - Number(month) === 89 && Number(today) <= 7) && info.event._def.extendedProps.user === user) {
        // info.el.insertAdjacentHTML(
        //   "beforeend",
        //   '<span id="close_' + info.event.id + '" class="closeon">X</span>'
        // );
        // $("#close_" + info.event.id).click(async function () {
        //   if (asyncValue) {
        //     asyncValue = false;
        //     deleteflag = true;
        //     const event = calendar.getEventById(info.event.id);
        //     event.remove();
        //     console.log("-----delete------");
        //     console.log(info.event.id);
        //     const res = await axios({
        //       method: "delete",
        //       url: "/deleteJournal",
        //       data: { id: info.event.id },
        //       timeout: 15000,
        //     });
        //     if (res.status === 200) {
        //       console.log("저장완료!");
        //     }
        //     asyncValue = true;
        //   }
        // });
      }
    },
    eventClick: function eventClick(e) {
      console.log(e);
      //description = e.description;
      if (!deleteflag) {
        $("#commentTextarea").css("display", "flex");
        $("#userNameText").css("display", "flex");
        $("#userNameLabel").css("display", "flex");
        if (e.event.extendedProps.description) {
          editor.setData(e.event.extendedProps.description);
          $('#userNameText').val(e.event.title);
          //editor.isReadOnly = true;
          editor.enableReadOnlyMode('ckeditor');
          //console.log(editor.state);
          var month = (0, _moment["default"])(e.event.start).format("YYYYMM");
          var startDay = (0, _moment["default"])(e.event.start).format("DD");
          var todayMonth = (0, _moment["default"])(new Date()).format("YYYYMM");
          var today = (0, _moment["default"])(new Date()).format("DD");
          if ((Number(month) === Number(todayMonth) || Number(month) + 1 === Number(todayMonth) && Number(today) <= 7 || Number(todayMonth) - Number(month) === 89 && Number(today) <= 7) && e.event._def.extendedProps.user === user) {
            $(".editorCK").append("\n              <div class=\"pull-right\">\n                <button class=\"btn\" id=\"edit\">\uC218\uC815</button>&nbsp;&nbsp;\n                <button class=\"btn\" id=\"deleteBtn\">\uC0AD\uC81C</button>\n              </div>\n              ");
            var editCk = document.querySelector("#edit");
            var deleteCk = document.querySelector("#deleteBtn");
            editCk.addEventListener("click", function () {
              return clickEdit(e.event.id);
            });
            deleteCk.addEventListener("click", function () {
              return clickDelete(e.event.id);
            });
            $("#divFile").css("display", "none");
          }
          $("#submit").remove();
          var fileYn = false;
          scheduleData.forEach(function (element, idx) {
            if (element._id === e.event.id) {
              index = idx;
              fileYn = true;
            } else {
              fileYn = false;
            }
            if (element.comments) {
              element.comments.forEach(function (data) {
                if (data.journal === e.event.id) {
                  var _data$user, _data$user2, _data$user3;
                  $("#comment").append("\n                    <div id=\"lv1_".concat(data._id, "\" class=\"commentColumn bolder\">\n                      <div id=\"lv2_").concat(data._id, "\" class=\"row\">").concat(data === null || data === void 0 ? void 0 : data.text, "</div>\n                      <div class=\"row\">\n                        <span>").concat(data === null || data === void 0 || (_data$user = data.user) === null || _data$user === void 0 ? void 0 : _data$user.name, "</span>&nbsp;&nbsp;\n                        <span>").concat((0, _moment["default"])(data === null || data === void 0 ? void 0 : data.createdAt).format("YYYY-MM-DD HH:mm:SS"), "</span>\n                        ").concat((data === null || data === void 0 || (_data$user2 = data.user) === null || _data$user2 === void 0 ? void 0 : _data$user2._id) === user ? '<a id="edit_' + "".concat(data._id) + '" class="commentBtn" href="#">수정</a><a id="delete_' + "".concat(data._id) + '" class="commentBtn" href="#">삭제</a>' : "", "\n                      </div>\n                    </div>\n                "));
                  if ((data === null || data === void 0 || (_data$user3 = data.user) === null || _data$user3 === void 0 ? void 0 : _data$user3._id) === user) {
                    var editCommentBtn = document.querySelector("#edit_" + data._id);
                    var deleteCommentBtn = document.querySelector("#delete_" + data._id);
                    editCommentBtn.addEventListener("click", function () {
                      return editCommentForm(data._id);
                    });
                    deleteCommentBtn.addEventListener("click", function () {
                      return deleteComment(data._id);
                    });
                  }
                }
              });
            }
          });
          console.log(index);
          if (fileYn && scheduleData[index].file) {
            $("#divFile").css("display", "flex");
            $("#singleFile").replaceWith("<a href='#' id=\"fileDownload\">".concat(scheduleData[index].file.originalname, "</a>"));
          }

          // $("textarea").css("display", "none");
          // contentDescription = e.event.extendedProps.description;
        }
        //document.getElementById("url").value = e.event.url;
        console.log("------update----");
        //console.log(scheduleData);
        console.log(e.event.id);
        globalId = e.event.id;
        start = (0, _moment["default"])(e.event.start).format("YYYY-MM-DD HH:mm:SS");
        end = (0, _moment["default"])(e.event.end).format("YYYY-MM-DD HH:mm:SS");
        //console.log(e.event.start);
        document.getElementById("start").value = start;
        document.getElementById("end").value = end;
        allDay = e.event.allDay;
        submitButton.removeEventListener("click", addParam);
        submitButton.addEventListener("click", function () {
          updateParam(globalId);
        });
        commentSaveBtn.addEventListener("click", addComment);
        //toggleModal();
        toggleSideBar();
      }
      deleteflag = false;
    },
    select: function select(arg) {
      // 캘린더에서 드래그로 이벤트를 생성할 수 있다.
      //var title = prompt("제목:");
      $("#userNameText").css("display", "none");
      $("#userNameLabel").css("display", "none");
      var department = JSON.parse(document.getElementById("department").value);
      if (department._id === "612490cc21f010838f50a41b") {
        alert("관리자는 등록하실 수 없습니다.");
        return false;
      }
      var month = (0, _moment["default"])(arg.start).format("YYYYMM");
      var startDay = (0, _moment["default"])(arg.start).format("DD");
      var todayMonth = (0, _moment["default"])(new Date()).format("YYYYMM");
      var today = (0, _moment["default"])(new Date()).format("DD");
      if (Number(month) === Number(todayMonth) || Number(month) + 1 === Number(todayMonth) && Number(today) <= 7 || Number(todayMonth) - Number(month) === 89 && Number(today) <= 7) {
        $("#commentTextarea").css("display", "none");
        console.log("selecte");
        start = (0, _moment["default"])(arg.start).format("YYYY-MM-DD HH:mm:SS");
        end = (0, _moment["default"])(arg.end).format("YYYY-MM-DD HH:mm:SS");
        allDay = arg.allDay;
        console.log(start);
        console.log(end);
        document.getElementById("start").value = start;
        document.getElementById("end").value = end;
        //modal.style.display = "block";
        toggleSideBar();
      } else {
        alert("지난달 업무일지를 작성할 수 있는 기간이 만료되었습니다.\n (예: 작성할 지난달이 10월일경우 11월 7일전까지 등록해야 함.)");
      }
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
              $(".tooltip").remove();
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
            var temp, calendarDate, res, _calendarDate, startDate, calendarDateEnd, _end, endDate, _res;
            return _regeneratorRuntime().wrap(function _callee4$(_context4) {
              while (1) switch (_context4.prev = _context4.next) {
                case 0:
                  console.log("PREV");
                  calendar.prev();
                  calendar.removeAllEvents();
                  //console.log(dateStart);
                  if (!(dateType === "month")) {
                    _context4.next = 15;
                    break;
                  }
                  temp = calendar.getDate();
                  calendarDate = (0, _moment["default"])(temp).format("YYYY-MM");
                  console.log(calendarDate);
                  //console.log(window.location.href);
                  //console.log(window.location.pathname);
                  _context4.next = 9;
                  return (0, _axios["default"])({
                    method: "get",
                    url: "/customJournal",
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
                  console.log(res.data.journal);
                  res.data.journal.forEach(function (element) {
                    calendar.addEvent(element);
                  });
                  calendar.unselect();
                  _context4.next = 26;
                  break;
                case 15:
                  _calendarDate = calendar.getDate().toISOString();
                  startDate = (0, _moment["default"])(_calendarDate).format("YYYY-MM-DD");
                  calendarDateEnd = calendar.getDate();
                  _end = calendarDateEnd.getDay() + 7;
                  endDate = (0, _moment["default"])(_end).format("YYYY-MM-DD");
                  _context4.next = 22;
                  return (0, _axios["default"])({
                    method: "get",
                    url: "/customWeekJournal",
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
                case 22:
                  _res = _context4.sent;
                  console.log(_res.data.journal);
                  _res.data.journal.forEach(function (element) {
                    calendar.addEvent(element);
                  });
                  calendar.unselect();
                case 26:
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
            var temp, calendarDate, res, _calendarDate2, startDate, calendarDateEnd, _end2, endDate, _res2;
            return _regeneratorRuntime().wrap(function _callee5$(_context5) {
              while (1) switch (_context5.prev = _context5.next) {
                case 0:
                  console.log("NEXT");
                  calendar.next();
                  //console.log(startDate);
                  //console.log(dateStart);
                  calendar.removeAllEvents();
                  if (!(dateType === "month")) {
                    _context5.next = 15;
                    break;
                  }
                  temp = calendar.getDate();
                  calendarDate = (0, _moment["default"])(temp).format("YYYY-MM");
                  console.log(calendarDate);

                  //console.log(window.location.href);
                  //console.log(window.location.pathname);
                  _context5.next = 9;
                  return (0, _axios["default"])({
                    method: "get",
                    url: "/customJournal",
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
                  console.log(res.data.journal);
                  res.data.journal.forEach(function (element) {
                    calendar.addEvent(element);
                  });
                  calendar.unselect();
                  _context5.next = 26;
                  break;
                case 15:
                  _calendarDate2 = calendar.getDate().toISOString();
                  startDate = (0, _moment["default"])(_calendarDate2).format("YYYY-MM-DD");
                  calendarDateEnd = calendar.getDate();
                  _end2 = calendarDateEnd.getDay() + 7;
                  endDate = (0, _moment["default"])(_end2).format("YYYY-MM-DD");
                  _context5.next = 22;
                  return (0, _axios["default"])({
                    method: "get",
                    url: "/customWeekJournal",
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
                case 22:
                  _res2 = _context5.sent;
                  console.log(_res2.data.journal);
                  _res2.data.journal.forEach(function (element) {
                    calendar.addEvent(element);
                  });
                  calendar.unselect();
                case 26:
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
          calendar.changeView("timeGridWeek");
          dateType = "week";
        }
      },
      listWeek: {
        text: "List Week",
        click: function click() {
          calendar.changeView("listWeek");
          dateType = "week";
        }
      },
      dayGridMonth: {
        text: "Month",
        click: function click() {
          calendar.changeView("dayGridMonth");
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

// function toggleModal() {
//   modal.classList.toggle("show-modal");
// }

function toggleSideBar() {
  $("html").addClass("active");
}
function addParam() {
  return _addParam.apply(this, arguments);
}
function _addParam() {
  _addParam = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
    var singleFile, formData, res, pushData, _pushData;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          if (!(asyncValue && editor.getData())) {
            _context6.next = 19;
            break;
          }
          asyncValue = false;
          //title = document.getElementById("title").value;
          description = editor.getData();
          singleFile = document.getElementById("singleFile");
          console.log(singleFile.files[0]);
          formData = new FormData();
          formData.append("start", start);
          formData.append("end", end);
          formData.append("allDay", allDay);
          formData.append("color", color);
          formData.append("user", user);
          formData.append("department", department);
          formData.append("description", description);
          formData.append("singleFile", singleFile.files[0]);
          _context6.next = 16;
          return (0, _axios["default"])({
            method: "post",
            url: "/addJournal",
            data: formData,
            headers: {
              "Content-Type": "multipart/form-data"
            },
            timeout: 15000
          });
        case 16:
          res = _context6.sent;
          if (res.status === 201) {
            //console.log(res.data.id);
            viewAddEvents(res.data.id);
            //calendar.refetchEvents();
            console.log("저장완료! id:" + res.data.id);
            console.log(res.data.filePath);
            console.log(res.data.fileName);
            if (res.data.fileId) {
              pushData = {
                _id: res.data.id,
                id: res.data.id,
                text: description,
                start: start,
                end: end,
                allDay: allDay,
                department: department,
                user: user,
                color: color,
                file: {
                  _id: res.data.fileId,
                  originalname: res.data.fileName,
                  path: res.data.filePath
                },
                comments: []
              };
              scheduleData.push(pushData);
            } else {
              _pushData = {
                _id: res.data.id,
                id: res.data.id,
                text: description,
                start: start,
                end: end,
                allDay: allDay,
                department: department,
                user: user,
                color: color,
                comments: []
              };
              scheduleData.push(_pushData);
            }
          }
          asyncValue = true;
        case 19:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return _addParam.apply(this, arguments);
}
function viewAddEvents(id) {
  if (description) {
    globalCalendar.addEvent({
      id: id,
      title: userName,
      start: start,
      end: end,
      allDay: allDay,
      description: description,
      //url,
      color: color
    });
  }
  //title = "";
  //document.getElementById("title").value = "";
  description = "";
  editor.setData("");
  //url = "";
  //document.getElementById("url").value = "";
  globalCalendar.unselect();
  //toggleModal();
  $("html").removeClass("active");
  $("#start").val("");
  $("#end").val("");
  editor.setData("");
  $(".pull-right > .btn").remove();
  $(".file a").remove();
  //editor.isReadOnly = false;
  editor.disableReadOnlyMode('ckeditor');
  location.reload(true);
}
function updateParam(_x4) {
  return _updateParam.apply(this, arguments);
}
function _updateParam() {
  _updateParam = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(id) {
    var resDel, element, singleFile, formData, res;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          if (!(asyncValue && editor.getData())) {
            _context7.next = 25;
            break;
          }
          asyncValue = false;
          console.log("updateParam----");
          console.log(id);
          _context7.next = 6;
          return (0, _axios["default"])({
            method: "delete",
            url: "/deleteJournal",
            data: {
              id: id
            },
            timeout: 15000
          });
        case 6:
          resDel = _context7.sent;
          if (resDel.status === 200) {
            console.log("삭제완료!");
            element = globalCalendar.getEventById(id);
            element.remove();
          }

          //title = document.getElementById("title").value;
          description = editor.getData();
          singleFile = document.getElementById("singleFile");
          console.log(singleFile.files[0]);
          formData = new FormData();
          formData.append("start", start);
          formData.append("end", end);
          formData.append("allDay", allDay);
          formData.append("color", color);
          formData.append("user", user);
          formData.append("department", department);
          formData.append("description", description);
          formData.append("singleFile", singleFile.files[0]);
          _context7.next = 22;
          return (0, _axios["default"])({
            method: "post",
            url: "/addJournal",
            data: formData,
            headers: {
              "Content-Type": "multipart/form-data"
            },
            timeout: 15000
          });
        case 22:
          res = _context7.sent;
          if (res.status === 201) {
            console.log(res.data.id);
            viewAddEvents(res.data.id);
            console.log("저장완료! id:" + res.data.id);
          }
          asyncValue = true;
        case 25:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return _updateParam.apply(this, arguments);
}
function addComment() {
  return _addComment.apply(this, arguments);
}
function _addComment() {
  _addComment = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
    var form_data, res, _res$data$user, comment, divCommentColumn, divRow1, divRow2, span1, span2, a1, a2, temp, param;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          if (!(globalId && document.getElementById("content").value)) {
            _context8.next = 6;
            break;
          }
          form_data = {
            user: user,
            journalId: globalId,
            commentText: document.getElementById("content").value
          };
          _context8.next = 4;
          return (0, _axios["default"])({
            method: "post",
            url: "/addComment",
            data: form_data,
            timeout: 15000
          });
        case 4:
          res = _context8.sent;
          if (res.status === 200) {
            console.log("저장완료! id:" + res.data.id);
            comment = document.querySelector("#comment");
            divCommentColumn = document.createElement("div");
            divCommentColumn.setAttribute("class", "commentColumn bolder");
            divCommentColumn.setAttribute("id", "lv1_" + res.data.id);
            divRow1 = document.createElement("div");
            divRow1.setAttribute("class", "row");
            divRow1.setAttribute("id", "lv2_" + res.data.id);
            divRow1.innerText = form_data.commentText;
            divRow2 = document.createElement("div");
            divRow2.setAttribute("class", "row");
            span1 = document.createElement("span");
            span1.innerText = (_res$data$user = res.data.user) === null || _res$data$user === void 0 ? void 0 : _res$data$user.name;
            span2 = document.createElement("span");
            span2.innerText = (0, _moment["default"])(new Date()).format("YYYY-MM-DD HH:mm:ss");
            a1 = document.createElement("a");
            a1.setAttribute("class", "commentBtn");
            a1.setAttribute("href", "#");
            a1.dataset.id = res.data.id;
            a1.setAttribute("id", "editCommentFormComponent");
            a1.innerText = "수정";
            a2 = document.createElement("a");
            a2.setAttribute("class", "commentBtn");
            a2.setAttribute("href", "#");
            a2.dataset.id = res.data.id;
            a2.setAttribute("id", "deleteCommentComponent");
            a2.innerText = "삭제";
            divRow2.appendChild(span1);
            divRow2.appendChild(span2);
            divRow2.appendChild(a1);
            divRow2.appendChild(a2);
            divCommentColumn.appendChild(divRow1);
            divCommentColumn.appendChild(divRow2);
            comment.appendChild(divCommentColumn);
            a1.addEventListener("click", function () {
              return editCommentForm(res.data.id);
            });
            a2.addEventListener("click", function () {
              return deleteComment(res.data.id);
            });
            $("#content").val("");
            //console.log(window.location.href);
            temp = window.location.search;
            param = temp.split("="); //location.href = `/journal?order=${param[1]}`;
            location.replace("/journal?order=".concat(param[1]));
            $("#close-menu").trigger("click");
          }
        case 6:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return _addComment.apply(this, arguments);
}
function clickEdit(id) {
  $(".pull-right > .btn").remove();
  //editor.isReadOnly = false;
  editor.disableReadOnlyMode('ckeditor');
  //editor.setData(contentDescription);
  $(".file a").remove();
  $("#singleFile").remove();
  $("#divFile").css("display", "block");
  $(".file").append("\n      <input type=\"file\" id=\"singleFile\" />\n    ");
  $("#submitDiv").append("\n      <button class=\"btn\" id=\"submit\">\uBCF4\uB0B4\uAE30</button>\n    ");
  var submitBtn = document.querySelector("#submit");
  submitBtn.removeEventListener("click", addParam);
  submitBtn.addEventListener("click", function () {
    return updateParam(id);
  });
}
function clickDelete(_x5) {
  return _clickDelete.apply(this, arguments);
}
function _clickDelete() {
  _clickDelete = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(id) {
    var resDel, element;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          if (!confirm("일일업무를 삭제하시겠습니까?")) {
            _context9.next = 10;
            break;
          }
          if (!(asyncValue && editor.getData())) {
            _context9.next = 10;
            break;
          }
          asyncValue = false;
          console.log("updateParam----");
          console.log(id);
          _context9.next = 7;
          return (0, _axios["default"])({
            method: "delete",
            url: "/deleteJournal",
            data: {
              id: id
            },
            timeout: 15000
          });
        case 7:
          resDel = _context9.sent;
          if (resDel.status === 200) {
            console.log("삭제완료!");
            element = globalCalendar.getEventById(id);
            element.remove();
            $("#overlay").trigger("click");
          }
          asyncValue = true;
        case 10:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return _clickDelete.apply(this, arguments);
}
function editCommentForm(replyId) {
  console.log("-------edit-------");
  console.log(replyId);
  var content = $("#lv2_" + replyId).text();
  $("#lv1_" + replyId).empty();
  var editComponent = document.querySelector("#lv1_" + replyId);
  console.log(editComponent);
  var commentSaveBtn = document.createElement("div");
  var textarea = document.createElement("textarea");
  textarea.setAttribute("name", "content");
  textarea.setAttribute("id", "content_" + replyId);
  textarea.setAttribute("cols", "30%");
  textarea.setAttribute("rows", "5");
  textarea.innerText = content;
  var button = document.createElement("button");
  button.setAttribute("id", "commentSaveBtn_" + replyId);
  button.setAttribute("class", "button");
  button.innerText = "답변하기";
  commentSaveBtn.appendChild(textarea);
  commentSaveBtn.appendChild(button);
  editComponent.appendChild(commentSaveBtn);
  button.addEventListener("click", function () {
    return editComment(replyId);
  });
}
function editComment(_x6) {
  return _editComment.apply(this, arguments);
}
function _editComment() {
  _editComment = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(replyId) {
    var form_data, res, _res$data$user2, comment, divCommentColumn, divRow1, divRow2, span1, span2, a1, a2, temp, param;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          if (!replyId) {
            _context10.next = 6;
            break;
          }
          form_data = {
            user: user,
            journalId: globalId,
            commentText: document.getElementById("content_" + replyId).value,
            commentId: replyId
          };
          _context10.next = 4;
          return (0, _axios["default"])({
            method: "patch",
            url: "/editComment",
            data: form_data,
            timeout: 15000
          });
        case 4:
          res = _context10.sent;
          if (res.status === 200) {
            $("#lv1_" + replyId).remove();
            comment = document.querySelector("#comment");
            divCommentColumn = document.createElement("div");
            divCommentColumn.setAttribute("class", "commentColumn bolder");
            divCommentColumn.setAttribute("id", "lv1_" + res.data.id);
            divRow1 = document.createElement("div");
            divRow1.setAttribute("class", "row");
            divRow1.setAttribute("id", "lv2_" + res.data.id);
            divRow1.innerText = form_data.commentText;
            divRow2 = document.createElement("div");
            divRow2.setAttribute("class", "row");
            span1 = document.createElement("span");
            span1.innerText = (_res$data$user2 = res.data.user) === null || _res$data$user2 === void 0 ? void 0 : _res$data$user2.name;
            span2 = document.createElement("span");
            span2.innerText = (0, _moment["default"])(new Date()).format("YYYY-MM-DD HH:mm:ss");
            a1 = document.createElement("a");
            a1.setAttribute("class", "commentBtn");
            a1.setAttribute("href", "#");
            a1.dataset.id = res.data.id;
            a1.setAttribute("id", "editCommentFormComponent");
            a1.innerText = "수정";
            a2 = document.createElement("a");
            a2.setAttribute("class", "commentBtn");
            a2.setAttribute("href", "#");
            a2.dataset.id = res.data.id;
            a2.setAttribute("id", "deleteCommentComponent");
            a2.innerText = "삭제";
            divRow2.appendChild(span1);
            divRow2.appendChild(span2);
            divRow2.appendChild(a1);
            divRow2.appendChild(a2);
            divCommentColumn.appendChild(divRow1);
            divCommentColumn.appendChild(divRow2);
            comment.appendChild(divCommentColumn);
            a1.removeEventListener("click", function () {
              return editCommentForm(res.data.id);
            });
            a2.removeEventListener("click", function () {
              return deleteComment(res.data.id);
            });
            a1.addEventListener("click", function () {
              return editCommentForm(res.data.id);
            });
            a2.addEventListener("click", function () {
              return deleteComment(res.data.id);
            });
            $("#content").val("");
            temp = window.location.search;
            param = temp.split("=");
            location.replace("/journal?order=".concat(param[1]));
            $("#close-menu").trigger("click");
          }
        case 6:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  }));
  return _editComment.apply(this, arguments);
}
function deleteComment(_x7) {
  return _deleteComment.apply(this, arguments);
} // sideBar event
function _deleteComment() {
  _deleteComment = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11(replyId) {
    var form_data, res;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          //console.log('deleteComment-----');
          //console.log(replyId);
          form_data = {
            commentId: replyId
          };
          _context11.next = 3;
          return (0, _axios["default"])({
            method: "delete",
            url: "/deleteComment",
            data: form_data,
            timeout: 15000
          });
        case 3:
          res = _context11.sent;
          if (res.status === 200) {
            console.log("삭제성공!");
            $("#lv1_" + replyId).remove();
          }
        case 5:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  }));
  return _deleteComment.apply(this, arguments);
}
$(function () {
  menu.style.display = "block";
  var w = $(window).width(),
    h = $(window).height();
  //$('section').width(w);
  $("section").height(h);
  //$("menu .container").height(h - 60);
  $("body").prepend('<div id="overlay">');
  $("#menu").click(function () {
    $("html").addClass("active");
  });
  $(window).resize(function () {
    var w = $(window).width(),
      h = $(window).height();
    //$('section').width(w);
    $("section").height(h);
    $("menu .container").height(h - 60);
  });
  $("#close-menu").click(function () {
    $("html").removeClass("active");
    $("#start").val("");
    $("#end").val("");
    editor.setData("");
    $(".pull-right > .btn").remove();
    //editor.isReadOnly = false;
    editor.disableReadOnlyMode('ckeditor');
    $(".file > a").remove();
    $("#singleFile").remove();
    $("#submit").remove();
    $(".file").append("\n      <input type=\"file\" id=\"singleFile\" />\n    ");
    $("#submitDiv").append("\n      <button id=\"submit\" class=\"btn\">\uBCF4\uB0B4\uAE30</button>\n    ");
    var submitBtn = document.querySelector("#submit");
    submitBtn.addEventListener("click", addParam);
    globalId = null;
    $("#comment").empty();
  });
  $("#overlay").click(function () {
    $("html").removeClass("active");
    $("#start").val("");
    $("#end").val("");
    editor.setData("");
    $(".pull-right > .btn").remove();
    //editor.isReadOnly = false;
    editor.disableReadOnlyMode("ckeditor");
    $(".file > a").remove();
    $("#singleFile").remove();
    $("#submit").remove();
    $(".file").append("\n      <input type=\"file\" id=\"singleFile\" />\n    ");
    $("#submitDiv").append("\n      <button id=\"submit\" class=\"btn\">\uBCF4\uB0B4\uAE30</button>\n    ");
    var submitBtn = document.querySelector("#submit");
    submitBtn.addEventListener("click", addParam);
    globalId = null;
    $("#comment").empty();
  });
  $(document).on("click", "#fileDownload", function () {
    $.ajax({
      type: "get",
      url: "/download/".concat(scheduleData[index].file._id),
      success: function success(response) {
        var a = document.createElement("a");
        var url = window.location.hostname;
        console.log(url);
        if (url.indexOf("localhost") !== -1) {
          a.href = "http://localhost:4500/uploads/files/".concat(scheduleData[index].file.originalname);
        } else {
          a.href = "http://www.myeongjak.kr/uploads/files/".concat(scheduleData[index].file.originalname);
        }
        // Set the file name
        a.download = scheduleData[index].file.originalname;
        a.click();
      },
      error: function error(xhr) {
        console.log(xhr);
      }
    }).fail(function () {
      alert("fail");
    });
  });
});