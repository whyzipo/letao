$(function(){ 
  var currentPage = 1,pageSize = 5;
  render();
  function render(){
    $.ajax({
      type:'get',
      url:'/category/querySecondCategoryPaging',
      data:{page:currentPage,pageSize:pageSize},
      dataType:'json',
      success:function(info){
        console.log(info);  
        var htmlStr = template('tpl',info);
        $('.lt-content tbody').html(htmlStr);

        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:info.page,
          totalPages:Math.ceil(info.total/info.size),

          onPageClicked:function(a,b,c,page){
            currentPage = page;
            render();
          }
        })
      }
    })
  }

  $('#addBtn').click(function(){
    $('#addModal').modal('show');
    $.ajax({
      type:'get',
      url:'/category/queryTopCategoryPaging',
      data:{page:1,pageSize:100},
      dataType:'json',
      success:function(info){
        console.log(info);
        var htmlStr = template('first_cate',info);
        $('#dropdown-menu').html(htmlStr);
      }
    })
  })

  $('#dropdown-menu').on('click','a',function(){
    var txt = $(this).text();
    $('.btn_text').text(txt);
  })

  $("#updateImg").fileupload({
    dataType:"json",
    done:function (e, data) {
      // console.log(data.result.picAddr);
      $('#imgBox img').attr('src',data.result.picAddr);
    }
  });

  // $('#form').bootstrapValidator({
  //   feedbackIcons:{
  //     valid: 'glyphicon glyphicon-ok',
  //     invalid: 'glyphicon glyphicon-remove',
  //     validating: 'glyphicon glyphicon-refresh'
  //   },
  //   fields:{

  //   }
  // })

  // $('#submitBtn').click(function(){
  //   $.ajax({
  //     type:'post',
  //     url:'/category/addSecondCategory',
  //     data:{},
  //     dataType:'json',
  //     success:function(info){
  //       console.log(info);
        
  //     }
  //   })
  // })

})