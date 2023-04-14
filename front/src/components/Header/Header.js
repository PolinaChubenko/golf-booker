import style from "./Header.module.css";

const Header = () => {
    return <div className={style.header_wrapper}>
        <div className={style.logo_text}>GolfBooker</div>
    </div>
}

export default Header;