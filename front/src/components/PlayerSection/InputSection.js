import style from "./PlayerSection.module.css"
import {ReactComponent as Cross} from "./../../icons/Cross.svg";

const InputSection = () => {
    return (
        <div className={style.input_section_wrapper}>
            <div>!!!</div>
            <div>
                <input placeholder={"Имя"}/>
                <input placeholder={"E-mail"}/>
                <input placeholder={"Гандикап"}/>
            </div>
            <div>
                <input placeholder={"Фамилия"}/>
                <input placeholder={"Телефон"}/>
            </div>
            <div><Cross className={style.icon}></Cross></div>
        </div>
    )
}

export default InputSection;