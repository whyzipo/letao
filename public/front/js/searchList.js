

$(function(){
  var key = getSearch('key');
  // console.log(key);
  $('.search-input').val(key);
  render();
  function render(){
    var params ={};
    params.proName = $('.search-input').val();
    params.page = 1;
    params.pageSize = 100;

    var $current = $('.lt-sort a.current');
    if($current.length > 0){
      var sortName = $current.data('type');
      var sortValue = $current.find('i').hasClass('fa-angle-down') ? 2 : 1;
      params[sortName] = sortValue;
    }


    $.ajax({
      type:'get',
      url:'/product/queryProduct',
      data:params,
      dataType:'json',
      success:function(info){
        console.log(info);
        var htmlStr = template('proTpl',info);
        $('.lt-pro ul').html(htmlStr);
      }
    })
  }

  $('.search-btn').on('click',function(){
    var key = $('.search-input').val().trim();
    if(key === ""){
      mui.toast('请输入关键字',{duration:3000})
      return;
    }
    render();

    var history = localStorage.getItem('search_list') || '[]';
    var arr = JSON.parse(history);

    if(arr.indexOf(key) > -1){
      arr.splice(arr.indexOf(key),1)
    }
    if(arr.length >= 10){
      arr.pop();
    }
    arr.unshift(key);

    localStorage.setItem('search_list',JSON.stringify(arr));

  })


  $('.lt-sort a[data-type]').click(function(){
    if($(this).hasClass('current')){
      $(this).find('i').toggleClass('fa-angle-up').toggleClass('fa--angle-down');
    }else{
      $(this).addClass('current').siblings().removeClass('current');
    }

    render();
  })



})