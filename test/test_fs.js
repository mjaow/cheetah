var fs=require('fs');


fs.readdir('e:',function(err,files){
    if(err){
        throw new Error(err);
    }else{
        console.log(files);
    }
});