import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import timeGridPlugin from '@fullcalendar/timegrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import {useState, useRef} from "react";
import style from "./Calendar.module.css";
import moment from "moment";
import Modal from "../Modal/Modal.js";
import Alert from "../Alert/Alert.js";
import {CalendarStyleWrapper} from "./StylingCalendar";
import {ajaxService} from "../../services/ajaxService";
import {Tooltip} from "bootstrap";


const Calendar = (props) => {
    const [isModal, setIsModal] = useState(false)
    const [isAlert, setIsAlert] = useState(false)
    const [blocked, setBlocked] = useState([])
    const [slot, setSlot] = useState(null)
    const calendarRef = useRef(null)

    const showModal = (time) => {
        setSlot(time)
        setIsModal(true)
    };
    const hideModal = () => {
        setIsModal(false);
    };

    const showAlert = (start, end) => {
        setBlocked([start, end])
        setIsAlert(true)
    };
    const hideAlert = () => {
        setIsAlert(false);
    };

    const parseEventTitle = (title) => {
        if (title === 4) {
            return "Мест нет"
        } else {
            return title + "/4 мест занято";
        }
    }

    const handleEvent = (info, successCallback, failureCallback) => {
        ajaxService(`/events?start=${info.startStr.valueOf()}&end=${info.endStr.valueOf()}`).then((data) => {
            let slots = []
            data.result.slots.map((eventEl) => {
                const start = moment(eventEl['slot']);
                const end = moment(eventEl['slot']).add(10, "m");
                slots.push({
                    title: parseEventTitle(eventEl['participants']),
                    start: start.format("YYYY-MM-DD HH:mm"),
                    end: end.format("YYYY-MM-DD HH:mm"),
                    extendedProps: {
                        participants: eventEl['participants'],
                        members: eventEl['members']
                    },
                })
            });
            data.result.blocked_ranges.map((blockedEl) => {
                const start = moment(blockedEl['start']);
                const end = moment(blockedEl['end']);
                slots.push({
                    title: "",
                    start: start.format("YYYY-MM-DD HH:mm"),
                    end: end.format("YYYY-MM-DD HH:mm"),
                })
            })
            successCallback(slots)
        }).then();
    }

    const handleEventClick = (info) => {
        if (info.event.title === "") {
            showAlert(info.event.startStr, info.event.endStr)
        } else {
            showModal(info.event.startStr)
        }
    }

    const handleDateClick = (info) => {
        showModal(info.dateStr)
    }

    const handleEventDidMount = (info) => {
        const calendarEventEl = info.el;
        if (info.event.title === "") {
            calendarEventEl.style.backgroundColor = "#D4D0D0";
            calendarEventEl.style.borderColor = "#D4D0D0";
        } else if (info.event.title === "Мест нет") {
            calendarEventEl.style.backgroundColor = "rgba(136,176,75,0.89)";
            calendarEventEl.style.borderColor = "rgba(136,176,75,0.89)";
        } else {
            calendarEventEl.style.backgroundColor = "#88B04B80";
            calendarEventEl.style.borderColor = "#88B04B80";
        }
    }

    let tooltipInstance = null;

    const handleMouseEnter = (info) => {
        if (info.event.title === "") {
            return;
        }
        const member_amt = info.event.extendedProps.members
        const participants_amt = info.event.extendedProps.participants;
        const guest_amt = participants_amt - member_amt
        let tooltip_text = "В этом слоте:<br>"
        for (let i = 0; i < member_amt; i++) {
            tooltip_text += " ✓ член клуба<br>"
        }
        for (let i = 0; i < guest_amt; i++) {
            tooltip_text += " ✕ посетитель<br>"
        }
        for (let i = 0; i < 4 - participants_amt; i++) {
            tooltip_text += " 〇 свободное<br>"
        }

        tooltipInstance = new Tooltip(info.el, {
            title: tooltip_text,
            html: true,
            placement: "right",
            trigger: "hover",
            container: "body",
            offset: ",5",
            customClass: style.tooltip
        });
        tooltipInstance.show();
    };

    const handleMouseLeave = (info) => {
        if (tooltipInstance) {
            tooltipInstance.dispose();
            tooltipInstance = null;
        }
    };

    const handleSelect = (info) => {
        if (info.end - info.start < 700000) {
            return;
        }
        ajaxService(`/blocked_range`, {
            method: 'POST',
            body: JSON.stringify({start: info.start, end: info.end}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            calendarRef.current.getApi().refetchEvents();
        });
    }

    return (
        <div>
            <Alert show={isAlert} handleOnClose={hideAlert} start={blocked[0]} end={blocked[1]}></Alert>
            <Modal show={isModal} handleOnClose={hideModal} slot={slot}></Modal>
            <div className={style.calendar}>
                <div className={style.title}>Бронирование Tee-time</div>
                <CalendarStyleWrapper>
                    <FullCalendar
                        ref={calendarRef}
                        plugins={[timeGridPlugin, interactionPlugin]}
                        locale="ru"
                        timeZone="Europe/Moscow"
                        initialView="timeGridWeek"
                        nowIndicator={true}
                        headerToolbar={{
                            left: 'today prev,next',
                            center: 'title',
                            right: `${props.is_admin ? "timeGridWeek,timeGridDay" : ""}`
                        }}
                        navLinks={true} // can click day/week names to navigate views
                        editable={false} // запрет двигать и менять размер события
                        selectable={props.is_admin ? true : null}
                        select={handleSelect}
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
                        eventTextColor={'#494C62'}
                        displayEventTime={false}
                        eventClick={props.is_admin ? handleEventClick : null}
                        dateClick={props.is_admin ? handleDateClick : null}
                        eventDidMount={handleEventDidMount}
                        eventMouseEnter={props.is_admin ? null : handleMouseEnter}
                        eventMouseLeave={props.is_admin ? null : handleMouseLeave}
                    />
                </CalendarStyleWrapper>
            </div>
        </div>
    )
}

export default Calendar;
