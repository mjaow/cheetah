var Tst=require('../lib/tst');
var assert=require('assert');

var t=new Tst();

t.put('java',{
    name:'java',
    value:'java info'
});

console.log(t.get('java'));
