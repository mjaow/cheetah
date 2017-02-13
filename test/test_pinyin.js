var pinyin=require('pinyin');

var key="java性能优化权威指南.pdf";

var start=new Date().getTime();
var py=pinyin(key,{heteronym: true,style:pinyin.STYLE_NORMAL});
var end=new Date().getTime();
console.log((end-start)+"ms");
console.log(py);