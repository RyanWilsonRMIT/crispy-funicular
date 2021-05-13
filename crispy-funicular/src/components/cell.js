const { useContext } = require("react")
const strokeColor = "#231F20";
export {strokeColor};
const fillColor = "#7EBDC2";
const highlightColor = "#72B01D";
const lockColor = "#3F7D20"

class Cell{
    
    constructor(x,y,width,height, ctx){        
        this.x = x
        this.y = y
        this.value=""
        this.width=width;
        this.height=height;
        this.highlighted=false;
        this.ctx=ctx;
    }
    draw(){
        this.ctx.beginPath()
        this.ctx.strokeStyle = strokeColor;
        this.ctx.rect(this.x,this.y,this.width,this.height);
        if (this.highlighted == false){
            this.ctx.fillStyle = fillColor;
        }
        else{
            this.ctx.fillStyle = highlightColor;
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
        
    }
    click(){

    }
    select(){
        console.log("Selecting " + this.x + " "+ this.y);
        this.highlighted=true;
    }
    unselect(){
        this.highlighted=false;
    }
    keyDown(key){
        
        
    }
    setValue(key){
        this.value=key;
    }
}
export default Cell