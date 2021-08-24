import { Calendar } from "@fullcalendar/core";
import adaptivePlugin from "@fullcalendar/adaptive";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import "../css/main.css";

document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");
  const value = document.getElementById('calValue');
  alert(value.value);

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
    now: "2018-02-07",
    editable: true, // enable draggable events
    aspectRatio: 1.8,
    scrollTime: "00:00", // undo default 6am scrollTime
    headerToolbar: {
      left: "today prev,next",
      center: "title",
      right:
        "timeGridWeek,dayGridMonth,listWeek",
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
    select: function (arg) {
      // 캘린더에서 드래그로 이벤트를 생성할 수 있다.
      var title = prompt("Event Title:");
      if (title) {
        calendar.addEvent({
          title: title,
          start: arg.start,
          end: arg.end,
          allDay: arg.allDay,
        });
      }
      calendar.unselect();
    },
    views: {
      resourceTimelineThreeDays: {
        type: "resourceTimeline",
        duration: { days: 3 },
        buttonText: "3 day",
      },
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
      },
      {
        id: "2",
        resourceId: "c",
        start: "2018-02-07T05:00:00",
        end: "2018-02-07T22:00:00",
        title: "event 2",
      },
      {
        id: "3",
        resourceId: "d",
        start: "2018-02-06",
        end: "2018-02-08",
        title: "event 3",
      },
      {
        id: "4",
        resourceId: "e",
        start: "2018-02-07T03:00:00",
        end: "2018-02-07T08:00:00",
        title: "event 4",
      },
      {
        id: "5",
        resourceId: "f",
        start: "2018-02-07T00:30:00",
        end: "2018-02-07T02:30:00",
        title: "event 5",
      },
    ],
  });

  calendar.render();
});
