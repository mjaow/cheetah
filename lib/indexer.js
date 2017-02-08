
module.exports = class Indexer {

    constructor() {
        this.fileArr=[];
    }

    build(text) {
        this.fileArr.push(text);
    }
}