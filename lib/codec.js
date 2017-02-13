var System=require("./os_system");
module.exports=class Codec{
    
    encode(text){
        if(System.isWindows()){
            return text;
        }

        var new_text="";

        for(var i of text){
            switch(i){
                case "'":
                    new_text+="\\'";
                    break;
                case "\"":
                    new_text+="\\\"";
                    break;
                case " ":
                    new_text+="\\ ";
                    break;
                default:
                    new_text+=i;
                    break;
            }
        }
        return new_text;
    }
}