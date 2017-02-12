var Codec=require('../lib/codec');

var codec=new Codec();

var s=`name hel   "lo`;

console.log(s)
console.log(codec.encode(s));