//import logo from './logo.svg';
import './App.css';
import Balloon from './component/balloon_feature/balloon_feature'

// Balloon и  Balloon2 недописано
function App() {
  return (
    <div className="App">
        <div style={{ position: "absolute", left: 40, top: 120 }}>
            <Balloon
                title_pl1="Первый игрок"
                name_pl1="Артемий Клячин"
                handicap_pl1={14}
                club_mem_pl1={"да"}
            />
        </div>
    </div>
  );
}

export default App;
