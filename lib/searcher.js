var fs = require('fs');
var Indexer=require('./indexer');
var Codec=require('./codec');
var FileItem=require('./file_item');

module.exports=class Searcher {

    constructor() {
        this.indexer=new Indexer();
        this.codec=new Codec();
    }

    search(dir) {
        fs.readdir(dir, function (err, files) {
            if (!err) {
                files.map(function (item) {
                    if (!this.startsWith(item, [".", "$"])) {
                        var child = dir + "/" + item;
                        var encode_child=dir+"/"+this.codec.encode(item);
                        fs.stat(child, function (err, stats) {
                            if (!err) {
                                if (stats.isFile()) {
                                    this.indexer.build(item,new FileItem(item,child,encode_child));
                                } else if (stats.isDirectory()) {
                                    this.search(child);
                                }
                            }
                        }.bind(this));
                    }
                }.bind(this));
            }
        }.bind(this));
    }

    search_prefix(prefix,limit){
        var search_list=this.indexer.search_prefix(prefix);
        var list=[];

        for(var i in search_list){
            if(i>=limit){
                break;
            }

            list.push(search_list[i]);
        }
        return list;
    }

    search_key(key){
        return this.indexer.search_key(key);
    }

    startsWith(text, searchStrings) {
        for (var s of searchStrings) {
            if (text.startsWith(s)) {
                return true;
            }
        }
        return false;
    }

    fileLen(){
        return this.indexer.fileArr.length;
    }
};