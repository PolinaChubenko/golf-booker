import style from "./PlayerSection.module.css"
import {ReactComponent as Cross} from "./../../icons/Cross.svg";
import {ReactComponent as Edit} from "./../../icons/Edit.svg";
import {ReactComponent as Copy} from "./../../icons/Copy.svg";

const PlayerSection = ({index, user_info, handleOpenEdit}) => {
    return (
        <div className={style.player_section_wrapper}>
            <div>{user_info.member ? "ЧК" : "!ЧК"}</div>
            <div className={style.player_info}>{user_info.name + " " + user_info.surname}</div>
            <div className={style.player_info}>{user_info.phone}</div>
            <div>
                <div className={style.handicap}>{user_info.hcp}</div>
            </div>
            <div className={style.icons_wrapper}>
                <div><Copy className={style.icon}/></div>
                <div><Edit className={style.icon} onClick={() => handleOpenEdit(index)}/></div>
                <div><Cross className={style.icon}></Cross></div>
            </div>
        </div>
    )
}

export default PlayerSection;