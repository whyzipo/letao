$(function(){
  var currentPage = 1,pageSize = 2,picArr = [];
  render()
  function render(){
    $.ajax({
      type:'get',
      url:'/product/queryProductDetailList',
      data:{page:currentPage,pageSize:pageSize},
      dataType:'json',
      success:function(info){
        // console.log(info);
        var htmlStr = template('tpl',info);
        $('.lt-content tbody').html(htmlStr);

        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage: info.page,
          size:'normal',
          totalPages:Math.ceil(info.total/info.size),
          itemTexts:function(type, page, current){
            // console.log();
            switch(type){
              case 'first':
                return '首页';
              case 'last':
                return '尾页';
              case 'prev':
                return '上一页';
              case 'next':
                return '下一页';
              case 'page':
                return page;
            }
          },
          onPageClicked:function(a, b, c, page){
            currentPage = page;
            render();
          },
          useBootstrapTooltip:true,
          tooltipTitles:function(type, page, current){
            switch(type){
              case 'first':
                return '首页';
              case 'last':
                return '尾页';
              case 'prev':
                return '上一页';
              case 'next':
                return '下一页';
              case 'page':
                return '第'+page+'页'
            }
          }
        })
      }
    })
  }

  $('#addBtn').on('click',function(){
    $('#addModal').modal('show');
    $.ajax({
      type:'get',
      url:'/category/querySecondCategoryPaging',
      data:{page:1,pageSize:100},
      dataType:'json',
      success:function(info){
        console.log(info);
        
        var htmlStr = template('dropdownId',info);
        $('#dropdown-menu').html(htmlStr);
      }
    })
  })

  $('#dropdown-menu').on('click','a',function(){
    $('.btn_text').text($(this).text());
    $('[name="brandId"]').val($(this).data('id'));
    $('#form').data('bootstrapValidator').updateStatus('brandId','VALID');
  })

  $("#updateImg").fileupload({
    dataType:"json",
    done:function (e, data) {
      console.log(data);
      var picObj = data.result;
      var picAddr = picObj.picAddr;
      $('#imgBox').prepend('<img src="'+ picAddr +'" width="100">')
      picArr.unshift(picObj);
      if(picArr.length > 3){
        picArr.pop();
        $('#imgBox img:last-of-type').remove();
      };
      if(picArr.length === 3){
        $('#form').data('bootstrapValidator').updateStatus('picStatus','VALID');
      }
    }
  })

  $('#form').bootstrapValidator({
    excluded: [],
    feedbackIcons:{
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      brandId:{
        validators:{
          notEmpty:{
            message:'请选择二级分类'
          }
        }
      },
      proName:{
        validators:{
          notEmpty:{
            message:"请输入商品名称"
          }
        }
      },
      proDesc:{
        validators: {
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },
      num:{
        validators:{
          notEmpty:{
            message:'请输入商品库存'
          },
          regexp:{
            regexp:/^[1-9]\d*$/,
            message:'商品库存格式, 必须是非零开头的数字',
          }
        }
      },
      size:{
        validators: {
          notEmpty: {
            message: "请输入商品尺码"
          },
          //正则校验
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '尺码格式, 必须是 32-40'
          }
        }
      },
      oldPrice:{
        validators: {
          notEmpty: {
            message: "请输入商品价格"
          }
        }
      },
      price:{
        validators: {
          notEmpty: {
            message: "请输入商品原价"
          }
        }
      },
      picStatus:{
        validators: {
          notEmpty: {
            message: "请上传3张图片"
          }
        }
      }, 
    }
  })

  $('#form').on('success.form.bv',function(e){
    e.preventDefault();
    var params = $('#form').serialize();
    // console.log(picArr);
    params += '&picName1='+ picArr[0].picName +'&picAddr1=' + picArr[0].picAddr;
    params += '&picName1='+ picArr[1].picName +'&picAddr1=' + picArr[1].picAddr;
    params += '&picName1='+ picArr[2].picName +'&picAddr1=' + picArr[2].picAddr;

    $.ajax({
      type:'post',
      url:'/product/addProduct',
      data:params,
      dataType:'json',
      success:function(info){
        if(info.success){
          $('#addModal').modal('hide');
          $('#form').data('bootstrapValidator').resetForm(true);
          $('.btn_text').text('请选择二级分类');
          $('#imgBox img').remove();
          currentPage = 1;
          render();
          picArr= [];
        }
      }
    })
    
  })
  

})