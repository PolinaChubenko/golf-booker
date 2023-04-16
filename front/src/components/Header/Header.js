import style from "./Header.module.css";
import {Link} from "react-router-dom";
import {ReactComponent as Logout} from "./../../icons/Logout.svg";
import {useState} from "react";
import {isLogin} from "../../utils/isLogin";

const Header = () => {

    const [isAdmin, setIsAdmin] = useState(isLogin())

    function onLogout() {
        setIsAdmin(isLogin())
        window.localStorage.setItem('ACCESS', '');
        window.localStorage.setItem('REFRESH', '');
    }

    return (
        <div className={style.header_wrapper}>
            <div className={style.logo_text}>GolfBooker</div>
            {isAdmin &&
                <Link to='/'>
                    <Logout onClick={onLogout} className={style.icon}/>
                </Link>
            }
        </div>
    )
}

export default Header;