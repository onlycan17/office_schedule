import { Calendar } from "@fullcalendar/core";
import adaptivePlugin from "@fullcalendar/adaptive";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";

import axios from "axios";

const modal = document.querySelector(".modal");
const coloseButton = document.querySelector(".close-button");
const cancelButton = document.querySelector("#cancel");
const deleteButton = document.querySelector("#delete");
const submitButton = document.querySelector("#submit");
const color = document.getElementById("color").value;
const calValue = document.getElementById("calValue").value;
const user = document.getElementById("user").value;
const sessionUserName = document.getElementById("sessionUserName").value;
const department = document.getElementById("department").value;
const order  = document.getElementById("order").value;
const menuName  = document.getElementById("menuName").value;
const flag  = document.getElementById("flag").value;

coloseButton.addEventListener("click", cancel);
submitButton.addEventListener("click", addParam);
cancelButton.addEventListener("click", cancel);
deleteButton.addEventListener("click", deleteBtnEvent);

let globalId, title, description, url, start, end, allDay;
let globalCalendar;
let monthCaculate = 0;
let deleteflag = false;
let dateType = "week";
let asyncValue = true;

const scheduleData = JSON.parse(calValue); // 캘린더 스케줄 데이터

document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");

  const calendar = new Calendar(calendarEl, {
    plugins: [
      adaptivePlugin,
      interactionPlugin,
      dayGridPlugin,
      listPlugin,
      timeGridPlugin,
      resourceTimelinePlugin,
    ],
    schedulerLicenseKey: "GPL-My-Project-Is-Open-Source",
    themeSystem: "bootstrap",
    //now: "2018-02-07",
    now: new Date(),
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
    initialView: "timeGridWeek",
    navLinks: true, // 날짜를 선택하면 Day 캘린더나 Week 캘린더로 링크
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
      
    },
    eventClick: function (e) {
      console.log(e);
      //description = e.description;
      e.jsEvent.preventDefault();
      // console.log(e.event);
      if (!deleteflag) {
        modal.style.display = "block";
        document.getElementById("title").value = e.event.title;
        document.getElementById("description").value =
          e.event.extendedProps.description;
        //document.getElementById("url").value = e.event.url;
        document.getElementById("userName").value = e.event.extendedProps.user?.name;
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
        if(e.event._def.extendedProps.user._id === user){
          deleteButton.style.display = "inline";
          submitButton.style.display = 'inline';
          const title = document.getElementById('title');
          const description = document.getElementById('description');
          //const url =  document.getElementById('url');
          title.disabled = false;
          description.disabled = false;
          //url.disabled = false;
          submitButton.removeEventListener("click", addParam);
          submitButton.addEventListener("click", function () {
            updateParam(globalId);
          });
        }else{
          deleteButton.style.display = "none";
          const title = document.getElementById('title');
          const description = document.getElementById('description');
          //const url =  document.getElementById('url');
          title.disabled = true;
          description.disabled = true;
          //url.disabled = true;
          submitButton.style.display = 'none';
        }
      }
      deleteflag = false;
    },
    select: function (arg) {
      // 캘린더에서 드래그로 이벤트를 생성할 수 있다.
      //var title = prompt("제목:");
      const department = JSON.parse(document.getElementById("department").value);
      if(department._id === "612490cc21f010838f50a41b"){
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
      const title = document.getElementById('title');
      const description = document.getElementById('description');
      //const url =  document.getElementById('url');
      title.disabled = false;
      description.disabled = false;
      //url.disabled = false;
      toggleModal();
    },
    eventAdd: async function (obj) {
      // 이벤트가 추가되면 발생하는 이벤트
      console.log("eventAdd");
      console.log(obj);
    },
    eventChange: async function (obj) {
      // 이벤트가 수정되면 발생하는 이벤트(insert-> delete를 사용하기 때문에 필요 없음.)
      console.log("eventEdit");
      console.log(obj);
    },
    eventRemove: async function (obj) {
      // 이벤트가 삭제되면 발생하는 이벤트
      console.log("eventDelete");
      console.log(obj);
      $('.tooltip').remove();
    },
    customButtons: {
      prev: {
        text: "Prev",
        click: async function () {
          console.log("PREV");
          calendar.prev();
          calendar.removeAllEvents();
          //console.log(dateStart);
          if (dateType === 'month' ) {
            const temp =  calendar.getDate();
            const calendarDate = moment(temp).format('YYYY-MM');
            console.log(calendarDate);
            //console.log(window.location.href);
            //console.log(window.location.pathname);
            const res = await axios({
              method: "get",
              url: "/customBongoCar",
              params: { calendarDate, url: window.location.pathname,order,menuName,flag },
              timeout: 15000,
            });
            console.log(res.data.schedule);
            res.data.schedule.forEach((element) => {
              calendar.addEvent(element);
            });
            calendar.unselect();
          }else{
            const calendarDate = calendar.getDate().toISOString();
            const startDate = moment(calendarDate).format('YYYY-MM-DD');
            const endDate = moment(calendar.view.currentEnd).format('YYYY-MM-DD');
            const res = await axios({
              method: "get",
              url: "/customWeekBongoCar",
              params: { startDate, endDate , url: window.location.pathname,order,menuName,flag },
              timeout: 15000,
            });
            console.log(res.data.bongoCar);
            res.data.bongoCar.forEach((element) => {
              calendar.addEvent(element);
            });
            calendar.unselect();
          }
        },
      },
      next: {
        text: "Next",
        click: async function () {
          console.log("NEXT");
          calendar.next();
          //console.log(startDate);
          //console.log(dateStart);
          calendar.removeAllEvents();
          if ( dateType === 'month') {
            const temp =  calendar.getDate();
            const calendarDate = moment(temp).format('YYYY-MM');
            console.log(calendarDate);
            
            //console.log(window.location.href);
            //console.log(window.location.pathname);
            const res = await axios({
              method: "get",
              url: "/customBongoCar",
              params: { calendarDate, url: window.location.pathname,order,menuName,flag },
              timeout: 15000,
            });
            console.log(res.data.schedule);
            res.data.schedule.forEach((element) => {
              calendar.addEvent(element);
            });
            calendar.unselect();
          }else{
            const calendarDate = calendar.getDate().toISOString();
            const startDate = moment(calendarDate).format('YYYY-MM-DD');
            const endDate = moment(calendar.view.currentEnd).format('YYYY-MM-DD');
            const res = await axios({
              method: "get",
              url: "/customWeekBongoCar",
              params: { startDate, endDate , url: window.location.pathname,order,menuName,flag },
              timeout: 15000,
            });
            console.log(res.data.bongoCar);
            res.data.bongoCar.forEach((element) => {
              calendar.addEvent(element);
            });
            calendar.unselect();
          }
        },
      },
      timeGridWeek: {
        text: "Week",
        click: function () {
          calendar.changeView('timeGridWeek');
          dateType = "week";
        },
      },
      listWeek: {
        text: "list week",
        click: function () {
          calendar.changeView('listWeek');
          dateType = "week";
        },
      },
      dayGridMonth: {
        text: "Month",
        click: function () {
          calendar.changeView('dayGridMonth');
          dateType = "month";
        },
      },
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
    events: scheduleData,
  });

  calendar.render();

  globalCalendar = calendar;
});

function toggleModal() {
  modal.classList.toggle("show-modal");
}

function cancel(){
  title = "";
  document.getElementById("title").value = "";
  description = "";
  document.getElementById("description").value = "";
  // url = "";
  // document.getElementById("url").value = "";
  globalCalendar.unselect();
  modal.classList.toggle("show-modal");
}

async function deleteBtnEvent() {
  if(confirm("삭제 하시겠습니까?")){
    const res = await axios({
      method: "delete",
      url: "/deleteBongoCar",
      data: { id: globalId },
      timeout: 15000,
    });

    if (res.status === 200) {
      console.log("저장완료!");
      const calendar =  globalCalendar.getEventById(globalId);
      calendar.remove();
      modal.classList.toggle("show-modal");    
      location.reload(true); 
    }
  }
}

async function addParam() {
  if(asyncValue){
    asyncValue = false;
    title = document.getElementById("title").value;
    description = document.getElementById("description").value;
    //url = document.getElementById("url").value;
    const form_data = {
      title,
      description,
      //url,
      start,
      end,
      allDay,
      color,
      user,
      department,
    };
    const res = await axios({
      method: "post",
      url: "/addBongoCar",
      data: form_data,
      timeout: 15000,
    });
  
    if (res.status === 201) {
      //console.log(res.data.id);
      viewAddEvents(res.data.id);
      //calendar.refetchEvents();
      console.log("저장완료! id:"+res.data.id);
    }
    asyncValue = true;
  }
}

function viewAddEvents(id) {
  if (title) {
    globalCalendar.addEvent({
      id,
      title,
      start,
      end,
      allDay,
      description,
      //url,
      color,
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

async function updateParam(id) {
  if(asyncValue){
    asyncValue = false;
    console.log('updateParam----');
    console.log(id);
    const resDel = await axios({
      method: "delete",
      url: "/deleteBongoCar",
      data: { id },
      timeout: 15000,
    });
    if (resDel.status === 200) {
      console.log("삭제완료!");
      const element = globalCalendar.getEventById(id);
      element.remove();
    }
  
    title = document.getElementById("title").value;
    description = document.getElementById("description").value;
    //url = document.getElementById("url").value;
    const form_data = {
      title,
      description,
      //url,
      start,
      end,
      allDay,
      color,
      user,
      department,
    };
    const res = await axios({
      method: "post",
      url: "/addBongoCar",
      data: form_data,
      timeout: 15000,
    });
  
    if (res.status === 201) {
      console.log(res.data.id);
      viewAddEvents(res.data.id);
      console.log("저장완료! id:"+res.data.id);
    }
    asyncValue = true;
  }
}
