import Header from "../Header/Header";
import Calendar from "../Calendar/Calendar";
import style from "./Admin.module.css";
import {useEffect, useState} from "react";
import AuthForm from "./Auth/AuthForm";
import {isLogin} from "../../utils/isLogin";
import Footer from "../Footer/Footer";


const Admin = () => {
    const [isAdmin, setIsAdmin] = useState(isLogin());

    return (
        <div>
            <Header isAdminAuth={isAdmin}/>
            {isAdmin ?
                <div className={style.calendar_wrapper}>
                    <Calendar is_admin={true}/>
                </div>
                : <AuthForm setIsAdmin={setIsAdmin}/>
            }
            <Footer/>
        </div>
    )
}

export default Admin;