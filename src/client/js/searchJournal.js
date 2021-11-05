$(document).ready(function () {
  $("#journal").DataTable({
    paging: true,
    pageLength: 10,
    processing: true,
    serverSide: true,
    destroy: true,
    searching: false,
    language:lang_kor,
    ajax: {
      data: "json",
      type: "post",
      url: "/postSearchJournal",
    },
    dataSrc: function(res){
        console.log(res);
    },
    columns: [
      { data: "title", title: "작성자" },
      { data: "department.name", title: "부서" },
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
});


const lang_kor = {
    "decimal" : "",
    "emptyTable" : "데이터가 없습니다.",
    "info" : "_START_ - _END_ (총 _TOTAL_ 명)",
    "infoEmpty" : "0명",
    "infoFiltered" : "(전체 _MAX_ 명 중 검색결과)",
    "infoPostFix" : "",
    "thousands" : ",",
    "lengthMenu" : "_MENU_ 개씩",
    "loadingRecords" : "로딩중...",
    "processing" : "처리중...",
    "search" : "검색 : ",
    "zeroRecords" : "검색된 데이터가 없습니다.",
    "paginate" : {
        "first" : "첫 페이지",
        "last" : "마지막 페이지",
        "next" : "다음",
        "previous" : "이전"
    },
    "aria" : {
        "sortAscending" : " :  오름차순 정렬",
        "sortDescending" : " :  내림차순 정렬"
    }
};