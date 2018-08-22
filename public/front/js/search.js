$(function(){

  // var arr = [ "耐克", "阿迪", "阿迪王", "耐克王", "新百伦" ];
  // var jsonStr = JSON.stringify( arr );
  // localStorage.setItem( "search_list", jsonStr );
  // localStorage.clear()

  render()
  // 获取本地储存
  function getHistory(){
    var history = localStorage.getItem('search_list') || '[]';
    // console.log(history);
    var arr = JSON.parse(history);
    return arr;
  }
  // 渲染搜索记录
  function render(){
    var arr = getHistory();
    var htmlStr = template('historyTpl',{arr:arr});
    $('.lt-history').html(htmlStr);
  }
  // 清空记录 
  $('.lt-history').on('click','.history-empty',function(){
    mui.confirm('你确定要清空吗？','温馨提示',['取消','确认'],function(e){
      console.log(e);
      if(e.index === 1){
        localStorage.removeItem('search_list');
        render();
      }
    })

  })

  // 删除单条记录
  $('.lt-history').on('click','.history-del',function(){
    var that = this;
    mui.confirm('确定要删除这条搜索记录吗？','温馨提示',['取消','确认'],function(e){
      // console.log(e);
      
      if(e.index === 1){
        var index = $(that).data('index');
        var arr = getHistory();
        arr.splice(index,1);
        var jsonStr = JSON.stringify(arr);
        localStorage.setItem('search_list',jsonStr);
        render();
      }
    })
  })

  // 添加搜索记录
  $('.search-btn').on('click',function(){
    var key = $('.search-input').val().trim();
    if(key === ""){
      mui.toast('请输入搜索关键字',{
        duration:'3000ms',
      })
      return;
    }
    var arr = getHistory();
    if(arr.indexOf(key) > -1){
      arr.splice(arr.indexOf(key),1)
    }
    if(arr.length >= 10){
      arr.pop()
    }
    arr.unshift(key);

    localStorage.setItem('search_list',JSON.stringify(arr));
    render();
    $('.search-input').val("");

    location.href = "searchList.html"

  })



})