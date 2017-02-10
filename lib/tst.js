module.exports=class Tst {

    constructor() {
    }

    put(text, item) {
        this.root = this._put(text, item, this.root, 0);
    }

    _put(text, item, node, index) {
        if (!node) {
            node = {};
        }

        var ch=text[index];

        if (index === text.length - 1) {
            node[ch]={
                item:item
            };
        } else {
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

    _get(text, node, index) {
        if (!node) {
            return null;
        }

        if (index === text.length - 1) {
            return node;
        } else {
            return this._get(text, node[text[index]], index + 1);
        }
    }

    delete() {

    }
}