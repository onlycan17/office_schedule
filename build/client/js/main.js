"use strict";

require("regenerator-runtime");

//import "../scss/styles.scss";
var department = JSON.parse(document.getElementById("department").value);
getNotificationPermission(); //알림 권한 요청

function getNotificationPermission() {
  // 브라우저 지원 여부 체크
  if (!("Notification" in window)) {
    alert("데스크톱 알림을 지원하지 않는 브라우저입니다.");
  } // 데스크탑 알림 권한 요청


  Notification.requestPermission(function (result) {
    // 권한 거절
    if (result == 'denied') {
      alert('알림을 차단하셨습니다.\n브라우저의 사이트 설정에서 변경하실 수 있습니다.');
      return false;
    }
  });
} // Enable pusher logging - don't include this in production


Pusher.logToConsole = true;
var pusher = new Pusher('661fe6afce5e5f839f4a', {
  cluster: 'ap3'
});
console.log(department._id);
var channel = pusher.subscribe(department._id + "");
channel.bind(department._id + "", function (data) {
  //alert(JSON.stringify(data));
  new Notification("스케줄알림", {
    body: data.message
  });
});