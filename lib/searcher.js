var fs = require('fs');
var Indexer = require('./indexer');
var Codec = require('./codec');
var FileItem = require('./file_item');
var constant=require('../config/constant');
var config=require('../config/config');
var path=require('path');
var heapdump = require('heapdump');

class Searcher {

    constructor() {
        this.indexer = new Indexer();
        this.codec = new Codec();
    }

    search(dir_list) {
        if (!dir_list) {
            return;
        }
        for (var dir of dir_list) {
            this._search(dir);
        }
    }

    _contains(arr,str){
        for(var a of arr){
            if(str==a){
                return true;
            }
        }
        return false;
    }

    _search(dir) {
        if(this._contains(config.exclude_path,dir)){
            return;
        }

        var replace=dir;
        if(dir.endsWith(':')){
            replace+=path.sep;
        }
        fs.readdir(replace, function (err, files) {
            if (!err) {
                files.map(function (item) {
                    if (!this.starts_with(item, [".", "$"])) {
                        var child = dir + path.sep + item;
                        var encode_child = dir + path.sep + this.codec.encode(item);
                        fs.stat(child, function (err, stats) {
                            if (!err) {
                                var ftype=constant.FTYPE.DIR;//dir
                                 if (stats.isFile()) {
                                    ftype=constant.FTYPE.FILE;//dir
                                 }
                                //old version:it's bad cause it will block the web UI
                                // this.indexer.build(item,new FileItem(item,child,encode_child));

                                //new version:send to parent process without blocking
                                process.send({
                                    key: item,
                                    value: new FileItem(item, child, encode_child,ftype)
                                });
                               
                                 if (stats.isDirectory()) {
                                    this._search(child);
                                }
                            }
                        }.bind(this));
                    }
                }.bind(this));
            }
        }.bind(this));
    }

    search_prefix(prefix, limit) {
        var search_list = this.indexer.search_prefix(prefix);
        var list = [];

        for (var i in search_list) {
            if (i >= limit) {
                break;
            }
            list.push(search_list[i]);
        }
        return list;
    }

    starts_with(text, searchStrings) {
        for (var s of searchStrings) {
            if (text.startsWith(s)) {
                return true;
            }
        }
        return false;
    }

    file_count() {
        return this.indexer.count;
    }
};

var s = new Searcher();

function toM(n){
    return (n/1024/1024).toFixed(2)+"M";
}

process.on('SIGINT',function(){
    console.log("================>over");
    // heapdump.writeSnapshot('/Users/loda/Documents/' + Date.now() + '.heapsnapshot');
    var mem=process.memoryUsage();
    console.log(`rss:${toM(mem.rss)},total:${toM(mem.heapTotal)},used:${toM(mem.heapUsed)}`);
    
    process.exit(0);
});

module.exports = s;