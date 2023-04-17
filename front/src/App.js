import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import NotFound from "./components/NotFound/NotFound";
import User from "./components/PageUser/User";
import Admin from "./components/PageAdmin/Admin";
import CheckBox from "./components/CheckBox/CheckBox";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<User />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/checkbox" element={
                    <div>
                        <CheckBox />
                        <CheckBox value={0} disabled={true}/>
                        <CheckBox value={1} disabled={true}/>
                        <CheckBox value={2} disabled={true}/>
                    </div>}
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
