import { drop } from "lodash";
import "regenerator-runtime";
import { async } from "regenerator-runtime";

//import "../scss/styles.scss";
const department = JSON.parse(document.getElementById("department").value);
const weatherStr = document.getElementById("weather").value;
const alam = document.getElementById("sound");

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
    if (result == "denied") {
      alert(
        "알림을 차단하셨습니다.\n브라우저의 사이트 설정에서 변경하실 수 있습니다."
      );
      return false;
    }
  });
  weather();
}

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

var pusher = new Pusher("661fe6afce5e5f839f4a", {
  cluster: "ap3",
});
console.log(department._id);
var channel = pusher.subscribe(department._id + "");
channel.bind(department._id + "", function (data) {
  //alert(JSON.stringify(data));
  const options = {
    body: data.message,
    icon: "/static/img/alamPush.png",
    image: "/static/img/animalPush.png",
  };
  const notification = new Notification("일정등록알림", options);
  alam.play();
  setTimeout(function () {
    notification.close();
  }, 999000);
  location.href = "/schedule";
});

var pusherNotice = new Pusher("661fe6afce5e5f839f4a", {
  cluster: "ap3",
});
var channelNotice = pusherNotice.subscribe("noticeAll");
channelNotice.bind("noticeAlram", function (data) {
  //alert(JSON.stringify(data));
  const options = {
    body: data.message,
    icon: "/static/img/alamPush.png",
    image: "/static/img/animalPush.png",
  };
  const notification = new Notification("공지사항알림", options);
  alam.play();
  setTimeout(function () {
    notification.close();
  }, 999000);
  location.href = "/noticeBoardList";
});


var pusherMorning = new Pusher("661fe6afce5e5f839f4a", {
  cluster: "ap3",
});
var channelMorning = pusherMorning.subscribe("morningAllDay_" + department._id);
channelMorning.bind("morningAllDay_+" + department._id, function (data) {
  console.log(data);
  const options = {
    body: data.message,
    icon: "/static/img/alamPush.png",
    image: "/static/img/animalPush.png",
  };
  const notification = new Notification("일정알림", options);
  alam.play();
  setTimeout(function () {
    notification.close();
  }, 999000);
});

var pusherTime = new Pusher("661fe6afce5e5f839f4a", {
  cluster: "ap3",
});
var channelTime = pusherTime.subscribe("timeAlram_" + department._id);
channelTime.bind("timeAlram_+" + department._id, function (data) {
  console.log(data);
  const options = {
    body: data.message,
    icon: "/static/img/alamPush.png",
    image: "/static/img/animalPush.png",
  };
  const notification = new Notification("일정알림", options);
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
    const cloud = document.querySelector("#clouds");
    cloud.style.display = "block";
    makeItRain();
  } else if (
    weatherStr === "Snow" ||
    weatherStr === "Rain/Snow" ||
    weatherStr === "Snow/Rain" ||
    weatherStr === "Shower"
  ) {
    $(document).snowfall({
      image: "/static/img/flake.png",
      minSize: 3,
      maxSize: 10,
      flakeCount: 120,
    });
    //snonwSound.play();
  } else if (weatherStr === "Cloudy") {
    const cloud = document.querySelector("#clouds");
    cloud.style.display = "block";
  } else if (weatherStr === "Mostly Cloudy") {
    const cloud = document.querySelector("#clouds");
    cloud.style.display = "block";
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
  $("body").css({"background":"linear-gradient(to bottom, #5821f0, #080847)","background-attachment":"fixed"});
  while (increment < 100) {
    //couple random numbers to use for various randomizations
    //random number between 98 and 1
    var randoHundo = Math.floor(Math.random() * (98 - 1 + 1) + 1);
    //random number between 5 and 2
    var randoFiver = Math.floor(Math.random() * (5 - 2 + 1) + 2);
    //increment
    increment += randoFiver;
    //add in a new raindrop with various randomizations to certain CSS properties
    drops +=
      '<div class="drop" style="left: ' +
      increment +
      "%; bottom: " +
      (randoFiver + randoFiver - 1 + 100) +
      "%; animation-delay: 0." +
      randoHundo +
      "s; animation-duration: 0.5" +
      randoHundo +
      's;"><div class="stem" style="animation-delay: 0.' +
      randoHundo +
      "s; animation-duration: 0.5" +
      randoHundo +
      's;"></div><div class="splat" style="animation-delay: 0.' +
      randoHundo +
      "s; animation-duration: 0.5" +
      randoHundo +
      's;"></div></div>';
    backDrops +=
      '<div class="drop" style="right: ' +
      increment +
      "%; bottom: " +
      (randoFiver + randoFiver - 1 + 100) +
      "%; animation-delay: 0." +
      randoHundo +
      "s; animation-duration: 0.5" +
      randoHundo +
      's;"><div class="stem" style="animation-delay: 0.' +
      randoHundo +
      "s; animation-duration: 0.5" +
      randoHundo +
      's;"></div><div class="splat" style="animation-delay: 0.' +
      randoHundo +
      "s; animation-duration: 0.5" +
      randoHundo +
      's;"></div></div>';
  }

  $(".rain.front-row").append(drops);
  $(".rain.back-row").append(backDrops);
}

const currentPosition = parseInt($(".sidemenu").css("top"));
$(window).scroll(function () {
  const position = $(window).scrollTop();
  $(".sidemenu")
    .stop()
    .animate({ top: position + currentPosition + "px" }, 1000);
});
