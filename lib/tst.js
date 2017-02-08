class Tst{

    constructor(){
        this.root={};
    }

    put(item){
        this.root=putRecur(item,this.root);
    }
    
    putRecur(item,currNode){
        var name=item.name;
        for(var c of name){
            if(currNode[c]){
                
            }
        }
    }

    get(){

    }

    delete(){

    }
}