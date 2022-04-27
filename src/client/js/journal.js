import { Calendar } from "@fullcalendar/core";
import adaptivePlugin from "@fullcalendar/adaptive";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
//import "../css/calendar.css";
import axios from "axios";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import moment from "moment";
import fetch from "node-fetch";
import UploadAdapter from "./UploadAdapter";
// import { text } from "express";

const submitButton = document.querySelector("#submit");
const commentSaveBtn = document.querySelector("#commentSaveBtn");
const color = document.getElementById("color").value;
const calValue = document.getElementById("calValue").value;
const user = document.getElementById("user").value;
const userName = document.getElementById("userName").value;
const department = document.getElementById("department").value;
const menu = document.querySelector("menu");
const order = document.getElementById("order").value;
const menuName = document.getElementById("menuName").value;
const flag = document.getElementById("flag").value;

//coloseButton.addEventListener("click", cancel);
submitButton.addEventListener("click", addParam);

let editor;
let contentDescription;
function createEditor() {
  ClassicEditor.create(document.querySelector("#ckeditor"), {
    language: "ko",
    extraPlugins: [MyCustomUploadAdapterPlugin],
  })
    .then((newEditor) => {
      editor = newEditor;
    })
    .catch((error) => {
      console.error(error);
    });
}

function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new UploadAdapter(loader)
  }
}

createEditor();

let globalId, title, description, url, start, end, allDay;
let globalCalendar;
let monthCaculate = 0;
let deleteflag = false;
let dateType = "month";
let asyncValue = true;
let tooltip;

const scheduleData = JSON.parse(calValue); // 캘린더 스케줄 데이터
let index;

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
      const month = moment(info.event.start).format("YYYYMM");
      const startDay = moment(info.event.start).format("DD");
      const todayMonth = moment(new Date()).format("YYYYMM");
      const today = moment(new Date()).format("DD");
      // console.log(info.event._def.extendedProps.user === user);
      if (
        (Number(month) === Number(todayMonth) ||
          (Number(month) + 1 === Number(todayMonth) && Number(today) <= 7) ||
          (Number(todayMonth) - Number(month) === 89 && Number(today) <= 7)) &&
        info.event._def.extendedProps.user === user
      ) {
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
    eventClick: function (e) {
      console.log(e);
      //description = e.description;
      if (!deleteflag) {
        $("#commentTextarea").css("display", "flex");
        if (e.event.extendedProps.description) {
          editor.setData(e.event.extendedProps.description);
          $('#userNameText').val(e.event.title);
          editor.isReadOnly = true;
          //console.log(editor.state);
          const month = moment(e.event.start).format("YYYYMM");
          const startDay = moment(e.event.start).format("DD");
          const todayMonth = moment(new Date()).format("YYYYMM");
          const today = moment(new Date()).format("DD");
          if (
            (Number(month) === Number(todayMonth) ||
              (Number(month) + 1 === Number(todayMonth) &&
                Number(today) <= 7) ||
              (Number(todayMonth) - Number(month) === 89 &&
                Number(today) <= 7)) &&
            e.event._def.extendedProps.user === user
          ) {
            $(".editorCK").append(
              `
              <div class="pull-right">
                <button class="btn" id="edit">수정</button>&nbsp;&nbsp;
                <button class="btn" id="deleteBtn">삭제</button>
              </div>
              `
            );
            const editCk = document.querySelector("#edit");
            const deleteCk = document.querySelector("#deleteBtn");
            editCk.addEventListener("click", () => clickEdit(e.event.id));
            deleteCk.addEventListener("click", () => clickDelete(e.event.id));
            $("#divFile").css("display", "none");
          }
          $("#submit").remove();

          let fileYn = false;
          scheduleData.forEach((element, idx) => {
            if (element._id === e.event.id) {
              index = idx;
              fileYn = true;
            } else {
              fileYn = false;
            }

            if (element.comments) {
              element.comments.forEach((data) => {
                if (data.journal === e.event.id) {
                  $("#comment").append(`
                    <div id="lv1_${data._id}" class="commentColumn bolder">
                      <div id="lv2_${data._id}" class="row">${data?.text}</div>
                      <div class="row">
                        <span>${data?.user?.name}</span>&nbsp;&nbsp;
                        <span>${moment(data?.createdAt).format(
                          "YYYY-MM-DD HH:mm:SS"
                        )}</span>
                        ${
                          data?.user?._id === user
                            ? '<a id="edit_' +
                              `${data._id}` +
                              '" class="commentBtn" href="#">수정</a><a id="delete_' +
                              `${data._id}` +
                              '" class="commentBtn" href="#">삭제</a>'
                            : ""
                        }
                      </div>
                    </div>
                `);
                  if (data?.user?._id === user) {
                    const editCommentBtn = document.querySelector(
                      "#edit_" + data._id
                    );
                    const deleteCommentBtn = document.querySelector(
                      "#delete_" + data._id
                    );
                    editCommentBtn.addEventListener("click", () =>
                      editCommentForm(data._id)
                    );
                    deleteCommentBtn.addEventListener("click", () =>
                      deleteComment(data._id)
                    );
                  }
                }
              });
            }
          });
          console.log(index);
          if (fileYn && scheduleData[index].file) {
            $("#divFile").css("display", "flex");
            $("#singleFile").replaceWith(
              `<a href='#' id="fileDownload">${scheduleData[index].file.originalname}</a>`
            );
          }

          // $("textarea").css("display", "none");
          // contentDescription = e.event.extendedProps.description;
        }
        //document.getElementById("url").value = e.event.url;
        console.log("------update----");
        //console.log(scheduleData);
        console.log(e.event.id);
        globalId = e.event.id;
        start = moment(e.event.start).format("YYYY-MM-DD HH:mm:SS");
        end = moment(e.event.end).format("YYYY-MM-DD HH:mm:SS");
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
    select: function (arg) {
      // 캘린더에서 드래그로 이벤트를 생성할 수 있다.
      //var title = prompt("제목:");
      const department = JSON.parse(
        document.getElementById("department").value
      );
      if (department._id === "612490cc21f010838f50a41b") {
        alert("관리자는 등록하실 수 없습니다.");
        return false;
      }
      const month = moment(arg.start).format("YYYYMM");
      const startDay = moment(arg.start).format("DD");
      const todayMonth = moment(new Date()).format("YYYYMM");
      const today = moment(new Date()).format("DD");
      if (
        Number(month) === Number(todayMonth) ||
        (Number(month) + 1 === Number(todayMonth) && Number(today) <= 7) ||
        (Number(todayMonth) - Number(month) === 89 && Number(today) <= 7)
      ) {
        $("#commentTextarea").css("display", "none");
        console.log("selecte");
        start = moment(arg.start).format("YYYY-MM-DD HH:mm:SS");
        end = moment(arg.end).format("YYYY-MM-DD HH:mm:SS");
        allDay = arg.allDay;
        console.log(start);
        console.log(end);
        document.getElementById("start").value = start;
        document.getElementById("end").value = end;
        //modal.style.display = "block";
        toggleSideBar();
      } else {
        alert(
          "지난달 업무일지를 작성할 수 있는 기간이 만료되었습니다.\n (예: 작성할 지난달이 10월일경우 11월 7일전까지 등록해야 함.)"
        );
      }
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
      $(".tooltip").remove();
    },
    customButtons: {
      prev: {
        text: "Prev",
        click: async function () {
          console.log("PREV");
          calendar.prev();
          calendar.removeAllEvents();
          //console.log(dateStart);
          if (dateType === "month") {
            const temp = calendar.getDate();
            const calendarDate = moment(temp).format("YYYY-MM");
            console.log(calendarDate);
            //console.log(window.location.href);
            //console.log(window.location.pathname);
            const res = await axios({
              method: "get",
              url: "/customJournal",
              params: {
                calendarDate,
                url: window.location.pathname,
                order,
                menuName,
                flag,
              },
              timeout: 15000,
            });
            console.log(res.data.journal);
            res.data.journal.forEach((element) => {
              calendar.addEvent(element);
            });
            calendar.unselect();
          } else {
            const calendarDate = calendar.getDate().toISOString();
            const startDate = moment(calendarDate).format("YYYY-MM-DD");
            let calendarDateEnd = calendar.getDate();
            let end = calendarDateEnd.getDay() + 7;
            const endDate = moment(end).format("YYYY-MM-DD");
            const res = await axios({
              method: "get",
              url: "/customWeekJournal",
              params: {
                startDate,
                endDate,
                url: window.location.pathname,
                order,
                menuName,
                flag,
              },
              timeout: 15000,
            });
            console.log(res.data.journal);
            res.data.journal.forEach((element) => {
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
          if (dateType === "month") {
            const temp = calendar.getDate();
            const calendarDate = moment(temp).format("YYYY-MM");
            console.log(calendarDate);

            //console.log(window.location.href);
            //console.log(window.location.pathname);
            const res = await axios({
              method: "get",
              url: "/customJournal",
              params: {
                calendarDate,
                url: window.location.pathname,
                order,
                menuName,
                flag,
              },
              timeout: 15000,
            });
            console.log(res.data.journal);
            res.data.journal.forEach((element) => {
              calendar.addEvent(element);
            });
            calendar.unselect();
          } else {
            const calendarDate = calendar.getDate().toISOString();
            const startDate = moment(calendarDate).format("YYYY-MM-DD");
            let calendarDateEnd = calendar.getDate();
            let end = calendarDateEnd.getDay() + 7;
            const endDate = moment(end).format("YYYY-MM-DD");
            const res = await axios({
              method: "get",
              url: "/customWeekJournal",
              params: {
                startDate,
                endDate,
                url: window.location.pathname,
                order,
                menuName,
                flag,
              },
              timeout: 15000,
            });
            console.log(res.data.journal);
            res.data.journal.forEach((element) => {
              calendar.addEvent(element);
            });
            calendar.unselect();
          }
        },
      },
      timeGridWeek: {
        text: "Week",
        click: function () {
          calendar.changeView("timeGridWeek");
          dateType = "week";
        },
      },
      listWeek: {
        text: "List Week",
        click: function () {
          calendar.changeView("listWeek");
          dateType = "week";
        },
      },
      dayGridMonth: {
        text: "Month",
        click: function () {
          calendar.changeView("dayGridMonth");
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

// function toggleModal() {
//   modal.classList.toggle("show-modal");
// }

function toggleSideBar() {
  $("html").addClass("active");
}

async function addParam() {
  if (asyncValue && editor.getData()) {
    asyncValue = false;
    //title = document.getElementById("title").value;
    description = editor.getData();
    const singleFile = document.getElementById("singleFile");
    console.log(singleFile.files[0]);
    let formData = new FormData();
    formData.append("start", start);
    formData.append("end", end);
    formData.append("allDay", allDay);
    formData.append("color", color);
    formData.append("user", user);
    formData.append("department", department);
    formData.append("description", description);
    formData.append("singleFile", singleFile.files[0]);

    const res = await axios({
      method: "post",
      url: "/addJournal",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 15000,
    });

    if (res.status === 201) {
      //console.log(res.data.id);
      viewAddEvents(res.data.id);
      //calendar.refetchEvents();
      console.log("저장완료! id:" + res.data.id);
      console.log(res.data.filePath);
      console.log(res.data.fileName);
      if (res.data.fileId) {
        const pushData = {
          _id: res.data.id,
          id: res.data.id,
          text: description,
          start,
          end,
          allDay,
          department,
          user,
          color,
          file: {
            _id: res.data.fileId,
            originalname: res.data.fileName,
            path: res.data.filePath,
          },
          comments: [],
        };
        scheduleData.push(pushData);
      } else {
        const pushData = {
          _id: res.data.id,
          id: res.data.id,
          text: description,
          start,
          end,
          allDay,
          department,
          user,
          color,
          comments: [],
        };
        scheduleData.push(pushData);
      }
    }
    asyncValue = true;
    
  }
}

function viewAddEvents(id) {
  if (description) {
    globalCalendar.addEvent({
      id,
      title: userName,
      start,
      end,
      allDay,
      description,
      //url,
      color,
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
  editor.isReadOnly = false;
  location.reload();
}

async function updateParam(id) {
  if (asyncValue && editor.getData()) {
    asyncValue = false;
    console.log("updateParam----");
    console.log(id);
    const resDel = await axios({
      method: "delete",
      url: "/deleteJournal",
      data: { id },
      timeout: 15000,
    });
    if (resDel.status === 200) {
      console.log("삭제완료!");
      const element = globalCalendar.getEventById(id);
      element.remove();
    }

    //title = document.getElementById("title").value;
    description = editor.getData();
    const singleFile = document.getElementById("singleFile");
    console.log(singleFile.files[0]);
    let formData = new FormData();
    formData.append("start", start);
    formData.append("end", end);
    formData.append("allDay", allDay);
    formData.append("color", color);
    formData.append("user", user);
    formData.append("department", department);
    formData.append("description", description);
    formData.append("singleFile", singleFile.files[0]);
    const res = await axios({
      method: "post",
      url: "/addJournal",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 15000,
    });

    if (res.status === 201) {
      console.log(res.data.id);
      viewAddEvents(res.data.id);
      console.log("저장완료! id:" + res.data.id);
    }
    asyncValue = true;
  }
}

async function addComment() {
  if (globalId && document.getElementById("content").value) {
    const form_data = {
      user,
      journalId: globalId,
      commentText: document.getElementById("content").value,
    };
    const res = await axios({
      method: "post",
      url: "/addComment",
      data: form_data,
      timeout: 15000,
    });

    if (res.status === 200) {
      console.log("저장완료! id:" + res.data.id);
      const comment = document.querySelector("#comment");
      const divCommentColumn = document.createElement("div");
      divCommentColumn.setAttribute("class", "commentColumn bolder");
      divCommentColumn.setAttribute("id", "lv1_" + res.data.id);
      const divRow1 = document.createElement("div");
      divRow1.setAttribute("class", "row");
      divRow1.setAttribute("id", "lv2_" + res.data.id);
      divRow1.innerText = form_data.commentText;
      const divRow2 = document.createElement("div");
      divRow2.setAttribute("class", "row");
      const span1 = document.createElement("span");
      span1.innerText = res.data.user?.name;
      const span2 = document.createElement("span");
      span2.innerText = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
      const a1 = document.createElement("a");
      a1.setAttribute("class", "commentBtn");
      a1.setAttribute("href", "#");
      a1.dataset.id = res.data.id;
      a1.setAttribute("id", "editCommentFormComponent");
      a1.innerText = "수정";
      const a2 = document.createElement("a");
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
      a1.addEventListener("click", () => editCommentForm(res.data.id));
      a2.addEventListener("click", () => deleteComment(res.data.id));
      $("#content").val("");
      //console.log(window.location.href);
      let temp = window.location.search;
      const param = temp.split("=");
      //location.href = `/journal?order=${param[1]}`;
      location.replace(`/journal?order=${param[1]}`);
      $("#close-menu").trigger("click");
    }
  }
}

function clickEdit(id) {
  $(".pull-right > .btn").remove();
  editor.isReadOnly = false;
  //editor.setData(contentDescription);
  $(".file a").remove();
  $("#singleFile").remove();
  $("#divFile").css("display", "block");
  $(".file").append(`
      <input type="file" id="singleFile" />
    `);
  $("#submitDiv").append(`
      <button class="btn" id="submit">보내기</button>
    `);
  const submitBtn = document.querySelector("#submit");
  submitBtn.removeEventListener("click", addParam);
  submitBtn.addEventListener("click", () => updateParam(id));
}

async function clickDelete(id) {
  if (confirm("일일업무를 삭제하시겠습니까?")) {
    if (asyncValue && editor.getData()) {
      asyncValue = false;
      console.log("updateParam----");
      console.log(id);
      const resDel = await axios({
        method: "delete",
        url: "/deleteJournal",
        data: { id },
        timeout: 15000,
      });
      if (resDel.status === 200) {
        console.log("삭제완료!");
        const element = globalCalendar.getEventById(id);
        element.remove();
        $("#overlay").trigger("click");
      }
      asyncValue = true;
    }
  }
}

function editCommentForm(replyId) {
  console.log("-------edit-------");
  console.log(replyId);
  let content = $("#lv2_" + replyId).text();
  $("#lv1_" + replyId).empty();
  const editComponent = document.querySelector("#lv1_" + replyId);
  console.log(editComponent);
  const commentSaveBtn = document.createElement("div");
  const textarea = document.createElement("textarea");
  textarea.setAttribute("name", "content");
  textarea.setAttribute("id", "content_" + replyId);
  textarea.setAttribute("cols", "30%");
  textarea.setAttribute("rows", "5");
  textarea.innerText = content;
  const button = document.createElement("button");
  button.setAttribute("id", "commentSaveBtn_" + replyId);
  button.setAttribute("class", "button");
  button.innerText = "답변하기";
  commentSaveBtn.appendChild(textarea);
  commentSaveBtn.appendChild(button);
  editComponent.appendChild(commentSaveBtn);
  button.addEventListener("click", () => editComment(replyId));
}

async function editComment(replyId) {
  if (replyId) {
    const form_data = {
      user,
      journalId: globalId,
      commentText: document.getElementById("content_" + replyId).value,
      commentId: replyId,
    };

    const res = await axios({
      method: "patch",
      url: `/editComment`,
      data: form_data,
      timeout: 15000,
    });
    if (res.status === 200) {
      $("#lv1_" + replyId).remove();
      const comment = document.querySelector("#comment");
      const divCommentColumn = document.createElement("div");
      divCommentColumn.setAttribute("class", "commentColumn bolder");
      divCommentColumn.setAttribute("id", "lv1_" + res.data.id);
      const divRow1 = document.createElement("div");
      divRow1.setAttribute("class", "row");
      divRow1.setAttribute("id", "lv2_" + res.data.id);
      divRow1.innerText = form_data.commentText;
      const divRow2 = document.createElement("div");
      divRow2.setAttribute("class", "row");
      const span1 = document.createElement("span");
      span1.innerText = res.data.user?.name;
      const span2 = document.createElement("span");
      span2.innerText = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
      const a1 = document.createElement("a");
      a1.setAttribute("class", "commentBtn");
      a1.setAttribute("href", "#");
      a1.dataset.id = res.data.id;
      a1.setAttribute("id", "editCommentFormComponent");
      a1.innerText = "수정";
      const a2 = document.createElement("a");
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
      a1.removeEventListener("click", () => editCommentForm(res.data.id));
      a2.removeEventListener("click", () => deleteComment(res.data.id));
      a1.addEventListener("click", () => editCommentForm(res.data.id));
      a2.addEventListener("click", () => deleteComment(res.data.id));
      $("#content").val("");
      let temp = window.location.search;
      const param = temp.split("=");
      location.replace(`/journal?order=${param[1]}`);
      $("#close-menu").trigger("click");
    }
  }
}

async function deleteComment(replyId) {
  //console.log('deleteComment-----');
  //console.log(replyId);
  const form_data = {
    commentId: replyId,
  };
  const res = await axios({
    method: "delete",
    url: "/deleteComment",
    data: form_data,
    timeout: 15000,
  });
  if (res.status === 200) {
    console.log("삭제성공!");
    $("#lv1_" + replyId).remove();
  }
}

// sideBar event
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
    editor.isReadOnly = false;
    $(".file > a").remove();
    $("#singleFile").remove();
    $("#submit").remove();
    $(".file").append(`
      <input type="file" id="singleFile" />
    `);
    $("#submitDiv").append(`
      <button id="submit" class="btn">보내기</button>
    `);
    const submitBtn = document.querySelector("#submit");
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
    editor.isReadOnly = false;
    $(".file > a").remove();
    $("#singleFile").remove();
    $("#submit").remove();
    $(".file").append(`
      <input type="file" id="singleFile" />
    `);
    $("#submitDiv").append(`
      <button id="submit" class="btn">보내기</button>
    `);
    const submitBtn = document.querySelector("#submit");
    submitBtn.addEventListener("click", addParam);
    globalId = null;
    $("#comment").empty();
  });

  $(document).on("click", "#fileDownload", function () {
    $.ajax({
      type: "get",
      url: `/download/${scheduleData[index].file._id}`,
      success: function (response) {
        var a = document.createElement("a");
        const url = window.location.hostname;
        console.log(url);
        if (url.indexOf("localhost") !== -1) {
          a.href = `http://localhost:4500/uploads/files/${scheduleData[index].file.originalname}`;
        } else {
          a.href = `https://master-piece-r.herokuapp.com/uploads/files/${scheduleData[index].file.originalname}`;
        }
        // Set the file name
        a.download = scheduleData[index].file.originalname;
        a.click();
      },
      error: function (xhr) {
        console.log(xhr);
      },
    }).fail(function () {
      alert("fail");
    });
  });
});
