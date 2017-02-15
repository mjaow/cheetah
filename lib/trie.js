module.exports = class Trie {

    constructor() {
    }

    put(text, item) {
        this.root = this._put(text, item, this.root, 0);
    }

    _put(text, item, node, index) {
        if (!node) {
            node = {};
        }

        if (index === text.length) {
            this._push_item(node, item);
        } else {
            var ch = text[index];
            node[ch] = this._put(text, item, node[ch], index + 1);
        }

        return node;
    }

    _push_item(node, item) {
        if (!node.item) {
            node.item=new Set();
        }
        node.item.add(item);
    }

    get(text) {
        var node = this._get(text, this.root, 0);
        if (node) {
            return node.item;
        } else {
            return null;
        }
    }

    get_by_prefix(prefix){
        var node=this._get(prefix,this.root,0);

        var items=new Set();

        this._push_all_items(node,items);

        return items;
    }

    _push_all_items(node,items){
        if(!node){
            return;
        }

        if(node.item){
            for(var i of node.item){
                items.add(i);
            }
        }

        for(var i in node){
            if(i!=='item'&&node[i]){
                this._push_all_items(node[i],items);
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