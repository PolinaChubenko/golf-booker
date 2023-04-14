import React, {useEffect} from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import timeGridPlugin from '@fullcalendar/timegrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import {useState} from "react";
import data from '../../test_bd.json';
import style from "./Calendar.module.css";
import moment from "moment";
import Modal from "../Modal/Modal.js";
import {CalendarStyleWrapper} from "./StylingCalendar";


const Calendar = (props) => {
    const [isModal, setIsModal] = useState(false)

    const showModal = () => {
        setIsModal(true)
    };
    const hideModal = () => {
        setIsModal(false);
    };

    const [events, setEvents] = useState([])

    useEffect(() => {
        setEvents(data)
    }, [])

    const handleEvent = (info, successCallback, failureCallback) => {
        successCallback(events)
    }

    const clickEvent = (info) => {
        console.log("here will be balloon")
    }

    const addEvent = (info) => {
        const start = moment(info.dateStr);
        const end = moment(info.dateStr).add(10, "m");
        const new_event = {
            title: 'NEW',
            start: start.format("YYYY-MM-DD HH:mm"),
            end: end.format("YYYY-MM-DD HH:mm")
        }
        setEvents(oldArray => [...oldArray, new_event]);
        showModal()
    }

    return (
        <div>
            <Modal show={isModal} handleClose={hideModal}>
                <p>Modal</p>
            </Modal>
            <div className={style.calendar}>
                <div className={style.title}>Бронирование Tee-time</div>
                <CalendarStyleWrapper>
                    <FullCalendar
                        plugins={[timeGridPlugin, interactionPlugin]}
                        locale="ru"
                        timeZone="Europe/Moscow"
                        initialView="timeGridWeek"
                        nowIndicator={true}
                        headerToolbar={{
                            left: 'today prev,next',
                            center: 'title',
                            right: 'timeGridWeek,timeGridDay'
                        }}
                        navLinks={true} // can click day/week names to navigate views
                        editable={false} // запрет двигать и менять размер события
                        selectable={false}
                        selectMirror={true}
                        dayMaxEvents={true} // allow "more" link when too many events
                        allDaySlot={false} // отключение поля all-day
                        eventDurationEditable={false} // запрет менять размер события
                        firstDay={1} // начало недели - понедельник

                        slotDuration='00:10:00'
                        slotLabelInterval={10}
                        slotLabelFormat={{
                            hour: 'numeric',
                            minute: '2-digit',
                            omitZeroMinute: false,
                            meridiem: 'short',
                        }}
                        slotMinTime='09:00:00'
                        slotMaxTime='18:10:00'

                        buttonText={{
                            today: 'Сегодня',
                            month: 'Месяц',
                            week: 'Неделя',
                            day: 'День',
                            list: 'Список'
                        }}

                        events={handleEvent}
                        eventColor={'#ABABAB'}
                        eventTextColor={'#494C62'}
                        displayEventTime={false}
                        eventClick={clickEvent}
                        dateClick={props.is_admin ? addEvent : null}
                    />
                </CalendarStyleWrapper>
            </div>
        </div>
    )
}

export default Calendar;
