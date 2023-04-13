//import logo from './logo.svg';
import './App.css';
import Balloon3 from './component/balloon_feature/balloon_feature'

// Balloon и  Balloon2 недописано
function App() {
  return (
    <div className="App">
        <div style={{ position: "absolute", left: 40, top: 120 }}>
            <Balloon3 />
        </div>
    </div>
  );
}

export default App;
