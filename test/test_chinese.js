var dict=require('../data/dict');
var assert=require('assert');

 function isChinese(token){
    for(var t of token){
        var ch=t.charCodeAt(0);
        if(!dict[ch]){
            return false;
        }
    }

    return true;
}
// console.log();
assert.ok(isChinese('中文汉字'));