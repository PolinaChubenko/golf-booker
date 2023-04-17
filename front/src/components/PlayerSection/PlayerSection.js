import style from "./PlayerSection.module.css"
import {ReactComponent as Cross} from "./../../icons/Cross.svg";
import {ReactComponent as Edit} from "./../../icons/Edit.svg";
import {ReactComponent as Copy} from "./../../icons/Copy.svg";

const PlayerSection = ({index, player, handleOpenEdit, handleRemove}) => {
    return (
        <div className={style.player_section_wrapper}>
            <div>{player.member ? "ЧК" : "!ЧК"}</div>
            <div className={style.player_info}>{player.name + " " + player.surname}</div>
            <div className={style.player_info}>{player.phone}</div>
            <div>
                <div className={style.handicap}>{player.hcp}</div>
            </div>
            <div className={style.icons_wrapper}>
                <div><Copy className={style.icon}/></div>
                <div><Edit className={style.icon} onClick={() => handleOpenEdit(index)}/></div>
                <div><Cross className={style.icon} onClick={() => handleRemove(index)}></Cross></div>
            </div>
        </div>
    )
}

export default PlayerSection;