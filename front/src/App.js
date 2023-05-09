import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import NotFound from "./components/NotFound/NotFound";
import User from "./components/PageUser/User";
import Admin from "./components/PageAdmin/Admin";
import ThreeStateCheckbox from "./components/CheckBox/ThreeStateCheckbox";
import TwoStateCheckbox from "./components/CheckBox/TwoStateCheckbox";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<User />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/checkbox" element={
                    <>
                        <ThreeStateCheckbox value={0} disabled={false}/>
                        <ThreeStateCheckbox value={1} disabled={false}/>
                        <ThreeStateCheckbox value={2} disabled={false}/>
                        <TwoStateCheckbox value={0} disabled={false}/>
                        <TwoStateCheckbox value={1} disabled={false}/>
                    </>
                } />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
