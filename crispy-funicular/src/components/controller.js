import React from 'react';
import './controller.css';
class Controller extends React.Component{
    constructor(props){
        super(props);
        this.sudokuRef=props.sudokuRef;
        this.clicked = this.clicked.bind(this);
        this.penbut = React.createRef();
        props.contRef.current=this;
    }
    componentDidMount(){
        
    }
    clicked(e){

        var key = e.target.id
        var grid = this.sudokuRef.current;
        grid.keyDown(key)
        grid.draw();
    }
    render(){
        return(
            <div id = "controller" className="controller">
                <table>
                    <tbody>
                        <tr>
                            <td><button onClick = {this.clicked} className="number" id="1">1</button></td>
                            <td><button onClick = {this.clicked} className="number" id="2">2</button></td>
                            <td><button onClick = {this.clicked} className="number" id="3">3</button></td>
                        </tr>
                        <tr>
                            <td><button onClick = {this.clicked} className="number" id="4">4</button></td>
                            <td><button onClick = {this.clicked} className="number" id="5">5</button></td>
                            <td><button onClick = {this.clicked} className="number" id="6">6</button></td>
                        </tr>
                        <tr>
                            <td><button onClick = {this.clicked} className="number" id="7">7</button></td>
                            <td><button onClick = {this.clicked} className="number" id="8">8</button></td>
                            <td><button onClick = {this.clicked} className="number" id="9">9</button></td>
                        </tr>
                        <tr>
                            <td><button onClick = {this.clicked} ref={this.penbut} className="number" id=" ">P</button></td>
                            <td><button onClick = {this.clicked} className="del" id="Backspace">DEL</button></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>

            </div>
        )
    }    
}
export default Controller