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
                    <p>Слот 14.04 на время 10:30</p>
                </div>
                <div className={style.players_wrapper}>
                    <p>Игроки</p>
                </div>
                <div>
                    <PlayerSection />
                    <InputSection />
                </div>
                <button type="button" onClick={handleClose}>
                    Отменить
                </button>
                <button type="button" onClick={handleClose}>
                    Сохранить
                </button>
            </section>
        </div>
    );
};

export default Modal;