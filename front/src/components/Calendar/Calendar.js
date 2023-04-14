import React, {useEffect} from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import timeGridPlugin from '@fullcalendar/timegrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import {useState} from "react";
import data from '../../test_bd.json';
import style from "./Calendar.module.css";
import moment from "moment";
import styled from "@emotion/styled";

export const CalendarStyleWrapper = styled.div`
  .fc-today-button {
    background: #A7C57A;
    border-radius: 11px;
    color: #343A50;
    border-color: #88B04B3B;
  }

  .fc-today-button:hover, .fc-button-primary:not(:disabled):active {
    background: #88B04B;
    border-color: #88B04B;
  }

  .fc .fc-button-primary:disabled {
    background: #D4D0D0;
    border-color: #D4D0D0;
  }
  .fc-next-button, .fc-prev-button, .fc-next-button:hover, .fc-prev-button:hover,
  .fc-next-button:active, .fc-prev-button:active, .fc-next-button:focus, .fc-prev-button:focus {
    background-color: transparent !important;
    border-color: transparent !important;
    box-shadow: none !important;
  }
  .fc-icon-chevron-right, .fc-icon-chevron-left {
    color: #494C62;
  }
  .fc-timeGridWeek-button, .fc-timeGridDay-button {
    background: #A7C57A !important;
    border-color: #88B04B !important;
    border-radius: 18px;
  }
  .fc-timeGridWeek-button[aria-pressed=true], .fc-timeGridDay-button[aria-pressed=true] {
    background: #88B04B !important;
    border-color: #88B04B !important;
  }
  .fc-media-screen {
    height: 1500px;
  }
  .fc-day-grid-container.fc-scroller {
    height: 100% !important;
    overflow-y: auto;
  }
`

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
                </CalendarStyleWrapper>
            </div>
        </div>
    )
}

export default Calendar;
