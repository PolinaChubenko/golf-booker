import style from "./PlayerSection.module.css"
import {ReactComponent as Cross} from "./../../icons/Cross.svg";
import {ReactComponent as Edit} from "./../../icons/Edit.svg";
import {ReactComponent as Copy} from "./../../icons/Copy.svg";

const PlayerSection = (props) => {
    return (
        <div className={style.player_section_wrapper}>
            <div>{props.member ? "ЧК" : "!ЧК"}</div>
            <div className={style.player_info}>{props.name_and_surname}</div>
            <div className={style.player_info}>{props.phone}</div>
            <div>
                <div className={style.handicap}>{props.hcp}</div>
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