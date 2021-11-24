import moment, { parseTwoDigitYear } from "moment";
import axios from "axios";
import { async } from "regenerator-runtime";

let startDate, endDate;
$(document).ready(function () {
  $('#searchBtn').click(function(e){
    tableSearch();  
  });
  $('#searchTitle').keyup(function(e){
    if(e.keyCode === 13){
      tableSearch();
    }
  });
  $('#addBtn').click(function(e){
    location.href = '/readerBoardListAdd';
  });
  tableSearch();
});

async function tableSearch() {
  const form_data = {
    searchTitle: $("#searchTitle").val(),
    boarGroupId: '1',
  };
  console.log(form_data);

  $("#readerBoard").DataTable({
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
      url: "/readerBoardList",
      data: form_data,
      dataSrc: function (res) {
        console.log(res);
        
        return res.data;
      },
     },
    columnDefs: [
      {
        targets: [0],
        orderable: false,
        searchable: false,
        render: function (data, type, row, meta) {
          //console.log('----------------');
          //console.log(row);
          return `<a href=/readerBoardListDetail/${row._id}>${row.title}</a>`;
        },
      },{
        targets: [2],
        orderable: false,
        searchable: false,
        render: function (data, type, row, meta) {
          //console.log('----------------');
          //console.log(row);
          return moment(row.createdAt).format('YYYY-MM-DD HH:mm:ss');
        },
      },
    ],
    columns: [
      { width:"45%", data: "title", title: "제목" },
      { width:"25%", data: "writer.name", title: "작성자" },
      { width:"30%", data: "createdAt", title: "작성일" },
    ],
    error: function (xhr, error, code) {
      console.log(xhr);
      console.log(code);
    },
  });
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