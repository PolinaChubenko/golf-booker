import style from "./PlayerSection.module.css"
import {ReactComponent as Cross} from "./../../icons/Cross.svg";
import {ReactComponent as Edit} from "./../../icons/Edit.svg";
import {ReactComponent as Copy} from "./../../icons/Copy.svg";

const PlayerSection = () => {
    return (
        <div className={style.player_section_wrapper}>
            <div>ЧК</div>
            <div className={style.player_info}>Чубенко Полина</div>
            <div className={style.player_info}>+79991234567</div>
            <div>
                <div className={style.handicap}>5.5</div>
            </div>
            <div className={style.icons_wrapper}>
                <div><Copy className={style.icon}/></div>
                <div><Edit className={style.icon}/></div>
                <div><Cross className={style.icon}></Cross></div>

            </div>
        </div>
    )
}

export default PlayerSection;