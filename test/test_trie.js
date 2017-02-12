var Trie=require('../lib/trie');
var assert=require('assert');

var t=new Trie();

t.put('java','java');

t.put('java','j');

t.put('python','python');
t.put('c++','c++');
t.put('c','c');
t.put('php','php');

console.log(t.get_by_prefix(''));

// var m={
//     a:'aa',
//     b:'bb'
// };

// m.item="aaaa";

// for(var i in m){
//     if(i!=='item'){
//         console.log("--->"+i);
//     }
// }
