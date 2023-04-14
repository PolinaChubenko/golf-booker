import style from "./NotFound.module.css";
import { Link } from "react-router-dom"

const NotFound = () => {
    return <div>
        <div className={style.top}>
            <h1>404</h1>
            <h3>страница не найдена</h3>
        </div>
        <div className={style.container}>
            <div className={style.ghost_copy}>
                <div className={style.one}></div>
                <div className={style.two}></div>
                <div className={style.three}></div>
                <div className={style.four}></div>
            </div>
            <div className={style.ghost}>
                <div className={style.face}>
                    <div className={style.eye}></div>
                    <div className={style.eye_right}></div>
                    <div className={style.mouth}></div>
                </div>
            </div>
            <div className={style.shadow}></div>
        </div>
        <div className={style.bottom}>
            <div className={style.buttons}>
                <Link to="/"><button className={style.btn}>Главная</button></Link>
            </div>
        </div>
    </div>
}

export default NotFound;