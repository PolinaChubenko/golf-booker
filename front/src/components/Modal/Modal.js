import style from "./Modal.module.css"
import React, {useEffect, useState} from "react";
import moment from "moment/moment";
import SectionController from "../PlayerSection/SectionController";
import {ReactComponent as Add} from "./../../icons/Add.svg";
import {ajaxService} from "../../services/ajaxService";

const Modal = ({ handleOnClose, show, slot }) => {
    const showHideClassName = show ? style.display_block : style.display_none;

    const [tee, setTee] = useState([])

    const setTeeTimeForModal= (time) => {
        const teeDate = moment(time).format("DD.MM");
        const teeTime = moment(time).format("HH:mm");
        setTee([teeDate, teeTime])
    }

    const [playerList, setPlayerList] = useState([]);
    const [isUploaded, setIsUploaded] = useState(false);
    const [comment, setComment] = useState("")

    useEffect(() => {
        setTeeTimeForModal(slot);
    }, [tee, slot])

    useEffect(() => {
        const uploadedList = [];
        ajaxService(`/bookings/?slot=${slot}`).then((data) => {
            data.bookings.forEach((player) => {
                uploadedList.push({...player, is_new: false});
            });
            setPlayerList(uploadedList);
            if (playerList.length === 0) {
                setPlayerList([{
                    is_new: true, member: false, name: "", surname: "", email: "", phone: "", hcp: ""
                }]);
            }
        }).then();
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

    const handleCommentChange = (event) => {
        setComment(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        ajaxService(`/slot`, {
            method: 'POST',
            body: JSON.stringify({slot: slot, bookings: playerList, comment: comment}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            handleClose();
        });
    }

    return (
        <div className={[showHideClassName, style.modal].join(" ")}>
            <section className={style.modal_main}>
                <div className={style.tee_time_wrapper}>
                    <p>Запись {tee[0]} на время {tee[1]}</p>
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
                    <textarea placeholder={"Место для заметок или дополнительной информации"}
                              onChange={handleCommentChange}></textarea>
                </div>
                <div className={style.btns_wrapper}>
                    <button type="button" className={[style.btn, style.red_color].join(" ")} onClick={handleClose}>
                        Отменить
                    </button>
                    <button type="button" className={[style.btn, style.green_color].join(" ")} onClick={handleSubmit}>
                        Сохранить
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Modal;