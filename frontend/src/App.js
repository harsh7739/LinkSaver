import logo from './logo.svg';
import './App.css';
import MainRoute from './MainRoute/Route';
import Navbar from './MainRoute/Navbar';

function App() {
  return (
    <div className="App">
     <Navbar />
     <MainRoute />
    </div>
  );
}

export default App;
