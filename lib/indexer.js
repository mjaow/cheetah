var Trie=require('./trie');
var nodejieba = require("nodejieba");

module.exports = class Indexer {

    constructor() {
        this.trie=new Trie();
    }

    build(key,value) {
        for(var token of nodejieba.cut(key,true)){
            this.trie.put(token,value);
        }
        this.trie.put(key,value);
    }

    search_prefix(prefix){
        return this.trie.get_by_prefix(prefix);
    }

    search_key(key){
        return this.trie.get(key);
    }

}