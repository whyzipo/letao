$(function(){
  var currentPage = 1;
  var size = 5;
  render()
  function render(){
    $.ajax({
      type:'get',
      url: '/user/queryUser',
      data: {page:currentPage,pageSize:size},
      success:function(info){
        // console.log(info);
        
        var htmlStr = template('tpl',info)
        $('.lt-content tbody').html(htmlStr); 
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:info.page,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function(event, originalEvent, type,page){
            currentPage = page;
            render();
          }
        });
        
      }
    })
  }

  var userId,isDelete;
  $('.lt-content tbody').on('click','.btn',function(){
    $('#userModal').modal('show');
    userId = $(this).parent().data('id');
    isDelete = $(this).hasClass('btn-danger') ? 0 : 1;
  })

  $('#submitBtn').on('click',function(){
    $.ajax({
      type:'post',
      url:'/user/updateUser',
      data:{id:userId,isDelete:isDelete},
      dataType:'json',
      success:function(info){
        // console.log(info);
        if(info.success){
          $('#userModal').modal('hide');
          currentPage = 1;
          render();
        }
      }
    })
  })
  

})