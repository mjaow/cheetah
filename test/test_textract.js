var textract=require("textract");

var filePath="E:/book/java/ActiveMQ in Action.pdf";
textract.fromFileWithPath(filePath, function( error, text ) {
    if(error){
        console.error(error);
    }else{
        console.log(text);
    }
});

console.log("----");