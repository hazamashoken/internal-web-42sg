"use client";
import React, { useState } from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import luxonPlugin from "@fullcalendar/luxon3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DateTime } from "luxon";

import { INITIAL_EVENTS, createEventId } from "./event-utils";

export default function DemoApp() {
  const [currentEvents, setCurrentEvents] = useState([]);

  function handleDateSelect(selectInfo) {
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    calendarApi.addEvent({
      id: createEventId(),
      start: selectInfo.startStr,
      end: selectInfo.endStr,
    });
  }
  function handleEventClick(clickInfo) {
    clickInfo.event.remove();
  }

  function renderEventContent(eventInfo) {
    return (
      <div className="flex justify-between p-2">
        <b>{eventInfo.timeText}</b>
        <button onClick={() => handleEventClick(eventInfo)}>x</button>
      </div>
    );
  }

  function handleEvents(events) {
    setCurrentEvents(events);
  }

  return (
    <FullCalendar
      plugins={[luxonPlugin, dayGridPlugin, timeGridPlugin, interactionPlugin]}
      headerToolbar={{
        left: "",
        center: "title",
        right: "today prev next",
      }}
      initialView="timeGridWeek"
      validRange={function (nowDate) {
        // DateTime(nowDate);
        return {
          start: nowDate,
          // end: nowDate.clone().add(2, "weeks"),
        };
      }}
      selectOverlap={false}
      snapDuration={"00:15:00"}
      slotDuration={"00:30:00"}
      slotLabelFormat={"h:mm a"}
      firstDay={1}
      editable={true}
      selectable={true}
      selectMirror={true}
      allDaySlot={false}
      select={handleDateSelect}
      //   eventColor="#C9E9E8"
      eventBackgroundColor="#C9E9E8"
      eventBorderColor="#02c4c7"
      eventTextColor="#02c4c7"
      eventContent={renderEventContent} // custom render function
      //   eventClick={handleEventClick}
      eventsSet={handleEvents} // called after events are initialized/added/changed/removed
      eventAdd={function (arg) {
        console.log(arg);
      }}
      eventChange={function (arg) {
        console.log(arg);
      }}
      eventRemove={function (arg) {
        console.log(arg);
      }}
    />
  );
}
