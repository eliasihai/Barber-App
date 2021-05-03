import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
// import { DragDropContext } from "react-dnd";
import hardCodedEvents from "./events";

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
    // this.handlerSelected = this.handlerSelected.bind(this);
    // this.onSelectEventHandle = this.onSelectEventHandle.bind(this);
    this.addEventHandler = this.addEventHandler.bind(this);
    // console.log(this.state.events1)
  }


  async componentDidMount(props){
    // console.log(props.barber._id);
    axios
      .get("http://localhost:8000/api/Events/AllEvents")
      .then((response) => {
        // console.log(response.data[2].start);
        console.log('didmount ',response.data);
        let appointments = [];
        for (let i = 0; i < response.data.length; i++) {

          // if (response.data[i].title !== ''){
            appointments.push(response.data[i])
          // };
        }
        // console.log('appointments' , appointments)
        
        for (let i = 0; i < appointments.length; i++) {
          appointments[i].start =    moment.utc(appointments[i].start).toDate();
          appointments[i].end = moment.utc(appointments[i].end).toDate();

        }

        this.setState({ events: appointments });
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
    console.log(' onEventClicked ', event);
    
  };

  // handlerSelected = (event) => {
  //   console.log('handlerSelected ',event);
  // };
  // onSelectEventHandle= (event) =>{
  //   console.log('onSelectEventHandle ', event );
  // }
  slotSelected= (event) =>{
    console.log('slotSelected ', event );
    console.log(event.slots[0]);
    console.log(event.slots[1]);
  }

  render() {
    return (
      <div className="Calendar">
                {/* {console.log('aaa', this.state.events)} */}
        <button onClick={this.addEventHandler}>Add Event</button>
        {this.state.events.length > 0 ? 
          // console.log(this.state.events.length)
        (<Calendar
        selectable={true}
        // onSelectEvent={this.onSelectEventHandle}
          defaultDate={moment().toDate()}
          defaultView="day"
          events={this.state.events}
          localizer={localizer}
          step={15}
          // date={this.state.date}
          style={{ height: "100vh" }}
          // onSelectEvent={this.onEventClicked}
          // onSelecting={this.handlerSelected}
          onSelectSlot={(this.slotSelected)}
        />)
        : null}
      </div>
    );
  }
}

export default MyCalendar;
