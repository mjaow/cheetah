var obj = {};

function inc() {
    if (obj['jack']||obj['jack']===0) {
        obj['jack']++;
    } else {
        obj['jack'] = 0;
    }
}

console.log(obj);

inc();

console.log(obj);

inc();
inc();
inc();
console.log(obj);