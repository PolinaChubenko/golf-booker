import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import timeGridPlugin from '@fullcalendar/timegrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import {useState} from "react";
import style from "./Calendar.module.css";
import moment from "moment";
import Modal from "../Modal/Modal.js";
import {CalendarStyleWrapper} from "./StylingCalendar";
import {ajaxService} from "../../services/ajaxService";
import { Tooltip } from "bootstrap";


const Calendar = (props) => {
    const [isModal, setIsModal] = useState(false)
    const [slot, setSlot] = useState(null)

    const showModal = (time) => {
        setSlot(time)
        setIsModal(true)
    };
    const hideModal = () => {
        setIsModal(false);
    };

    const handleEvent = (info, successCallback, failureCallback) => {
        ajaxService(`/slot/list?start=${info.startStr.valueOf()}&end=${info.endStr.valueOf()}`).then((data) => {
            successCallback(data.result.map((eventEl) => {
                const start = moment(eventEl['slot']);
                const end = moment(eventEl['slot']).add(10, "m");
                return {
                    title: eventEl['participants'],
                    start: start.format("YYYY-MM-DD HH:mm"),
                    end: end.format("YYYY-MM-DD HH:mm")
                }
            }));
        }).then();
    }

    const handleEventClick = (info) => {
        showModal(info.event.startStr)
    }

    const handleDateClick = (info) => {
        showModal(info.dateStr)
    }

    const handleEventDidMount = (info) => {
        const calendarEventEl = info.el;
        if (info.event.title === "Мест нет") {
            calendarEventEl.style.backgroundColor = "#ABABAB";
            calendarEventEl.style.borderColor = "#ABABAB";
        } else {
            calendarEventEl.style.backgroundColor = "#D4D0D0";
            calendarEventEl.style.borderColor = "#D4D0D0";
        }
    }

    let tooltipInstance = null;

    const handleMouseEnter = (info) => {
        const member_amt = 1
        const guest_amt = 0
        tooltipInstance = new Tooltip(info.el, {
            title: `В этом слоте: члены клуба -- ${member_amt} гости -- ${guest_amt}`,
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

    return (
        <div>
            <Modal show={isModal} handleOnClose={hideModal} slot={slot}></Modal>
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
                        selectable={props.is_admin ? true : null}
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
                        eventMouseEnter={handleMouseEnter}
                        eventMouseLeave={handleMouseLeave}
                    />
                </CalendarStyleWrapper>
            </div>
        </div>
    )
}

export default Calendar;
