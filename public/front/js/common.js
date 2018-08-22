
mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005,
  indicators: false,
});


var gallery = mui('.mui-slider');
gallery.slider({
  interval:5000
});


function getSearch(k){
  var search = decodeURI(location.search);
  var str = search.slice(1);  //key=1&name=pp&age=18
  var arr = str.split("&");   
  var obj ={};
  arr.forEach(function(v,i){
    var keyName = v.split("=")[0];
    var keyvalue = v.split("=")[1];
    obj[keyName] = keyvalue;
  })
  return obj[k];
}