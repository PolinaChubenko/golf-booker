import style from "./PlayerSection.module.css"
import {ReactComponent as Cross} from "./../../icons/Cross.svg";
import {ReactComponent as Paste} from "./../../icons/Paste.svg";
import {useState} from "react";

const InputSection = ({index, user_info, handleInputChange, handleRemove}) => {
    return (
        <div className={style.input_section_wrapper}>
            <div>
            </div>
            <div>
                <input name={"name"} placeholder={"Имя"} value={user_info.name}
                       onChange={e => handleInputChange(e, index)}/>
                <input name={"surname"} placeholder={"Фамилия"} value={user_info.surname}
                       onChange={e => handleInputChange(e, index)}/>
                <input name={"email"} placeholder={"E-mail"} value={user_info.email}
                       onChange={e => handleInputChange(e, index)}/>
            </div>
            <div>
                <input name={"phone"} placeholder={"Телефон"} value={user_info.phone}
                       onChange={e => handleInputChange(e, index)}/>
                <input name={"hcp"} placeholder={"Гандикап"} value={user_info.hcp}
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