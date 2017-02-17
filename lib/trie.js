module.exports = class Trie {

    constructor() {
        this.count = 0;
    }

    put(text, item) {
        this.root = this._put(text, item, this.root, 0);
    }

    _put(text, item, node, index) {
        if (!node) {
            node = {};
        }

        if (index === text.length) {
            if (!node.item) {
                this.count++;
            }
            node.item = item;
        } else {
            var ch = text[index];
            node[ch] = this._put(text, item, node[ch], index + 1);
        }

        return node;
    }

    get(text) {
        var node = this._get(text, this.root, 0);
        if (node) {
            return node.item;
        } else {
            return null;
        }
    }

    contains(text) {
        return this.get(text);
    }

    size() {
        return this.count;
    }

    keys() {
        throw new Error("Not supported");
    }

    keys_with_prefix(prefix) {
        var node = this._get(prefix, this.root, 0);
        var key_list = [];
        this._push_keys(node, prefix, key_list);
        return key_list;
    }

    _push_keys(node, prefix, list) {
        if (!node) {
            return;
        }

        if (node.item) {
            list.push(prefix);
        }

        for (var ch in node) {
            if (ch !== 'item' && node[ch]) {
                this._push_keys(node[ch], prefix + ch, list);
            }
        }
    }

    _get(text, node, index) {
        if (!node) {
            return null;
        }

        if (index === text.length) {
            return node;
        } else {
            return this._get(text, node[text[index]], index + 1);
        }
    }

    delete() {
        throw new Error("Not supported");
    }
}