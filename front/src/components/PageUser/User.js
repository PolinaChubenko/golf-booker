import Header from "../Header/Header";
import style from "./User.module.css";
import Calendar from "../Calendar/Calendar";


const User = () => {
    return <div>
        <Header />
        <div className={style.calendar_wrapper}>
            <Calendar is_admin={false}/>
        </div>
    </div>
}

export default User;