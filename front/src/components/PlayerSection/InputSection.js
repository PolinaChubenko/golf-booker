import style from "./PlayerSection.module.css"
import {ReactComponent as Cross} from "./../../icons/Cross.svg";
import {ReactComponent as Paste} from "./../../icons/Paste.svg";

const InputSection = ({index, player, handleInputChange, handleRemove}) => {
    return (
        <div className={style.input_section_wrapper}>
            <div>
            </div>
            <div>
                <input name={"name"} placeholder={"Имя"} value={player.name}
                       onChange={e => handleInputChange(e, index)}/>
                <input name={"surname"} placeholder={"Фамилия"} value={player.surname}
                       onChange={e => handleInputChange(e, index)}/>
                <input name={"email"} type={"email"} placeholder={"E-mail"} value={player.email}
                       onChange={e => handleInputChange(e, index)}/>
            </div>
            <div>
                <input name={"phone"} type={"tel"} placeholder={"Телефон"} value={player.phone}
                       onChange={e => handleInputChange(e, index)}/>
                <input name={"hcp"} type={"number"} step={0.1} placeholder={"Гандикап"} value={player.hcp}
                       onChange={e => handleInputChange(e, index)}/>
            </div>
            <div></div>
            <div className={style.icons_wrapper}>
                <div></div>
                <div><Paste className={style.icon}></Paste></div>
                <div><Cross className={style.icon} onClick={() => handleRemove(index)}></Cross></div>
            </div>
        </div>
    )
}

export default InputSection;