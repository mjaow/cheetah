var Trie = require('./trie');
var nodejieba = require("nodejieba");
var pinyin = require('pinyin');

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
        this.reverse_index = new Map();
    }

    isChinese(token) {
        var reg = /[\u4e00-\u9fa5]/;
        for (var t of token) {
            if (!reg.test(t)) {
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

    _build_trie(key, value) {
        this.trie.put(key, value);
    }

    _build_reverse_index(token, id) {
        var ids = this.reverse_index.get(token);

        if (!ids) {
            this.reverse_index.set(token, []);
            ids = this.reverse_index.get(token);
        }

        ids.push(id);
    }

    build(key, value) {
        this.map[this.id] = value;
        key = this.toLowerCase(key);
        for (var token of this._trim_blank(nodejieba.cut(key, true))) {
            if (this.isChinese(token)) {
                var py = pinyin(key, { style: pinyin.STYLE_NORMAL }).join('');
                this._build_trie(py, true);
            }
            this._build_trie(token, true);
            this._build_reverse_index(token, this.id);
        }

        this.id++;
    }

    _trim_blank(_arr) {
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

    _check_hit(tokens) {
        if (tokens.length === 0) {
            return [];
        }

        var token_ids = [];
        for (var items of tokens) {
            var set = new Set();

            for (var item of items) {
                var ids = this.reverse_index.get(item);
                if (ids) {
                    for (var id of ids) {
                        set.add(id);
                    }
                }
            }

            token_ids.push(set);
        }
        var result_map = {};
        for (var item of token_ids) {
            for (var id of item) {
                var rs = result_map[id];
                if (rs) {
                    result_map[id]++;
                } else {
                    result_map[id] = 1;
                }
            }
        }

        var result_ids = [];

        for (var rs in result_map) {

            if (result_map[rs] >= tokens.length) {

                result_ids.push(rs);
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

        var prefixes = this._trim_blank(nodejieba.cut(_prefix, true));

        var tokens = [];

        for (var p of prefixes) {
            tokens.push(this.trie.keys_with_prefix(p));
        }

        var result_items = this._check_hit(tokens);

        var cost_time = new Date().getTime() - start_time;

        console.log("cost " + cost_time + "ms for searching " + prefix + ",element size:" + result_items.length);

        return result_items;
    }

    get count() {
        return this.id;
    }
}