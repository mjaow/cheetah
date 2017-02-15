var express = require('express');
var child_process = require('child_process');
var System = require('../lib/os_system');
var constant = require('../config/constant');
var router = express.Router();

router.post('/', function (req, res, next) {
    var fpath = req.body.fpath;
    var ftype = parseInt(req.body.ftype);
    var cmd;
    if (System.isMac()) {
        cmd = 'open ' + fpath;
    } else if (System.isWindows()) {
        if (ftype === constant.FTYPE.DIR) {
            cmd = "\%SystemRoot\%\\explorer.exe \"" + fpath + "\"";
        } else {
            cmd = "\"" + fpath + "\"";
        }

    } else {
        throw new Error("not supported for your os");
    }

    child_process.exec(cmd, function (error, stdout, stderr) {
        if (error) {
            console.error(stderr);
        } else {
            console.log(stdout);
        }

        res.json({
            code: 1,
            msg: "success"
        });
    });
});

module.exports = router;