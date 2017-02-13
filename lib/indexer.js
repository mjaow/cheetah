var Trie=require('./trie');
var nodejieba = require("nodejieba");
var pinyin=require('pinyin');
var dict=require('../data/dict')

module.exports = class Indexer {

    constructor() {
        this.trie=new Trie();
    }

    isChinese(token){
        for(var t of token){
            var ch=t.charCodeAt(0);
            if(!dict[ch]){
                return false;
            }
        }

        return true;
    }

    build(key,value) {
        for(var token of nodejieba.cut(key,true)){
            if(this.isChinese(token)){
                var py=pinyin(key,{style:pinyin.STYLE_NORMAL}).join('');
                this.trie.put(py,value);
            }
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