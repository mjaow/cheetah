var nodejieba = require("nodejieba");
var result = nodejieba.cut("我爱北京天安门，result天安门上太阳升",true);
for(var i of result){
    console.log("==>"+i);
}