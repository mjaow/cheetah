var textract=require("textract");

var filePath="/Users/loda/Documents/维基百科－黑白棋.doc";
textract.fromFileWithPath(filePath, function( error, text ) {
    if(error){
        console.error(error);
    }else{
        console.log(text);
    }
});

console.log("----");