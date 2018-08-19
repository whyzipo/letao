$(function(){
  var currentPage = 1,pageSize = 5;
  render();
  function render(){
    $.ajax({
      type:'get',
      url: '/category/queryTopCategoryPaging',
      data: {page:currentPage,pageSize:pageSize},
      dataType:'json',
      success:function(info){
        // console.log(info);
        var htmlStr = template('tpl',info);
        $('.lt-content tbody').html(htmlStr);

        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage: info.page,
          totalPages: Math.ceil(info.total/info.size),
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
  })

  $('#form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      categoryName:{
        validators:{
          notEmpty:{
            message:'请输入一级分类名称',
          }
        }
      }
    }
  })

  $('#form').on('success.form.bv',function(e){
    e.preventDefault();
    $.ajax({
      type:'post',
      url:'/category/addTopCategory',
      data:$('#form').serialize(),
      dataType:'json',
      success:function(info){
        // console.log(info);
        if(info.success){
          currentPage = 1;
          render();
          $('#form').data('bootstrapValidator').resetForm(true);
          $('#addModal').modal('hide');
        }
      }
    })
  })
  




})