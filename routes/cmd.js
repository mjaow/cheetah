var express = require('express');

var child_process = require('child_process');
var router = express.Router();

router.post('/', function (req, res, next) {
    var fpath = req.body.fpath;
    console.log('-----'+fpath);
    child_process.exec('open ' + fpath, function (error, stdout, stderr) {
        var res_message;
        if(error){
            res_message={
                code:0,
                msg:stderr
            };
        }else{
            res_message={
                code:1,
                msg:stdout
            }
        }

        res.json(res_message);
    });
});

module.exports = router;