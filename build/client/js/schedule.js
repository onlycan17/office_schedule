"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _core = require("@fullcalendar/core");

var _adaptive = _interopRequireDefault(require("@fullcalendar/adaptive"));

var _interaction = _interopRequireWildcard(require("@fullcalendar/interaction"));

var _daygrid = _interopRequireDefault(require("@fullcalendar/daygrid"));

var _list = _interopRequireDefault(require("@fullcalendar/list"));

var _timegrid = _interopRequireDefault(require("@fullcalendar/timegrid"));

var _resourceTimeline = _interopRequireDefault(require("@fullcalendar/resource-timeline"));

var _axios = _interopRequireDefault(require("axios"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
var dateType = "month";
var asyncValue = true;
var scheduleData = JSON.parse(calValue); // 캘린더 스케줄 데이터

document.addEventListener("DOMContentLoaded", function () {
  var _Calendar;

  var calendarEl = document.getElementById("calendar");
  var calendar = new _core.Calendar(calendarEl, (_Calendar = {
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
      right: "timeGridWeek,dayGridMonth,listWeek" //"resourceTimelineDay,resourceTimelineThreeDays,timeGridWeek,dayGridMonth,listWeek",

    },
    //initialView: 'resourceTimelineDay',
    initialView: "dayGridMonth",
    navLinks: true
  }, _defineProperty(_Calendar, "editable", true), _defineProperty(_Calendar, "selectable", true), _defineProperty(_Calendar, "nowIndicator", true), _defineProperty(_Calendar, "dayMaxEvents", true), _defineProperty(_Calendar, "locale", "ko"), _defineProperty(_Calendar, "droppable", true), _defineProperty(_Calendar, "dropAccept", ".drop-event"), _defineProperty(_Calendar, "businessHours", {
    // days of week. an array of zero-based day of week integers (0=Sunday)
    daysOfWeek: [1, 2, 3, 4, 5, 6],
    // Monday - Thursday
    startTime: "09:00",
    // a start time (10am in this example)
    endTime: "18:00" // an end time (6pm in this example)

  }), _defineProperty(_Calendar, "eventDidMount", function eventDidMount(info) {
    console.log(info);

    if (info.event.extendedProps.description) {
      var tooltip = new Tooltip(info.el, {
        title: info.event.extendedProps.description,
        placement: "top",
        trigger: "hover",
        container: "body"
      });
    } // console.log(info.el);
    // console.log(info.event);
    // console.log('test----user : '+info.event._def.extendedProps.user);
    // if(info.event._def.extendedProps.user === user){
    //   info.el.insertAdjacentHTML(
    //     "beforeend",
    //     '<span id="close_' + info.event.id + '" class="closeon">X</span>'
    //   );
    // }
    //info.el.innerText = `<span class='closeon'>x</span>`;
    // $("#close_" + info.event.id).click(async function () {
    //   if(asyncValue){
    //     asyncValue = false;
    //     deleteflag = true;
    //     const event = calendar.getEventById(info.event.id);
    //     event.remove();
    //     console.log("-----delete------");
    //     console.log(info.event.id);
    //     const res = await axios({
    //       method: "delete",
    //       url: "/deleteSchedule",
    //       data: { id: info.event.id },
    //       timeout: 15000,
    //     });
    //     if (res.status === 200) {
    //       console.log("저장완료!");
    //     }
    //     asyncValue = true;
    //   }
    // });

  }), _defineProperty(_Calendar, "eventClick", function eventClick(e) {
    console.log(e); //description = e.description;

    e.jsEvent.preventDefault(); // console.log(e.event);

    if (!deleteflag) {
      modal.style.display = "block";
      document.getElementById("title").value = e.event.title;
      document.getElementById("description").value = e.event.extendedProps.description;
      document.getElementById("url").value = e.event.url;
      document.getElementById("userName").value = e.event.extendedProps.user.name; // console.log("------update----");
      // console.log(e.event.id);

      globalId = e.event.id;
      start = e.event.start;
      end = e.event.end;
      allDay = e.event.allDay;
      toggleModal();

      if (e.event.url) {
        var _url = e.event.url;

        if (_url.indexOf("http")) {
          window.open("http://" + e.event.url, "_blank");
        } else {
          window.open(e.event.url, "_blank");
        }
      } // console.log('user === user');
      // console.log(typeof e.event.extendedProps.user._id, typeof user);


      if (e.event._def.extendedProps.user._id === user) {
        deleteButton.style.display = "inline";
        submitButton.style.display = 'inline';

        var _title = document.getElementById('title');

        var _description = document.getElementById('description');

        var _url2 = document.getElementById('url');

        _title.disabled = false;
        _description.disabled = false;
        _url2.disabled = false;
        submitButton.removeEventListener("click", addParam);
        submitButton.addEventListener("click", function () {
          updateParam(globalId);
        });
      } else {
        deleteButton.style.display = "none";

        var _title2 = document.getElementById('title');

        var _description2 = document.getElementById('description');

        var _url3 = document.getElementById('url');

        _title2.disabled = true;
        _description2.disabled = true;
        _url3.disabled = true;
        submitButton.style.display = 'none';
      }
    }

    deleteflag = false;
  }), _defineProperty(_Calendar, "select", function select(arg) {
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
    var url = document.getElementById('url');
    title.disabled = false;
    description.disabled = false;
    url.disabled = false;
    toggleModal();
  }), _defineProperty(_Calendar, "eventAdd", function () {
    var _eventAdd = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(obj) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // 이벤트가 추가되면 발생하는 이벤트
              console.log("eventAdd");
              console.log(obj);

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function eventAdd(_x) {
      return _eventAdd.apply(this, arguments);
    }

    return eventAdd;
  }()), _defineProperty(_Calendar, "eventChange", function () {
    var _eventChange = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(obj) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              // 이벤트가 수정되면 발생하는 이벤트(insert-> delete를 사용하기 때문에 필요 없음.)
              console.log("eventEdit");
              console.log(obj);

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function eventChange(_x2) {
      return _eventChange.apply(this, arguments);
    }

    return eventChange;
  }()), _defineProperty(_Calendar, "eventRemove", function () {
    var _eventRemove = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(obj) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              // 이벤트가 삭제되면 발생하는 이벤트
              console.log("eventDelete");
              console.log(obj);
              $('.tooltip').remove();

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function eventRemove(_x3) {
      return _eventRemove.apply(this, arguments);
    }

    return eventRemove;
  }()), _defineProperty(_Calendar, "customButtons", {
    prev: {
      text: "Prev",
      click: function () {
        var _click = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
          var temp, calendarDate, res, _calendarDate, startDate, calendarDateEnd, _end, endDate, _res;

          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  console.log("PREV");
                  calendar.prev();
                  calendar.removeAllEvents(); //console.log(dateStart);

                  if (!(dateType === 'month')) {
                    _context4.next = 15;
                    break;
                  }

                  temp = calendar.getDate();
                  calendarDate = moment(temp).format('YYYY-MM');
                  console.log(calendarDate); //console.log(window.location.href);
                  //console.log(window.location.pathname);

                  _context4.next = 9;
                  return (0, _axios["default"])({
                    method: "get",
                    url: "/customSchedule",
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
                  console.log(res.data.schedule);
                  res.data.schedule.forEach(function (element) {
                    calendar.addEvent(element);
                  });
                  calendar.unselect();
                  _context4.next = 26;
                  break;

                case 15:
                  _calendarDate = calendar.getDate().toISOString();
                  startDate = moment(_calendarDate).format('YYYY-MM-DD');
                  calendarDateEnd = calendar.getDate();
                  _end = calendarDateEnd.getDay() + 7;
                  endDate = moment(_end).format('YYYY-MM-DD');
                  _context4.next = 22;
                  return (0, _axios["default"])({
                    method: "get",
                    url: "/customWeekSchedule",
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
                  console.log(_res.data.schedule);

                  _res.data.schedule.forEach(function (element) {
                    calendar.addEvent(element);
                  });

                  calendar.unselect();

                case 26:
                case "end":
                  return _context4.stop();
              }
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
        var _click2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
          var temp, calendarDate, res, _calendarDate2, startDate, calendarDateEnd, _end2, endDate, _res2;

          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  console.log("NEXT");
                  calendar.next(); //console.log(startDate);
                  //console.log(dateStart);

                  calendar.removeAllEvents();

                  if (!(dateType === 'month')) {
                    _context5.next = 15;
                    break;
                  }

                  temp = calendar.getDate();
                  calendarDate = moment(temp).format('YYYY-MM');
                  console.log(calendarDate); //console.log(window.location.href);
                  //console.log(window.location.pathname);

                  _context5.next = 9;
                  return (0, _axios["default"])({
                    method: "get",
                    url: "/customSchedule",
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
                  console.log(res.data.schedule);
                  res.data.schedule.forEach(function (element) {
                    calendar.addEvent(element);
                  });
                  calendar.unselect();
                  _context5.next = 26;
                  break;

                case 15:
                  _calendarDate2 = calendar.getDate().toISOString();
                  startDate = moment(_calendarDate2).format('YYYY-MM-DD');
                  calendarDateEnd = calendar.getDate();
                  _end2 = calendarDateEnd.getDay() + 7;
                  endDate = moment(_end2).format('YYYY-MM-DD');
                  _context5.next = 22;
                  return (0, _axios["default"])({
                    method: "get",
                    url: "/customWeekSchedule",
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
                  console.log(_res2.data.schedule);

                  _res2.data.schedule.forEach(function (element) {
                    calendar.addEvent(element);
                  });

                  calendar.unselect();

                case 26:
                case "end":
                  return _context5.stop();
              }
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
  }), _defineProperty(_Calendar, "views", {
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
  }), _defineProperty(_Calendar, "resourceAreaHeaderContent", "Rooms"), _defineProperty(_Calendar, "resources", [{
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
  }]), _defineProperty(_Calendar, "events", scheduleData), _Calendar));
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
  url = "";
  document.getElementById("url").value = "";
  globalCalendar.unselect();
  modal.classList.toggle("show-modal");
}

function deleteBtnEvent() {
  return _deleteBtnEvent.apply(this, arguments);
}

function _deleteBtnEvent() {
  _deleteBtnEvent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
    var res, calendar;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            if (!confirm("삭제 하시겠습니까?")) {
              _context6.next = 5;
              break;
            }

            _context6.next = 3;
            return (0, _axios["default"])({
              method: "delete",
              url: "/deleteSchedule",
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
            }

          case 5:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _deleteBtnEvent.apply(this, arguments);
}

function addParam() {
  return _addParam.apply(this, arguments);
}

function _addParam() {
  _addParam = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
    var form_data, res;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            if (!asyncValue) {
              _context7.next = 11;
              break;
            }

            asyncValue = false;
            title = document.getElementById("title").value;
            description = document.getElementById("description").value;
            url = document.getElementById("url").value;
            form_data = {
              title: title,
              description: description,
              url: url,
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
              url: "/addSchedule",
              data: form_data,
              timeout: 15000
            });

          case 8:
            res = _context7.sent;

            if (res.status === 201) {
              //console.log(res.data.id);
              viewAddEvents(res.data.id); //calendar.refetchEvents();

              console.log("저장완료! id:" + res.data.id);
            }

            asyncValue = true;

          case 11:
          case "end":
            return _context7.stop();
        }
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
      url: url,
      color: color
    });
  }

  title = "";
  document.getElementById("title").value = "";
  description = "";
  document.getElementById("description").value = "";
  url = "";
  document.getElementById("url").value = "";
  globalCalendar.unselect();
  toggleModal();
}

function updateParam(_x4) {
  return _updateParam.apply(this, arguments);
}

function _updateParam() {
  _updateParam = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(id) {
    var resDel, element, form_data, res;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            if (!asyncValue) {
              _context8.next = 17;
              break;
            }

            asyncValue = false;
            console.log('updateParam----');
            console.log(id);
            _context8.next = 6;
            return (0, _axios["default"])({
              method: "delete",
              url: "/deleteSchedule",
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
            url = document.getElementById("url").value;
            form_data = {
              title: title,
              description: description,
              url: url,
              start: start,
              end: end,
              allDay: allDay,
              color: color,
              user: user,
              department: department
            };
            _context8.next = 14;
            return (0, _axios["default"])({
              method: "post",
              url: "/addSchedule",
              data: form_data,
              timeout: 15000
            });

          case 14:
            res = _context8.sent;

            if (res.status === 201) {
              console.log(res.data.id);
              viewAddEvents(res.data.id);
              console.log("저장완료! id:" + res.data.id);
            }

            asyncValue = true;

          case 17:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _updateParam.apply(this, arguments);
}