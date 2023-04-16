import style from "./Modal.module.css"
import React, {useEffect, useState} from "react";
import moment from "moment/moment";
import SectionController from "../PlayerSection/SectionController";
import {ReactComponent as Add} from "./../../icons/Add.svg";

const Modal = ({ handleOnClose, show, firstOpen, eventId }) => {
    const showHideClassName = show ? style.display_block : style.display_none;

    const [teeTime, setTeeTime] = useState(null)

    const setTeeTimeForModal= (time) => {
        const teeTime = moment(time).format("DD.MM, HH:mm");
        setTeeTime(teeTime)
    }

    const [inputList, setInputList] = useState([{
        is_new: true, member: false, name: "", surname: "", email: "", phone: "", hcp: null
    }]);

    useEffect(() => {
        // in the future, we will use ajaxRequest for uploading info by eventId
        setInputList([{
            is_new: false, member: false, name: "Полина", surname: "Чубенко", email: "bla@bla.com", phone: "+79991234567", hcp: 5.5
        }]);
        firstOpen = false;
    }, [firstOpen === true])

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    const handleAddClick = () => {
        if (inputList.length < 4) {
            setInputList([...inputList, {
                is_new: true, member: false, name: "", surname: "", email: "", phone: "", hcp: null
            }]);
        }
    };

    const handleRemove = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
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
        setInputList([])
        firstOpen = true;
    }

    const handleOpenEdit = index => {
        setInputList((inputList) => {
            const updatedInputList = [...inputList];
            updatedInputList[index] = {...updatedInputList[index], is_new: true};
            return updatedInputList;
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
                        inputList={inputList}
                        handleOpenEdit={handleOpenEdit}
                        handleInputChange={handleInputChange}
                        handleRemove={handleRemove}
                    />
                    {inputList.length < 4 && <Add className={style.icon} onClick={handleAddClick}/>}
                </div>
                <button type="button" className={[style.btn, style.red_color].join(" ")} onClick={handleClose}>
                    Отменить
                </button>
                <button type="button" className={[style.btn, style.green_color].join(" ")}>
                    Сохранить
                </button>
            </section>
        </div>
    );
};

export default Modal;