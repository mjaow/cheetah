var process = require('child_process');
process.exec('open /Users/loda/Documents/book/java/Effective_Java_2nd_en（最新版）.pdf', function (error, stdout, stderr) {
    if (error) {
        console.log('====>error:' + stderr);
    } else {
        console.log('====>stdout:' + stdout);
    }
});