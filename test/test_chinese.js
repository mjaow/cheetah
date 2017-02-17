var assert = require('assert');

function isChinese(token) {
    var reg =/[\u4e00-\u9fa5]/;
    for (var t of token) {
        if (!reg.test(t)) {
            return false;
        }
    }

    return true;
}
// console.log();
assert.ok(isChinese('中文汉字综上所.述王菲无法'));