$(function(){

  function render(){
    setTimeout(function(){
      $.ajax({
        type:'get',
        url:'/cart/queryCart',
        dataType:'json',
        success:function(info){
          console.log(info);
          if(info.error){
            location.href = 'login.html?retUrl='+location.href;
            return;
          }
          var htmlStr = template('tpl',{arr:info});
          $('#mypro-info').html(htmlStr);

          mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
        }
      })
    },2000)
  }

  mui.init({
    pullRefresh : {
      container:".mui-scroll-wrapper",
      down : {
        auto: true,
        callback :function(){
          render();
        }
      }
    }
  });

  $('.lt-main').on('tap','#pro-del',function(){
    var id = $(this).data('id');
    $.ajax({
      type:'get',
      url:'/cart/deleteCart',
      data:{id:[id]},
      dataType:'json',
      success:function(info){
        if(info.success){
          mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
        }
      }
    })
  })





})