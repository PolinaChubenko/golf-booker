import Header from "../Header/Header";
import Calendar from "../Calendar/Calendar";
import style from "./Admin.module.css";


const Admin = () => {
    return <div>
        <Header/>
        <div className={style.calendar_wrapper}>
            <Calendar is_admin={true}/>
        </div>
    </div>
}

export default Admin;