$(function(){
  $(document).ajaxStart(function(){
    NProgress.start();
  })
  $(document).ajaxStop(function(){
    NProgress.done();
  })

  if(location.href.indexOf('login.html') === -1 ){
    $.ajax({
      type:'get',
      url:'/employee/checkRootLogin',
      dataType:'json',
      success:function(info){
        if(info.error === 400){
          location.href = 'login.html'
        }
      }
    })
  }

  $('.nav .category').click(function(){
    $('.nav .child').stop().slideToggle();
  })

  $('.icon-menu').click(function(){
    $('.lt-aside').toggleClass('hidemenu');
    $('.lt-main').toggleClass('hidemenu');
    $('.lt-topbar').toggleClass('hidemenu');
  })

  $('.icon-logout').click(function(){
    $('#logoutModal').modal("show");
  })

  $('#logoutBtn').click(function(){
    $.ajax({
      type:'get',
      url:'/employee/employeeLogout',
      dataType:'json',
      success:function(info){
        if(info.success){
          location.href = 'login.html';
        }
      }
    })
  })
   
})