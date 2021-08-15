
function addAuth(menuId,subMenuId,idx){
  const userId = $('#userAuth_'+subMenuId+' option:selected').val();  
  const departmentId = $('#departmentAuth_'+subMenuId+' option:selected').val();
  if(!userId && !departmentId){
    alert('부서 또는 사용자정보를 선택해 주세요.');
    return false;
  }
  const form_data = {
    menuId,
    subMenuId,
    idx,
    userId,
    departmentId,
  }
  console.log(form_data);
  $.ajax({
    type:"patch",
    url:"/subMenuAuthAdd",
    data:form_data,
    success: function (res){
      console.log(res);
      if(res.message === 'success'){
        alert('저장 되었습니다.');
        location.href = '/menuDetail/'+menuId;
      }
    },
    error: function(xhr){
      console.log(xhr);
    }
  }).fail(function(){
      alert('fail');
  });
}