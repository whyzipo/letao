$(function(){

  $('#loginBtn').click(function(){
    console.log(111);
    
    var username = $('#username').val();
    var password = $('#password').val();
    if(username.trim() === '' || password.trim() === ''){
      mui.toast('请输入完整信息');
      return;
    }
    $.ajax({
      type:'post',
      url:'/user/login',
      data:{
        username:username,
        password:password,
      },
      dataType:'json',
      success:function(info){
        if(info.error){
          mui.toast('用户名或者密码错误');
          return
        }
        if(info.success){
          if(location.search.indexOf("retUrl") > -1){
            var retUrl = location.search.replace('?retUrl','');
            location.href = 'user.html';
          }else{
            location.href = 'user.html';
          }
        }
      }
    })



  })




})