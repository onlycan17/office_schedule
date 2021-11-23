$(document).ready(function(){
  $("#searchBtn").click(function () {
    tableSearch();
  });
  $("#partId").change(function () {
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
});

function tableSearch(){
  const form_data = {
    departmentId: $("#partId option:selected").val(),
    userName: $("#name").val(),
    email: $("#email").val(),
  };
  console.log(form_data);
  $("#join").DataTable({
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
      url: "/joinList",
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
            // console.log('----------------');
            // console.log(row);
            return (
              `<a href="/join/${row._id}">${row.name}</a>`
            );
          },
        },
        {
          targets: [1],
          orderable: false,
          searchable: false,
          render: function (data, type, row, meta) {
            // console.log('----------------');
            // console.log(row);
            return (
              `<a href="/join/${row._id}">${row.email}</a>`
            );
          },
        },
        {
          targets: [3],
          orderable: false,
          searchable: false,
          render: function (data, type, row, meta) {
            console.log('----------------');
            console.log(row);
            return row.position ? row.position : '';
          },
        },
        {
          targets: [4],
          orderable: false,
          searchable: false,
          render: function (data, type, row, meta) {
            console.log('----------------');
            console.log(row);
            return (
              `<input type="color" disabled value="${row.color}" />` 
            );
          },
        },
      ],
    columns: [
      { data: "name", title: "성명" },
      { data: "email", title: "이메일" },
      { data: "departmentName", title: "부서" },
      { data: "position", title: "직책" },
      { data: "color", title: "컬러" },
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