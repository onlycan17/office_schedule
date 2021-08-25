import { Calendar } from "@fullcalendar/core";
import adaptivePlugin from "@fullcalendar/adaptive";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import "../css/main.css";

const modal = document.querySelector(".modal");
const coloseButton = document.querySelector(".close-button");
const cancelButton = document.querySelector("#cancel");
const submitButton = document.querySelector("#submit");

coloseButton.addEventListener("click", toggleModal);
submitButton.addEventListener("click", addParam);
cancelButton.addEventListener("click", toggleModal);

let title, description, url, start, end, allDay;
let globalCalendar;

document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");
  const value = document.getElementById("calValue");

  const calendar = new Calendar(calendarEl, {
    plugins: [
      adaptivePlugin,
      interactionPlugin,
      dayGridPlugin,
      listPlugin,
      timeGridPlugin,
      resourceTimelinePlugin,
    ],
    schedulerLicenseKey: "XXX",
    themeSystem: "bootstrap",
    now: "2018-02-07",
    editable: true, // enable draggable events
    aspectRatio: 1.8,
    scrollTime: "00:00", // undo default 6am scrollTime
    headerToolbar: {
      left: "today prev,next",
      center: "title",
      right: "timeGridWeek,dayGridMonth,listWeek",
      //"resourceTimelineDay,resourceTimelineThreeDays,timeGridWeek,dayGridMonth,listWeek",
    },
    //initialView: 'resourceTimelineDay',
    initialView: "dayGridMonth",
    navLinks: true, // 날짜를 선택하면 Day 캘린더나 Week 캘린더로 링크
    editable: true, // 수정 가능?
    selectable: true, // 달력 일자 드래그 설정가능
    nowIndicator: true, // 현재 시간 마크
    dayMaxEvents: true, // 이벤트가 오버되면 높이 제한 (+ 몇 개식으로 표현)
    locale: "ko", // 한국어 설정
    droppable: true,
    dropAccept: ".drop-event",
    businessHours: {
      // days of week. an array of zero-based day of week integers (0=Sunday)
      daysOfWeek: [1, 2, 3, 4, 5, 6], // Monday - Thursday

      startTime: "09:00", // a start time (10am in this example)
      endTime: "18:00", // an end time (6pm in this example)
    },
    // drop: function () {
    //   alert("이벤트 성공!!!");
    // },
    eventDidMount: function (info) {
      console.log(info);
      if (info.event.extendedProps.description) {
        let tooltip = new Tooltip(info.el, {
          title: info.event.extendedProps.description,
          placement: "top",
          trigger: "hover",
          container: "body",
        });
      }
      console.log(info.el);
      //info.el.append('<span class="closeon">x</span>');
      info.el.insertAdjacentHTML("beforeend", '<span class="closeon">x</span>');
      //info.el.innerText = `<span class='closeon'>x</span>`;
      $(info.el + ".closeon").click(function () {
        //$("#calendar").fullCalendar("removeEvents", info._id);
        const event = calendar.getEventById(info.event.id);
        event.remove();
      });
    },
    eventClick: function (e) {
      console.log(e);
      //description = e.description;
      document.getElementById("title").value = e.event.title;
      document.getElementById("description").value =
        e.event.extendedProps.description;
      document.getElementById("url").value = e.event.url;
      start = e.event.start;
      end = e.event.end;
      allDay = e.event.allDay;
      submitButton.removeEventListener("click", addParam);
      const event = calendar.getEventById(e.event.id);
      submitButton.addEventListener("click", function () {
        updateParam(event);
      });
      toggleModal();
    },
    select: function (arg) {
      // 캘린더에서 드래그로 이벤트를 생성할 수 있다.
      //var title = prompt("제목:");
      start = arg.start;
      end = arg.end;
      allDay = arg.allDay;
      toggleModal();
    },
    eventAdd: function (obj) {
      // 이벤트가 추가되면 발생하는 이벤트
      console.log("eventAdd");
      console.log(obj);
    },
    eventChange: function (obj) {
      // 이벤트가 수정되면 발생하는 이벤트
      console.log("eventEdit");
      console.log(obj);
    },
    eventRemove: function (obj) {
      // 이벤트가 삭제되면 발생하는 이벤트
      console.log("eventDelete");
      console.log(obj);
    },
    views: {
      resourceTimelineThreeDays: {
        type: "resourceTimeline",
        duration: { days: 3 },
        buttonText: "3 day",
      },
      listDay: { buttonText: "list day" },
      listWeek: { buttonText: "list week" },
      listMonth: { buttonText: "list month" },
    },
    resourceAreaHeaderContent: "Rooms",
    resources: [
      { id: "A", title: "국장님실 예약" },
      { id: "B", title: "예배실 예약" },
      { id: "C", title: "크로마키실 예약" },
      { id: "D", title: "녹음실 예약" },
    ],
    events: [
      {
        id: "1",
        resourceId: "b",
        start: "2018-02-07T02:00:00",
        end: "2018-02-07T07:00:00",
        title: "event 1",
        description: "test",
      },
      {
        id: "2",
        resourceId: "c",
        start: "2018-02-07T05:00:00",
        end: "2018-02-07T22:00:00",
        title: "event 2",
        description: "test",
      },
      {
        id: "3",
        resourceId: "d",
        start: "2018-02-06",
        end: "2018-02-08",
        title: "event 3",
        description: "test",
      },
      {
        id: "4",
        resourceId: "e",
        start: "2018-02-07T03:00:00",
        end: "2018-02-07T08:00:00",
        title: "event 4",
        description: "test",
      },
      {
        id: "5",
        resourceId: "f",
        start: "2018-02-07T00:30:00",
        end: "2018-02-07T02:30:00",
        title: "event 5",
        description: "test",
      },
    ],
  });

  calendar.render();

  globalCalendar = calendar;
});

function toggleModal() {
  modal.classList.toggle("show-modal");
  
}
function addParam() {
  title = document.getElementById("title").value;
  description = document.getElementById("description").value;
  url = document.getElementById("url").value;

  if (title) {
    globalCalendar.addEvent({
      title,
      start,
      end,
      allDay,
      description,
      url,
    });
    title = "";
    //document.getElementById("title").value = "";
    description = "";
    //document.getElementById("description").value = "";
    start = "";
    end = "";
    allDay = "";
    url = "";
    //document.getElementById("url").value = "";
  }
  globalCalendar.unselect();
  toggleModal();
}

function updateParam(event) {
  title = document.getElementById('title').value;
  description = document.getElementById('description').value;
  url = document.getElementById('url').value;
  if(title){
    globalCalendar.addEvent({
      title,
      description,
      start,
      end,
      allDay,
      url,
    });
  }
  globalCalendar.unselect();
  event.remove();
  title = "";
  document.getElementById("title").value = "";
  description = "";
  document.getElementById("description").value = "";
  start = "";
  end = "";
  allDay = "";
  url = "";
  document.getElementById("url").value = "";
  toggleModal();
}
