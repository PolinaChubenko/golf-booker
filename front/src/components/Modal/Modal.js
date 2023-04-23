import style from "./Modal.module.css"
import React, {useEffect, useState} from "react";
import moment from "moment/moment";
import SectionController from "../PlayerSection/SectionController";
import {ReactComponent as Add} from "./../../icons/Add.svg";
import {ajaxService} from "../../services/ajaxService";

const Modal = ({handleOnClose, show, slot}) => {
    const showHideClassName = show ? style.display_block : style.display_none;

    const [tee, setTee] = useState([])

    const setTeeTimeForModal = (time) => {
        const teeDate = moment(time).format("DD.MM");
        const teeTime = moment(time).format("HH:mm");
        setTee([teeDate, teeTime])
    }

    const [isUploaded, setIsUploaded] = useState(false)
    const [playerList, setPlayerList] = useState([]);
    const [error, setError] = useState('');
    const [comment, setComment] = useState("")

    useEffect(() => {
        setTeeTimeForModal(slot);
        if (slot !== null) {
            setPlayerList([]);
            ajaxService(`/slot?slot=${slot}`).then((data) => {
                const uploadedList = [];
                if (data.success === true) {
                    if (data.result.bookings.length !== 0) {
                        data.result.bookings.forEach((player) => {
                            uploadedList.push({...player, is_new: false});
                        });
                        setComment(data.result.comment)
                        setPlayerList(uploadedList);
                    }
                }
                else {
                    setPlayerList([{
                        is_new: true, member: false, name: "", surname: "", email: "", phone: "", hcp: ""
                    }]);
                    setComment("")
                }
            }).then(() => {
                setIsUploaded(true);
            });
        }
    }, [slot, isUploaded])

    const handleInputChange = (e, index) => {
        setError('')
        const list = [...playerList];
        if (e === 0 || e === 1 || e === 2) {
            list[index]['member'] = (e === 1);
        } else {
            const { name, value } = e.target;
            list[index][name] = value;
        }
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
        setError('')
        handleOnClose();
        setPlayerList([])
        setIsUploaded(false)
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
        if (playerList.length > 0) {
            playerList.map((player) => {
                if (!player.name) {
                    setError("Поле имя - обязательно к заполнению")
                }
            })
            if (error) {
                return;
            }
        }
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
                    <textarea placeholder={"Место для заметок или дополнительной информации"} value={comment}
                              onChange={handleCommentChange}></textarea>
                </div>
                <div className={style.error}>{error}</div>
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