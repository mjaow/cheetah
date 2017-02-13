var express = require('express');
var child_process = require('child_process');
var System=require('../lib/os_system');
var router = express.Router();

router.post('/', function (req, res, next) {
    var fpath = req.body.fpath;
    var cmd;
    if(System.isMac()){
        cmd='open ' + fpath;
    }else{
        cmd="\""+fpath+"\"";
    }

    child_process.exec(cmd, function (error, stdout, stderr) {
        if(error){
            console.error(stderr);
        }else{
            console.log(stdout);
        }

        res.json({
            code:1,
            msg:"success"
        });
    });
});

module.exports = router;