var express=require('express');
var searcher=require('../lib/searcher');
var router=express.Router();

router.get('/',function(req,res,next){
    res.status(200).json({
        count:searcher.file_count()
    });
});

module.exports=router;