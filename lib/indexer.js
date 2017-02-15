var Trie = require('./trie');
var nodejieba = require("nodejieba");
var pinyin = require('pinyin');
var dict = require('../data/dict');

String.prototype.trim = function () {
    // Replace leading and trailing spaces with the empty string
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * 主进程会来通过Indexer对象来建立文件索引、查找索引文件
 */
module.exports = class Indexer {

    constructor() {
        this.trie = new Trie();
        this.id = 0;
        this.map = {};//数字id与文件之间的映射关系
    }

    isChinese(token) {
        for (var t of token) {
            var ch = t.charCodeAt(0);
            if (!dict[ch]) {
                return false;
            }
        }

        return true;
    }

    toLowerCase(str) {
        if (!str) {
            return str;
        }
        return str.toLowerCase();
    }

    build(key, value) {
        this.map[this.id] = value;

        key = this.toLowerCase(key);
        for (var token of this._trim_blank_token(nodejieba.cut(key, true))) {

            if (this.isChinese(token)) {
                var py = pinyin(key, { style: pinyin.STYLE_NORMAL }).join('');
                this.trie.put(py, this.id);
            }
            this.trie.put(token, this.id);
        }

        this.id++;
    }

    _trim_blank_token(_arr) {
        if (!_arr) {
            return [];
        } else {
            var _new_item = [];
            for (var _item of _arr) {
                if (_item && _item.trim() !== "") {
                    _new_item.push(_item);
                }
            }

            return _new_item;
        }
    }

    _check_hit(token_arr){
        var result_map = {};
        // var exact_match_map={};
        var result_ids=[];
        for (var token of token_arr) {
            var map = this.trie.get_by_prefix(token);
            for (var item in map) {
                var rs = result_map[item];
                if (rs) {
                    result_map[item]++;
                } else {
                    result_map[item] = 1;
                }
            }
        }

        for (var result in result_map) {
            if (result_map[result] >= token_arr.length) {
                result_ids.push(result);
            }
        }

        var result_items = [];

        for (var id of result_ids) {
            result_items.push(this.map[id]);
        }

        return result_items;
    }

    search_prefix(prefix) {

        var start_time = new Date().getTime();
        var _prefix = this.toLowerCase(prefix);

        var token_arr = this._trim_blank_token(nodejieba.cut(_prefix, true));

        var result_items = this._check_hit(token_arr);

        var cost_time = new Date().getTime() - start_time;

        console.log("cost " + cost_time + "ms for searching " + prefix);

        return result_items;
    }

    get count() {
        return this.id;
    }
}