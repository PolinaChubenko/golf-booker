import style from "./Alert.module.css"
import React, {useEffect, useState} from "react";
import moment from "moment/moment";
import {ajaxService} from "../../services/ajaxService";

const Alert = ({handleOnClose, show, start, end}) => {
    const showHideClassName = show ? style.display_block : style.display_none;

    const handleClose = () => {
        handleOnClose();
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(start, end)
        ajaxService(`/blocked_range`, {
            method: 'DELETE',
            body: JSON.stringify({start: start, end: end}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            handleClose();
        });
        console.log(start);
    }

    return (
        <div className={[showHideClassName, style.modal].join(" ")}>
            <section className={style.modal_main}>
                <div className={style.question_wrapper}>
                    Вы точно хотите применить разблокировку?
                </div>
                <div className={style.btns_wrapper}>
                    <button type="button" className={[style.btn, style.red_color].join(" ")} onClick={handleClose}>
                        Отменить
                    </button>
                    <button type="button" className={[style.btn, style.green_color].join(" ")} onClick={handleSubmit}>
                        Применить
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Alert;