import style from "./Modal.module.css"
import React, {useEffect, useState} from "react";
import moment from "moment/moment";
import SectionController from "../PlayerSection/SectionController";
import {ReactComponent as Add} from "./../../icons/Add.svg";

const Modal = ({ handleOnClose, show, eventId }) => {
    const showHideClassName = show ? style.display_block : style.display_none;

    const [teeTime, setTeeTime] = useState(null)

    const setTeeTimeForModal= (time) => {
        const teeTime = moment(time).format("DD.MM, HH:mm");
        setTeeTime(teeTime)
    }

    const [playerList, setPlayerList] = useState([{
        is_new: true, member: false, name: "", surname: "", email: "", phone: "", hcp: ""
    }]);
    const [isUploaded, setIsUploaded] = useState(false);

    useEffect(() => {
        // in the future, we will use ajaxRequest for uploading info by eventId
        setPlayerList([{
            is_new: false, member: false, name: "Полина", surname: "Чубенко", email: "bla@bla.com", phone: "+79991234567", hcp: 5.5
        }]);
        setIsUploaded(true);
    }, [isUploaded])

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...playerList];
        list[index][name] = value;
        setPlayerList(list);
    };

    const handleAddClick = () => {
        if (playerList.length < 4) {
            setPlayerList([...playerList, {
                is_new: true, member: false, name: "", surname: "", email: "", phone: "", hcp: ""
            }]);
        }
    };

    const handleRemove = index => {
        const list = [...playerList];
        list.splice(index, 1);
        setPlayerList(list);
    };

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     if (!name || !surname || !email || !phone) {
    //         setError("не все поля заполнены");
    //         return;
    //     }
    //     ajaxService(`/blogs`, {
    //         method: 'POST',
    //         body: JSON.stringify({ name: name, surname: surname, email: email, phone: phone, hcp: hcp }),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }).then();
    // }

    const handleClose = () => {
        handleOnClose();
        setPlayerList([])
        setIsUploaded(false);
    }

    const handleOpenEdit = index => {
        setPlayerList((playersList) => {
            const updatedList = [...playersList];
            updatedList[index] = {...updatedList[index], is_new: true};
            return updatedList;
        })
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
                    <SectionController
                        playerList={playerList}
                        handleOpenEdit={handleOpenEdit}
                        handleInputChange={handleInputChange}
                        handleRemove={handleRemove}
                    />
                    {playerList.length < 4 && <Add className={style.icon} onClick={handleAddClick}/>}
                </div>
                <div className={style.players_wrapper}>
                    <p>Комментарий</p>
                </div>
                <div className={style.comment_wrapper}>
                    <textarea placeholder={"Место для заметок или дополнительной информации"}></textarea>
                </div>
                <div className={style.btns_wrapper}>
                    <button type="button" className={[style.btn, style.red_color].join(" ")} onClick={handleClose}>
                        Отменить
                    </button>
                    <button type="button" className={[style.btn, style.green_color].join(" ")}>
                        Сохранить
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Modal;