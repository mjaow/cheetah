var o = new Map();

for(var i in o){
    console.log(i+"=>"+o[i]);
}

console.log(o.get('constructor'));

// function pushId(token,id) {
//     var ids = o[token];
//     if (!ids) {
//         o[token] = [];
//         ids=o[token];
//     }
//     ids.push(id);
// }

// console.log(o['ss']);
// pushId('ss',1);
// pushId('ss',2);
// pushId('ss',[2]);

// console.log(o['ss']);