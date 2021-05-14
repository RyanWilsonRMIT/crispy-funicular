import Cell, {strokeColor} from "./cell.js"
class Grid{
    constructor(x,y,width, height, ctx){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        console.log("grid created");
        this.ctx=ctx;
        this.cells=[];
        this.selected=null;
        this.rows = []
        this.cols = []
        this.boxs = []
        for (var i=0; i<9;i++){
            this.rows[i]=[];
            this.boxs[i]=[];
            this.cols[i]=[];
            for (var j=0;j<9;j++){
                this.rows[i][j]=false;
                this.boxs[i][j]=false;
                this.cols[i][j]=false;
            }
        }
    }
    getCellWidth(){
        return this.width/9
    }
    getCellHeight(){
        return this.height/9
    }
    unHighlightRelated(){
        for (var i=0; i<9; i++){
            for (var j=0; j<9;j++){
                this.cells[i][j].paleHighlight=false;
                this.cells[i][j].highlighted=false;
            }
        }
    }
    highlightRelated(x,y){
        this.unHighlightRelated();
        if (this.cells[x][y].value!=""){
            for (var i=0; i<9; i++){
                for (var j=0; j<9;j++){
                    if (this.cells[i][j].value==this.cells[x][y].value){
                        this.cells[i][j].highlighted=true;
                    }
                }
            }
        }
        for (var i=0; i<9; i++){
            this.cells[x][i].paleHighlight=true;
        }
        for (var i=0; i<9; i++){
            this.cells[i][y].paleHighlight=true;
        }
    }
    import(grid){
        this.cells = [];
        for (var x=0;x<9;x++){
            var row=[]
            for (var y=0;y<9;y++){
                var cell = new Cell(x * this.getCellWidth(),y * this.getCellHeight(),this.getCellWidth(),this.getCellHeight(),this.ctx)
                if (grid[y][x]!=0){
                    if (this.placeIfValid(cell,grid[y][x])){
                        cell.locked = true;
                    }
                    else{
                        console.log("Import error, grid has doubling numbers")
                    }
                    
                }
                row.push(cell);
            }
            this.cells.push(row);
        }
        console.log("Grid created");
    }
    createGrid(){
        this.cells = [];
        for (var x=0;x<9;x++){
            var row=[]
            for (var y=0;y<9;y++){
                var cell = new Cell(x * this.getCellWidth(),y * this.getCellHeight(),this.getCellWidth(),this.getCellHeight(),this.ctx)
                row.push(cell);
            }
            this.cells.push(row);
        }
        console.log("Grid created");
    }
    addCell(cell){
        this.cells.append(cell);
    }
    createCell(x,y){
        var cell = new Cell(0,0,this.ctx)
        this.cells.append(cell)
    }
    draw(){
        this.ctx.lineWidth=1;
        for (var i=0; i<this.cells.length;i++){
            for (var j=0; j<this.cells[i].length;j++){
                this.cells[i][j].draw();
            }
            
        }
        this.drawGrid();
    }
    drawGrid(){
        //Drawing the boring grid
        this.ctx.strokeStyle = strokeColor
        this.ctx.beginPath()
        this.ctx.lineWidth=5;
        this.ctx.moveTo(0,0);
        this.ctx.lineTo(this.width,0);
        this.ctx.moveTo(0,this.height/3);
        this.ctx.lineTo(this.width,this.height/3);
        this.ctx.moveTo(0,2*this.height/3);
        this.ctx.lineTo(this.width,2*this.height/3);
        this.ctx.moveTo(0,this.height);
        this.ctx.lineTo(this.width,this.height);
        this.ctx.moveTo(this.width/3,0);
        this.ctx.lineTo(this.width/3,this.height);
        this.ctx.moveTo(2*this.width/3,0);
        this.ctx.lineTo(2*this.width/3,this.height);
        this.ctx.moveTo(this.width,0);
        this.ctx.lineTo(this.width,this.height);
        this.ctx.moveTo(0,0);
        this.ctx.lineTo(0,this.height);
        this.ctx.stroke();
    }
    click(realX, realY){
        var cellX = Math.floor(realX/this.getCellWidth());
        var cellY = Math.floor(realY/this.getCellHeight());
        this.select(cellX,cellY);
        this.cells[cellX][cellY].click();
    }
    select(x,y){
        if (this.selected){
            this.selected.unselect();
        }
        this.highlightRelated(x,y);
        this.cells[x][y].select();
        this.selected = this.cells[x][y];
    }
    keyDown(key){
        if (this.selected){ //if selected exists
            var numbers=["1","2","3","4","5","6","7","8","9"]
            var validOptions = numbers.concat(["Backspace"]);
            if (validOptions.includes(key)){
                if (!this.selected.locked){
                    if (numbers.includes(key)){
                        if (this.checkIfValid(this.selected,key)){
                            if (this.selected.value!=""){
                                this.keyDown("Backspace");
                            }
                            this.placeIfValid(this.selected,key);
                            var cellx = this.selected.x/this.selected.width
                            var celly = this.selected.y/this.selected.width;
                            this.highlightRelated(cellx, celly)
                        }
                        
                        
                    }
                    else if(key=="Backspace"){
                        this.removeNumber(this.selected,this.selected.value);
                        this.selected.setValue("");
                    }
                }
                
            }
        }
        
    }
    checkIfValid(cell, key){
        var x = cell.x/cell.width
        var y = cell.y/cell.height
        var box = this.coordsToBox(x,y);
        if (this.cols[x][key]){
            return false;
        }
        if (this.rows[y][key]){
            return false;
        }
        if (this.boxs[box][key]){
            return false;
        }
        return true;
    }
    placeIfValid(cell, key){
        var x = cell.x/cell.width
        var y = cell.y/cell.height
        var box = this.coordsToBox(x,y);
        if (this.cols[x][key]){
            return false;
        }
        if (this.rows[y][key]){
            return false;
        }
        if (this.boxs[box][key]){
            return false;
        }
        this.cols[x][key]=true;
        this.rows[y][key]=true;
        this.boxs[box][key]=true;
        cell.setValue(key);
        return true;
    }
    removeNumber(cell, key){
        var x = cell.x/cell.width
        var y = cell.y/cell.height
        var box = this.coordsToBox(x,y);
        this.cols[x][key]=false;
        this.rows[y][key]=false;
        this.boxs[box][key]=false;
    }
    coordsToBox(x,y){
        if (x<3){
            if (y<3){
                return 0;
            }
            if (y<6){
                return 1;
            }
            if (y<9){
                return 2;
            }
        }
        if (x<6){
            if (y<3){
                return 3;
            }
            if (y<6){
                return 4;
            }
            if (y<9){
                return 5;
            }
        }
        if (x<9){
            if (y<3){
                return 6;
            }
            if (y<6){
                return 7;
            }
            if (y<9){
                return 8;
            }
        }
    }
    checkSol(){

    }
}
export default Grid