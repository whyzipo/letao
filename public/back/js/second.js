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
        // console.log(info);  
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
        // console.log(info);
        var htmlStr = template('first_cate',info);
        $('#dropdown-menu').html(htmlStr);
      }
    })
  })

  $('#dropdown-menu').on('click','a',function(){
    var txt = $(this).text();
    $('.btn_text').text(txt);
    $('[name="categoryId"]').val($(this).data('id'));
    $('#form').data('bootstrapValidator').updateStatus('categoryId','VALID');
  })

  $("#updateImg").fileupload({
    dataType:"json",
    done:function (e, data) {
      // console.log(data.result.picAddr);
      $('#imgBox img').attr('src',data.result.picAddr);
      $('[name="brandLogo"]').val(data.result.picAddr);
      $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID');
    }
  });

  $('#form').bootstrapValidator({
    excluded: [],
    feedbackIcons:{
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      categoryId:{
        validators:{
          notEmpty:{
            message:"请选择一级分类"
          }
        }
      },
      brandName:{
        validators:{
          notEmpty:{
            message:"请输入二级分类"
          }
        }
      },
      brandLogo:{
        validators:{
          notEmpty:{
            message:"请上传图片"
          }
        }
      }
    }
  })

  $('#form').on('success.form.bv',function(e){
    // console.log($('#form').serialize());
    
    e.preventDefault();
    $.ajax({
      type:'post',
      url:'/category/addSecondCategory',
      data:$('#form').serialize(),
      dataType:'json',
      success:function(info){
        if(info.success){
          currentPage = 1;
          render();
          $('#addModal').modal('hide');
          $('#form').data('bootstrapValidator').resetForm(true);
          $('.dropdown .btn_text').text('请选择一级分类');
          $('#imgBox img').attr('src','./images/none.png');
        }
      }
    })
  })

})