import style from "./Header.module.css";
import {Link} from "react-router-dom";
import {ReactComponent as Logout} from "./../../icons/Logout.svg";
import {ReactComponent as Logo} from "./../../logo.svg";
import {useEffect, useState} from "react";
import {isLogin} from "../../utils/isLogin";

const Header = ({isAdminAuth}) => {
    const [isAdmin, setIsAdmin] = useState(isLogin())

    useEffect(() => {
        setIsAdmin(isLogin())
    }, [isAdminAuth])

    function onLogout() {
        window.localStorage.setItem('ACCESS', '');
        window.localStorage.setItem('REFRESH', '');
        setIsAdmin(false)
    }

    return (
        <div className={style.header_wrapper}>
            <div className={style.logo_text}>
                <Logo className={style.logo_icon}/>
                GolfBooker
            </div>
            {isAdmin &&
                <Link to='/'>
                    <Logout onClick={onLogout} className={style.icon}/>
                </Link>
            }
        </div>
    )
}

export default Header;