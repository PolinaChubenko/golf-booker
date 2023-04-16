import style from "./Modal.module.css"
import React, {useState} from "react";
import moment from "moment/moment";
import InputSection from "../PlayerSection/InputSection";
import PlayerSection from "../PlayerSection/PlayerSection";

const Modal = ({ handleClose, show, eventId }) => {
    const showHideClassName = show ? style.display_block : style.display_none;

    const [teeTime, setTeeTime] = useState(null)

    const setTeeTimeForModal= (time) => {
        const teeTime = moment(time).format("DD.MM, HH:mm");
        setTeeTime(teeTime)
    }

    return (
        <div className={[showHideClassName, style.modal].join(" ")}>
            <section className={style.modal_main}>
                <div className={style.tee_time_wrapper}>
                    <p>Запись 14.04 на время 10:30</p>
                </div>
                <div className={style.players_wrapper}>
                    <p>Игроки</p>
                </div>
                <div>
                    <PlayerSection member={true} name_and_surname={"Полина Чубенко"} phone={"+79991234567"} hcp={5.5}/>
                    <PlayerSection member={false} name_and_surname={"Егор Сбродов"} phone={"+79991234567"} hcp={15.5}/>
                    <InputSection />
                </div>
                <button type="button" className={[style.btn, style.red_color].join(" ")} onClick={handleClose}>
                    Отменить
                </button>
                <button type="button" className={[style.btn, style.green_color].join(" ")} onClick={handleClose}>
                    Сохранить
                </button>
            </section>
        </div>
    );
};

export default Modal;