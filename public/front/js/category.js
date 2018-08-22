$(function(){
  $.ajax({
    type:'get',
    url:'/category/queryTopCategory',
    dataType:'json',
    success:function(info){
      // console.log(info);
      var htmlStr = template('left-tpl',info);
      $('.lt-main .lt-cate-left ul').html(htmlStr);
      setProduct(info.rows[0].id);
    }
  })

  $('.lt-main .lt-cate-left ul').on('click','a',function(){
    $(this).addClass('current').parent().siblings().find('a').removeClass('current');
    var id = $(this).data('id');
    setProduct(id);
  })


  function setProduct(id){
    $.ajax({
      type:'get',
      url:'/category/querySecondCategory',
      data:{id:id},
      dataType:'json',
      success:function(info){
        // console.log(info);
        var htmlStr = template('right-tpl',info);
        $('.lt-main .lt-cate-right ul').html(htmlStr);
      }
    })
  }



})