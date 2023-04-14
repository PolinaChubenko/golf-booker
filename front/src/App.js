import './App.css';
import Balloon from './components/Balloon/Balloon'
import Calendar from "./components/Calendar/Calendar";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import NotFound from "./components/NotFound/NotFound";
import User from "./components/PageUser/User";
import Admin from "./components/PageAdmin/Admin";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<User />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/balloon" element={<Balloon />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
