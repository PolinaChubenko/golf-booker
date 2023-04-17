import React, {useEffect} from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import timeGridPlugin from '@fullcalendar/timegrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import {useState} from "react";
import data from '../../test_bd.json';
import style from "./Calendar.module.css";
import moment from "moment";
import { Tooltip } from "bootstrap";
import { CheckBox } from "../Checkbox/CheckBox"
import zIndex from "@mui/material/styles/zIndex";
import {colors} from "@mui/material";

let tooltipInstance = null;

const Calendar = (props) => {
    const [isModal, setIsModal] = useState(false)
    const [events, setEvents] = useState([])
    const [eventId, setEventId] = useState(null)

    useEffect(() => {
        setEvents(data)
    }, [])

    const showModal = (id) => {
        setEventId(id)
        setIsModal(true)
    };
    const hideModal = () => {
        setIsModal(false);
    };

    const handleEvent = (info, successCallback, failureCallback) => {
        successCallback(events)
    }

    const handleEventClick = (info) => {
        showModal(info.event.id)
        // info.event.startStr
    }

    const handleDateClick = (info) => {
        const start = moment(info.dateStr);
        const end = moment(info.dateStr).add(10, "m");
        const new_event = {
            title: 'NEW',
            start: start.format("YYYY-MM-DD HH:mm"),
            end: end.format("YYYY-MM-DD HH:mm")
        }
        setEvents(oldArray => [...oldArray, new_event]);
        showModal(null)
    }

    const handleMouseEnter = (info) => {
        let club_mem = "1";
        let not_club_mem = "2";
        let free_places = "1";
        let inner_text =
            "Список:<br/> "
            + club_mem + " член клуба <br/> "
            + not_club_mem + " посетителя <br/> "
            + free_places + " свобоное место"
        if (info.event.extendedProps.description) {
            tooltipInstance = new Tooltip(info.el, {
                title: inner_text,
                html: true,
                container: "body"
            });

            tooltipInstance.show();
        }
    };

    const handleMouseLeave = (info) => {
        if (tooltipInstance) {
            tooltipInstance.dispose();
            tooltipInstance = null;
        }
    };


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

                    eventTextColor={'#494C62'}
                    displayEventTime={false}
                    eventClick={props.is_admin ? handleEventClick : null}
                    dateClick={props.is_admin ? handleDateClick : null}
                    eventMouseEnter={handleMouseEnter}
                    eventMouseLeave={handleMouseLeave}
                    events={handleEvent}
                />
            </div>
        </div>
    );
}

export default Calendar;