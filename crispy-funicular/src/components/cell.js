const { useContext } = require("react")
const strokeColor = "#231F20";
export {strokeColor};
const fillColor = "#7EBDC2";
const highlightColor = "#72B01D";
const paleHighlight = "#94b06d"
const lockColor = "#3F7D20"

class Cell{
    
    constructor(x,y,width,height, ctx){        
        this.x = x
        this.y = y
        this.value=""
        this.width=width;
        this.height=height;
        this.highlighted=false;
        this.paleHighlight=false;
        this.ctx=ctx;
        this.pencils=[false,false,false,false,false,false,false,false,false]
    }
    draw(){
        this.ctx.beginPath()
        this.ctx.strokeStyle = strokeColor;
        this.ctx.rect(this.x,this.y,this.width,this.height);
        if (this.highlighted){
            this.ctx.fillStyle = highlightColor;
        }
        else if (this.paleHighlight){
            this.ctx.fillStyle = paleHighlight;
        }
        else{
            this.ctx.fillStyle = fillColor;
        }
        this.ctx.fill();
        this.ctx.stroke();
        if (this.value!=""){
            if (this.locked){
                this.ctx.fillStyle = strokeColor;
            }
            else{
                this.ctx.fillStyle=lockColor;
            }
            
            this.ctx.font = "100px Arial";
            var textx = this.x + 0.2 * this.width;
            var texty = this.y + this.height - 0.1 * this.width;
            this.ctx.fillText(this.value, textx, texty);
        }
        else{
            this.ctx.fillStyle = strokeColor;
            this.ctx.font = "20px Arial";
            for (var i=0; i<9;i++){
                if(this.pencils[i]){
                    var textx = this.x + 0.2 * this.width;
                    var texty = this.y + this.height - 0.1 * this.width;
                    if (i<=2){
                        texty-=(this.height*0.6);
                    }
                    else if (i<=5){
                        texty-=(this.height*0.3);
                    }
                    if (i%3==2){
                        textx+=(this.width*0.6);
                    }
                    else if (i%3==1){
                        textx+=(this.width*0.3);
                    }
                    
                    this.ctx.fillText(i+1, textx, texty);
                }
            }
        }
        
        
    }
    click(){

    }
    select(){
        this.highlighted=true;
    }
    unselect(){
        this.highlighted=false;
    }
    keyDown(key){
        
        
    }
    getX(){
        return this.x/this.width
    }
    getY(){
        return this.y/this.width
    }
    pencil(key){
        if (this.pencils[key-1]){
            this.pencils[key-1]=false;
        }
        else{
            this.pencils[key-1]=true;
        }
    }
    setValue(key){
        this.value=key;
    }
}
export default Cell