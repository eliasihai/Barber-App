import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
// import { DragDropContext } from "react-dnd";
// import events from "./events";

// import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

import "./Calendar.css";
import axios from "axios";




const localizer = momentLocalizer(moment);
// const DnDCalendar = withDragAndDrop(Calendar);

class MyCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      date: new Date(2021, 1, 13),

      hourSelect: [
        {'start': '10:00', 'ends': '10:30'},
        {'start': '10:30', 'ends': '11:00'},
        {'start': '11:00', 'ends': '11:30'},
        {'start': '11:30', 'ends': '12:00'},
        {'start': '12:00', 'ends': '12:30'},
        {'start': '12:30', 'ends': '13:00'},
        {'start': '13:00', 'ends': '13:30'},
      ],
    };

    // this.moveEvent = this.moveEvent.bind(this);
    this.onEventClicked = this.onEventClicked.bind(this);
    this.handlerSelected = this.handlerSelected.bind(this);
    this.onSelectEventHandle = this.onSelectEventHandle.bind(this);
    this.addEventHandler = this.addEventHandler.bind(this);
  }


  componentDidMount(){
    axios
      .get("https://calm-retreat-65596.herokuapp.com/api/Events/AllEvents")
      .then((response) => {
        console.log(response.data[2].start)
        // this.setState({ events: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  addEventHandler = () => {
    console.log(new Date());
    console.log('events : ', this.state.events);
  } 
  // addEventHandler = () => {
  //   let id = 11;
  //   let title = "testtesttest";
  //   // allDay: true,
  //   let start = new Date(2021, 2, 16,13, 0, 0);
  //   let end =  new Date(2021, 2, 16,13, 30, 0);

  //   axios
  //   .post("events.js", user)
  //   .then((res) => console.log(res))
  // }

  // moveEvent({ event, start, end }) {
  //   const { events } = this.state;

  //   const idx = events.indexOf(event);
  //   const updatedEvent = { ...event, start, end };

  //   const nextEvents = [...events];
  //   nextEvents.splice(idx, 1, updatedEvent);

  //   this.setState({
  //     events: nextEvents,
  //   }, ()=>console.log('asaaaa'));
  // }

  // resizeEvent = (resizeType, { event, start, end }) => {
  //   const { events } = this.state;

  //   const nextEvents = events.map((existingEvent) => {
  //     return existingEvent.id == event.id
  //       ? { ...existingEvent, start, end }
  //       : existingEvent;
  //   });

  //   this.setState({
  //     events: nextEvents,
  //   });
  // };

  onEventClicked = (event) => {
    // const { events } = this.state;
    // events.forEach(event => console.log(event));
    console.log(event);
  };

  handlerSelected = (event) => {
    console.log(event);
  };
  onSelectEventHandle= (event) =>{
    console.log(event);
  }
  render() {
    return (
      <div className="Calendar">
        <button onClick={this.addEventHandler}>Add Event</button>
        <Calendar
        selectable={true}
        onSelectEvent={this.onSelectEventHandle}
          defaultDate={moment().toDate()}
          defaultView="day"
          events={this.state.events}
          localizer={localizer}
          // date={this.state.date}
          style={{ height: "100vh" }}
          onSelectEvent={this.onEventClicked}
          onSelecting={this.handlerSelected}
        />
        {/* {console.log(events)} */}
      </div>
    );
  }
}

export default MyCalendar;
