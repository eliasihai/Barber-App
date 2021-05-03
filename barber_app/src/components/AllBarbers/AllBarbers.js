import React, { Component } from "react";
import axios from "axios";
import Barber from "../AllBarbers/Barber"
import "./AllBarbers.css";
class AllBarbers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      barbers: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8000/api/Barbers/getAllBarbers")
      .then((response) => {
        console.log(response);
        this.setState({ barbers: response.data.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleOutPutClick = (barber_id) => {
    // console.log(event);
    console.log(barber_id);
    // <Route path="/calendar" component={BigCalendar} />
    // window.location = "/calendar";
  };

  render() {
    let barbers;
    // if (this.state.barbers.lenth > 0) {
    barbers = this.state.barbers.map((barber,) => {
      return (
        <Barber
          key={barber._id}
          barberId={barber._id}
          firstName={barber.first_name}
          lastName={barber.last_name}
          codeArea={barber.phoneNumberSelected1}
          phonDigits={barber.phone_digits}
          outPutClick={()=>this.handleOutPutClick(barber._id)}
        />
      );
    });
    // } else {
    // console.log("less then 1");
    // }
    return (
      <div>
        {/* <table className="table">
          <thead className="thread-light">
            <tr>
              <th>Name</th>
            </tr>
          </thead>
        </table> */}
        {this.state.barbers.length > 0 ? (
          <div className="allBarbers-container">{barbers}</div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}

export default AllBarbers;
