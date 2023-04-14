import styled from "@emotion/styled";

export const CalendarStyleWrapper = styled.div`
  .fc-today-button {
    background: #A7C57A;
    border-radius: 11px;
    color: #343A50;
    border-color: #88B04B3B;
  }
  z-index: 0;

  .fc-today-button:hover, .fc-button-primary:not(:disabled):active {
    background: #88B04B;
    border-color: #88B04B;
    z-index: 0;
  }

  .fc .fc-button-primary:disabled {
    background: #D4D0D0;
    border-color: #D4D0D0;
    z-index: 0;
  }
  .fc-next-button, .fc-prev-button, .fc-next-button:hover, .fc-prev-button:hover,
  .fc-next-button:active, .fc-prev-button:active, .fc-next-button:focus, .fc-prev-button:focus {
    background-color: transparent !important;
    border-color: transparent !important;
    box-shadow: none !important;
    z-index: 0;
  }
  .fc-icon-chevron-right, .fc-icon-chevron-left {
    color: #494C62;
    z-index: 0;
  }
  .fc-timeGridWeek-button, .fc-timeGridDay-button, 
  .fc .fc-button-primary:not(:disabled).fc-button-active, .fc .fc-button-primary:not(:disabled):hover{
    background: #A7C57A;
    border-color: #88B04B;
    z-index: 0;
  }
  .fc-timeGridWeek-button[aria-pressed=true], .fc-timeGridDay-button[aria-pressed=true] {
    background: #88B04B !important;
    border-color: #88B04B !important;
    z-index: 0;
  }
  .fc-media-screen {
    height: 2020px;
    z-index: 0;
  }
  .fc-day-grid-container.fc-scroller {
    height: 100%;
    overflow-y: auto;
    z-index: 0;
  }
  .fc-scrollgrid-section-header {
    background-color: #E4EDD6 !important;
    z-index: 0;
  }
  td {
    height: 35px !important;
    z-index: 0;
  }
  .fc-timegrid-event {
    border-radius: 10px;
    z-index: 0;
  }
  .fc-view-harness, .fc-view-harness-active {
    z-index: 0;
  }
  .fc-event-title {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 0;
  }
`