class Tst{

    constructor(){
        this.root={};
    }

    put(item){
        this.root=putRecur(item,this.root);

        if(this.root==null){
        }
    }
    
    putRecur(item,currNode){
        var name=item.name;
        for(var i in name){
            var ch=name[i];
            if(currNode[ch]){
                
            }else{

            }
        }
    }

    get(text){
        var node=getRecur(text,this.root,0);
        if(node){
            return node.val;
        }else{
            return null;
        }
    }

    getRecur(text,node,index){
        if(!node){
            return null;
        }

        if(index==text.length-1){
            return node[text[index]];
        }else{
            return getRecur(text,node[text[index]],index+1);
        }
    }

    delete(){

    }
}