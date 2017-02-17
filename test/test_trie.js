var Trie=require('../lib/trie');
var assert=require('assert');

var t=new Trie();

t.put('java',true);

t.put('java',true);

t.put('python',true);
t.put('c++',true);
t.put('c',true);
t.put('php',true);

console.log(t.keys_with_prefix('pyh'));

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
