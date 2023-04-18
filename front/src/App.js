import './App.css';
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
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;