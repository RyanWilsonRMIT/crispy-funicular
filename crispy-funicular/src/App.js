import './App.css';
import Header from './components/header.js'
import Sudoku from './components/Sudoku.js'
import Footer from './components/footer.js'
function App() {
  return (
    <div className="App">
      <Header />
      <h1>Sudoku</h1>
      <Sudoku />
      <Footer />
    </div>
  );
}

export default App;
