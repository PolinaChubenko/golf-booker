import logo from './logo.svg';
import './App.css';
import Balloon from './component/balloon_feature/balloon_feature'
import Balloon2 from './component/balloon_feature/balloon_feature_2'
// import Balloon4 from './component/balloon_feature/balloon_feature_4'

// Balloon и  Balloon2 недописано
function App() {
  return (
    <div className="App">
        <Balloon />
        <Balloon2 />
        {/*<Balloon4 />*/}
    </div>
  );
}

export default App;
