import Header from "../Header/Header";
import Calendar from "../Calendar/Calendar";
import style from "./Admin.module.css";
import {useEffect, useState} from "react";
import AuthForm from "./Auth/AuthForm";
import {isLogin} from "../../utils/isLogin";
import Footer from "../Footer/Footer";


const Admin = () => {
    const [isAdmin, setIsAdmin] = useState(true);

    useEffect(() => {
        if (isLogin()) {
            setIsAdmin(true);
        }
    }, []);

    return (
        <div>
            <Header/>
            {isAdmin ?
                <div className={style.calendar_wrapper}>
                    <Calendar is_admin={true}/>
                </div>
                : <AuthForm/>
            }
            <Footer/>
        </div>
    )
}

export default Admin;