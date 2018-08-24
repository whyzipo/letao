$(function(){
  var productId = getSearch('productId');

  render();
  function render(){

    $.ajax({
      type:'get',
      url:'/product/queryProductDetail',
      data:{id:productId},
      dataType:'json',
      success:function(info){
        console.log(info);
        var htmlStr = template('tpl',info);
        $(".lt-main .mui-scroll").html(htmlStr);

        var gallery = mui('.mui-slider');
          gallery.slider({
          interval:5000,
        });
        mui('.mui-numbox').numbox();
      }
    })
  }


  $('.lt-main').on('click','.pro-size span',function(){
    $(this).addClass('current').siblings().removeClass('current');
  })


  $('.addToCart').on('click',function(){
    console.log(111);
    
    var size = $('.lt-main .pro-size span.current').text();
    var num = $('.pro-num mui-numbox-input').val();
    if(!size){
      mui.toast('请选择尺码');
      return;
    }
    $.ajax({
      type:'post',
      url:'/cart/addCart',
      data:{
        productId:productId,
        size:size,
        num:num,
      },
      dataType:'json',
      success:function(info){
        if(info.error === 400){
          location.href = "login.html?retUrl=" + location.href;
        }
        if(info.success){
          mui.confirm('添加成功','温馨提示',['去购物车','继续浏览'],function(e){
            if(e.index === 0){
              location.href = 'cart.html'
            }
          })
        }
      }
    })



  })


})