import React, {useEffect} from 'react'
import style from "./Calendar.module.css";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import timeGridPlugin from '@fullcalendar/timegrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import {useState} from "react";
import data from '../../test_bd.json';
import moment from "moment";

const Calendar = (props) => {
    const [events, setEvents] = useState([])

    useEffect(() => {
        setEvents(data)
    }, [])

    const handleEvent = (info, successCallback, failureCallback) => {
        successCallback(events)
    }

    const clickEvent = (info) => {
        console.log("HEEEY")
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
    }

    return (
        <div>
            <div className={style.calendar}>
                <div className={style.title}>Бронирование Tee-time</div>
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
                    eventColor={'#378006'}
                    displayEventTime={false}
                    eventClick={clickEvent}
                    dateClick={props.is_admin ? addEvent : null}
                />
            </div>
        </div>
    )
}

export default Calendar;
