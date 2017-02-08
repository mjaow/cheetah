var fs = require('fs');
var Indexer=require('./indexer');
const base_path = "e:/";

module.exports=class Searcher {

    constructor() {
        this.indexer=new Indexer();
    }

    search(dir) {
        fs.readdir(dir, function (err, files) {
            if (!err) {
                files.map(function (item) {
                    if (!this.startsWith(item, [".", "$"])) {
                        var child = dir + "/" + item;
                        fs.stat(child, function (err, stats) {
                            if (!err) {
                                if (stats.isFile()) {
                                    this.indexer.build(item);
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