// Libraries Imports
import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";

// Components and CSS Imports
import PopUp from "../PopUp/PopUp.js";
import "./Calendar.css";

const localizer = momentLocalizer(moment);

class MyCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      date: new Date(2021, 1, 13),
      seen: false,
      start: [],
      end: [],
      recievedMessage: "",
      recievedMessageBarberName: "",
    };

    // this.moveEvent = this.moveEvent.bind(this);
    this.onEventClicked = this.onEventClicked.bind(this);
    // this.handlerSelected = this.handlerSelected.bind(this);
    // this.onSelectEventHandle = this.onSelectEventHandle.bind(this);
    // console.log(this.state.events1)
  }

  async componentDidMount(props) {
    this.setState({
      recievedMessage: this.props.location.state.barber_ID,
      recievedMessageBarberName: this.props.location.state.barber_name,
    });
    const propsRecievedMessage = this.props;
    const barberID = propsRecievedMessage.location.state.barber_ID;
    axios
      .get(`http://localhost:8000/api/Events/${barberID}`)
      .then((response) => {
        console.log("response.data ", response.data.data);
        let appointments = [];
        for (let i = 0; i < response.data.data.length; i++) {
          appointments.push(response.data.data[i]);
        }
        for (let i = 0; i < appointments.length; i++) {
          appointments[i].start = moment.utc(appointments[i].start).toDate();
          appointments[i].end = moment.utc(appointments[i].end).toDate();
        }
        this.setState({ events: appointments });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  togglePop = () => {
    console.log(this.state.seen);
    this.setState({
      seen: !this.state.seen,
    });
  };
  

  onEventClicked = (event) => {
    console.log(" onEventClicked ", event);
  };

  slotSelected = (event) => {
    this.setState(
      {
        seen: !this.state.seen,
        barberID: this.state.recievedMessage,
        barber_name: this.state.recievedMessageBarberName,
        start: event.slots[0],
        end: event.slots[1],
      }
    );
  };

  render() {
    return (
      <div className="Calendar">
        {this.state.seen ? (
          <PopUp
            toggle={this.togglePop}
            start={this.state.start}
            end={this.state.end}
            barberID={this.state.barberID}
            barberName={this.state.barber_name}
          />
        ) : null}
          <Calendar
            selectable={true}
            defaultDate={moment().toDate()}
            defaultView="day"
            events={this.state.events}
            localizer={localizer}
            step={30}
            style={{ height: "100vh" }}
            onSelectEvent={this.onEventClicked}
            onSelectSlot={this.slotSelected}
          />
      </div>
    );
  }
}

export default MyCalendar;
