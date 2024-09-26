"use strict";

var _lodash = require("lodash");
var _regeneratorRuntime = require("regenerator-runtime");
//import "../scss/styles.scss";
var department = JSON.parse(document.getElementById("department").value);
var weatherStr = document.getElementById("weather").value;
var alam = document.getElementById("sound");
var userMenu = JSON.parse(document.getElementById("menuList").value);
var userId = document.getElementById("userId").value;

//console.log('userId-------');
//console.log(userId);

getNotificationPermission();
//알림 권한 요청
function getNotificationPermission() {
  // 브라우저 지원 여부 체크
  if (!("Notification" in window)) {
    alert("데스크톱 알림을 지원하지 않는 브라우저입니다.");
  }
  // 데스크탑 알림 권한 요청
  Notification.requestPermission(function (result) {
    // 권한 거절
    if (result == "denied" && localStorage.getItem("alarm") == "on") {
      alert("알림을 차단하셨습니다.\n브라우저의 사이트 설정에서 변경하실 수 있습니다.");
      localStorage.setItem("alarm", "on");
      return false;
    }
  });
  weather();
}

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;
var pusherSchedule = new Pusher("661fe6afce5e5f839f4a", {
  cluster: "ap3"
});
console.log(department._id);
var channelSchedule = pusherSchedule.subscribe(department._id + "");
channelSchedule.bind(department._id + "", function (data) {
  //alert(JSON.stringify(data));
  var options = {
    body: data.message,
    icon: "/static/img/alamPush.png",
    image: "/static/img/animalPush.png"
  };
  var notification = new Notification("일정등록알림", options);
  alam.play();
  setTimeout(function () {
    notification.close();
  }, 999000);
  var temp = window.location.search;
  var param = temp.split("=");
  location.replace("/schedule?order=".concat(param[1]));
});

//차량신청 알림
var pusherBongGo = new Pusher("661fe6afce5e5f839f4a", {
  cluster: "ap3"
});
console.log(department._id);
//var channel = pusher.subscribe(department._id + "");
var channelBonGo = pusherBongGo.subscribe("6110e83e4d79e34e8bff0e44_612490cc21f010838f50a41b");
var channel_bongo_str = "6110e83e4d79e34e8bff0e44_612490cc21f010838f50a41b";
console.log(department + "");
if (channel_bongo_str.search(department._id + "") !== -1) {
  channelBonGo.bind("6110e83e4d79e34e8bff0e44_612490cc21f010838f50a41b", function (data) {
    //alert(JSON.stringify(data));
    var options = {
      body: data.message,
      icon: "/static/img/alamPush.png",
      image: "/static/img/animalPush.png"
    };
    var notification = new Notification("차량예약신청알림", options);
    alam.play();
    setTimeout(function () {
      notification.close();
    }, 999000);
    //let temp = window.location.search;
    var param = temp.split("=");
    location.replace("/bongoCar?order=".concat(param[1]));
  });
}

// 공지사항 알림
var pusherNotice = new Pusher("661fe6afce5e5f839f4a", {
  cluster: "ap3"
});
var channelNotice = pusherNotice.subscribe("noticeAll");
channelNotice.bind("noticeAlram", function (data) {
  //alert(JSON.stringify(data));
  var options = {
    body: data.message,
    icon: "/static/img/alamPush.png",
    image: "/static/img/animalPush.png"
  };
  var notification = new Notification("공지사항알림", options);
  alam.play();
  setTimeout(function () {
    notification.close();
  }, 999000);
  //location.href = "/noticeBoardList";
});

// 명작 식단표 알림
var pusherMeal = new Pusher("661fe6afce5e5f839f4a", {
  cluster: "ap3"
});
var channelMeal = pusherMeal.subscribe("mealAllPush");
channelMeal.bind("mealAllPush", function (data) {
  //alert(JSON.stringify(data));
  var options = {
    body: data.message,
    icon: "/static/img/alamPush.png",
    image: "/static/img/animalPush.png"
  };
  var notification = new Notification("오늘의메뉴", options);
  alam.play();
  setTimeout(function () {
    notification.close();
  }, 999000);
  //location.href = "/noticeBoardList";
});

//일일업무 댓글 알림
var pusherJournalComment = new Pusher("661fe6afce5e5f839f4a", {
  cluster: "ap3"
});
var channelJournalComment = pusherJournalComment.subscribe("" + userId);
channelJournalComment.bind("" + userId, function (data) {
  // alert(JSON.stringify(data));
  var options = {
    body: data.message,
    icon: "/static/img/alamPush.png",
    image: "/static/img/animalPush.png"
  };
  var notification = new Notification("댓글알림", options);
  alam.play();
  setTimeout(function () {
    notification.close();
  }, 999000);
  //location.href = "/noticeBoardList";
});
var pusherMorning = new Pusher("661fe6afce5e5f839f4a", {
  cluster: "ap3"
});
var channelMorning = pusherMorning.subscribe("morningAllDay_" + department._id);
channelMorning.bind("morningAllDay_+" + department._id, function (data) {
  console.log(data);
  var options = {
    body: data.message,
    icon: "/static/img/alamPush.png",
    image: "/static/img/animalPush.png"
  };
  var notification = new Notification("일정알림", options);
  alam.play();
  setTimeout(function () {
    notification.close();
  }, 999000);
});
var pusherTime = new Pusher("661fe6afce5e5f839f4a", {
  cluster: "ap3"
});
var channelTime = pusherTime.subscribe("timeAlram_" + department._id);
channelTime.bind("timeAlram_+" + department._id, function (data) {
  console.log(data);
  var options = {
    body: data.message,
    icon: "/static/img/alamPush.png",
    image: "/static/img/animalPush.png"
  };
  var notification = new Notification("일정알림", options);
  alam.play();
  setTimeout(function () {
    notification.close();
  }, 999000);
});
function weather() {
  // ① Clear
  // ② Mostly Cloudy
  // ③ Cloudy
  // ④ Rain
  // ⑤ Rain/Snow
  // ⑥ Snow
  // ⑦ Shower

  console.log(weatherStr);
  if (weatherStr === "Rain") {
    var cloud = document.querySelector("#clouds");
    cloud.style.display = "block";
    makeItRain();
  } else if (weatherStr === "Snow" || weatherStr === "Rain/Snow" || weatherStr === "Snow/Rain" || weatherStr === "Shower") {
    $(document).snowfall({
      image: "/static/img/flake.png",
      minSize: 3,
      maxSize: 10,
      flakeCount: 120
    });
    //snonwSound.play();
  } else if (weatherStr === "Cloudy") {
    var _cloud = document.querySelector("#clouds");
    _cloud.style.display = "block";
  } else if (weatherStr === "Mostly Cloudy") {
    var _cloud2 = document.querySelector("#clouds");
    _cloud2.style.display = "block";
    $(".container-sun").css("display", "block");
  } else if (weatherStr === "Clear") {
    $(".container-sun").css("display", "block");
  }
}
function makeItRain() {
  //clear out everything
  $(".rain").empty();
  var increment = 0;
  var drops = "";
  var backDrops = "";
  $("body").css({
    "background": "linear-gradient(to bottom, #5821f0, #080847)",
    "background-attachment": "fixed"
  });
  while (increment < 100) {
    //couple random numbers to use for various randomizations
    //random number between 98 and 1
    var randoHundo = Math.floor(Math.random() * (98 - 1 + 1) + 1);
    //random number between 5 and 2
    var randoFiver = Math.floor(Math.random() * (5 - 2 + 1) + 2);
    //increment
    increment += randoFiver;
    //add in a new raindrop with various randomizations to certain CSS properties
    drops += '<div class="drop" style="left: ' + increment + "%; bottom: " + (randoFiver + randoFiver - 1 + 100) + "%; animation-delay: 0." + randoHundo + "s; animation-duration: 0.5" + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + "s; animation-duration: 0.5" + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + "s; animation-duration: 0.5" + randoHundo + 's;"></div></div>';
    backDrops += '<div class="drop" style="right: ' + increment + "%; bottom: " + (randoFiver + randoFiver - 1 + 100) + "%; animation-delay: 0." + randoHundo + "s; animation-duration: 0.5" + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + "s; animation-duration: 0.5" + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + "s; animation-duration: 0.5" + randoHundo + 's;"></div></div>';
  }
  $(".rain.front-row").append(drops);
  $(".rain.back-row").append(backDrops);
}
var currentPosition = parseInt($(".sidemenu").css("top"));
$(window).scroll(function () {
  var position = $(window).scrollTop();
  $(".sidemenu").stop().animate({
    top: position + currentPosition + "px"
  }, 1000);
});