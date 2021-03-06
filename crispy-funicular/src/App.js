import './App.css';
import Header from './components/header.js'
import Sudoku from './components/Sudoku.js'
import Footer from './components/footer.js'
import Controller from './components/controller.js'
import React from 'react'
class App extends React.Component {
  constructor(props){
    super(props);
    this.sudokuRef = React.createRef();
    this.contRef = React.createRef();
  }
  render(){
    return (
      <div className="App">
        <Header />
        <h1>Sudoku</h1>
        <div style={{verticalAlign: "middle"}}>
          <Sudoku sudokuRef={this.sudokuRef} contRef = {this.contRef}/>
          <Controller sudokuRef={this.sudokuRef}  contRef={this.contRef} />
        </div>
        
        <Footer />
      </div>
    );
  }
}

export default App;
