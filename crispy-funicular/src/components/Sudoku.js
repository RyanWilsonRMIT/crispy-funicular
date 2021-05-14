import './Sudoku.css'
import React, { useRef, useEffect } from 'react'
import Grid from "./grid.js"
const Sudoku = props =>{
    var grid;
    const canvasRef = useRef(null)
    
    
    var canvas;
    var canvasClicked = function(e){
        var rect = canvas.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        grid.click(x,y);
        updateCanvas();
    }
    var canvasHovered = function(e){
        updateCanvas();
    }
    var updateCanvas = function(){
        grid.draw();
    }
    var keyDown = function(e){
        grid.keyDown(e.key);
        console.log(e.key)
        updateCanvas();
        
    }

    useEffect(() => {
        canvas = canvasRef.current
        var context = canvas.getContext('2d')
        console.log(props)
        grid = new Grid(0,0,900,900,context, props.contRef);
        props.sudokuRef.current=grid;
        var data = [
            [6,8,0,0,0,2,0,4,9],
            [7,3,0,5,9,0,6,1,0],
            [2,0,0,7,6,0,0,5,8],
            [5,6,8,0,0,0,1,0,3],
            [1,9,0,0,8,0,0,0,4],
            [0,4,2,9,0,0,8,6,0],
            [8,0,0,0,0,0,2,0,0],
            [0,0,0,0,0,1,0,0,0],
            [0,0,3,0,5,6,9,8,0],]
        grid.import(data);
        grid.select(0,0);
        grid.draw();
        canvas.addEventListener('click', canvasClicked, false);
        canvas.addEventListener('mouseover', canvasHovered, false);
        window.addEventListener("keydown",keyDown,false);
      }, [])
      
      
      return <canvas width="900" height="900" className = "sudokuCanvas" ref={canvasRef} {...props}/>
};


export default Sudoku