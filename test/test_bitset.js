var BitSet = require('bitset.js');

// var bs=new BitSet();

// var i='2';
// bs.set(i,1);
// bs.set(23,1);

// console.log(bs.toString(2));

// console.log(bs.toArray());

var arr = [];
for (var i = 0; i < 40000; i++) {
    // var s = new Set();
    // for (var j = 100000; j > 99995; j--) {
    //     s.add(j);
    // }
    // arr.push(new Set());

    var s = new BitSet();
    for (var j = 100000; j > 99995; j--) {
        s.set(j, 1);
    }
    arr.push(new BitSet());

}

showMem();

function showMem() {
    var mem = process.memoryUsage();

    console.log("total:" + toM(mem.heapTotal));
    console.log("used:" + toM(mem.heapUsed));
    console.log("rss:" + toM(mem.rss));
}

function toM(num) {
    return (num / 1024 / 1024) + "M";
}