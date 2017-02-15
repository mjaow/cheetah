var name = ["abcde"];
var conf=require("../config/config");

function say(n) {
    for (var i of n) {
        console.log("==>"+i);
    }
}

say(conf.base_path);