var fs = require('fs');
var Indexer = require('./indexer');
var Codec = require('./codec');
var FileItem = require('./file_item');
var constant=require('../config/constant');
var path=require('path');

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

    _search(dir) {
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

module.exports = s;