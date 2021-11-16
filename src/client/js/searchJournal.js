import moment, { parseTwoDigitYear } from "moment";
import axios from "axios";
import { async } from "regenerator-runtime";

let startDate, endDate;
$(document).ready(function () {
  $("#searchDate").daterangepicker(
    {
      locale: {
        format: "YYYY-MM-DD",
        separator: " ~ ",
        applyLabel: "확인",
        cancelLabel: "취소",
        fromLabel: "From",
        toLabel: "To",
        customRangeLabel: "Custom",
        weekLabel: "W",
        daysOfWeek: ["월", "화", "수", "목", "금", "토", "일"],
        monthNames: [
          "1월",
          "2월",
          "3월",
          "4월",
          "5월",
          "6월",
          "7월",
          "8월",
          "9월",
          "10월",
          "11월",
          "12월",
        ],
        firstDay: 6,
      },
      startDate: startDate
        ? startDate
        : moment(new Date()).format("YYYY-MM-DD"),
      endDate: endDate ? endDate : moment(new Date()).format("YYYY-MM-DD"),
      drops: "auto",
    },
    function (start, end, label) {
      console.log("live~~~~~~~");
      startDate = start.format("YYYY-MM-DD");
      endDate = end.format("YYYY-MM-DD");
      console.log(
        "New date range selected: " +
          start.format("YYYY-MM-DD") +
          " to " +
          end.format("YYYY-MM-DD") +
          " (predefined range: " +
          label +
          ")"
      );
    }
  );
  $("div.daterangepicker").hide();
  $("#searchDate").click(function () {
    $("div.daterangepicker").show();
  });
  //tableSearch();
  $("#searchBtn").click(function () {
    tableSearch();
  });
  $("#partId").click(function () {
    tableSearch();
  });
  $("#name").keydown(function (key) {
    if (key.keyCode == 13) {
      tableSearch();
    }
  });
  $("#email").keydown(function (key) {
    if (key.keyCode == 13) {
      tableSearch();
    }
  });
  $("#excelBtn").click(async function () {
    const form_data = {
      departmentId: $("#partId option:selected").val(),
      userName: $("#name").val(),
      email: $("#email").val(),
      startDate,
      endDate,
    };
    //console.log(startDate, endDate);
    const res = await axios({
      method: "post",
      url: "/excelDownload",
      headers: {
        "Content-Disposition": "attachment; filename=userInfoLIst.xlsx",
      },
      data: form_data,
      // xhrFields: {
      //   responseType: "blob",
      // },
      timeout: 15000,
    });
    //console.log(res);
    //let blob = new Blob([s2ab(res.data)],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
    //console.log(blob);
    let a = document.createElement("a");
    //let url = window.URL.createObjectURL(blob);
    let url = "./excel/temp.xlsx";
    a.href = url;
    //Set the file name
    a.download =
      "일일업무조회_" + moment(new Date()).format("YYYY-MM-DD") + ".xlsx";
    a.click();
  });
});

function s2ab(s) {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
  return buf;
}

const lang_kor = {
  decimal: "",
  emptyTable: "데이터가 없습니다.",
  info: "_START_ - _END_ (총 _TOTAL_ 건)",
  infoEmpty: "0건",
  infoFiltered: "(전체 _MAX_ 건 중 검색결과)",
  infoPostFix: "",
  thousands: ",",
  lengthMenu: "_MENU_ 개씩",
  loadingRecords: "로딩중...",
  processing: "처리중...",
  search: "검색 : ",
  zeroRecords: "검색된 데이터가 없습니다.",
  paginate: {
    first: "첫 페이지",
    last: "마지막 페이지",
    next: "다음",
    previous: "이전",
  },
  aria: {
    sortAscending: " :  오름차순 정렬",
    sortDescending: " :  내림차순 정렬",
  },
};

async function tableSearch() {
  const form_data = {
    departmentId: $("#partId option:selected").val(),
    userName: $("#name").val(),
    email: $("#email").val(),
    startDate,
    endDate,
  };

  console.log(form_data);

  $("#journal").DataTable({
    paging: true,
    pageLength: 10,
    processing: true,
    serverSide: true,
    destroy: true,
    searching: false,
    language: lang_kor,
    ajax: {
      data: "json",
      type: "post",
      url: "/postSearchJournal",
      data: form_data,
      dataSrc: function (res) {
        console.log(res);
        
        return res.data;
      },
    },columnDefs: [
      {
        targets: [2],
        orderable: false,
        searchable: false,
        render: function (data, type, row, meta) {
          console.log('----------------');
          console.log(row);
          return row.position ? row.position : '';
        },
      },
    ],
    columns: [
      { data: "title", title: "작성자" },
      { data: "department.name", title: "부서" },
      { data: "position", title: "직책" },
      { data: "description", title: "업무내용" },
      { data: "start", title: "시작일자" },
      { data: "end", title: "종료일자" },
      { data: "createdAt", title: "생성일자" },
    ],
    error: function (xhr, error, code) {
      console.log(xhr);
      console.log(code);
    },
  });
}
