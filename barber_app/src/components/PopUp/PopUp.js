import React, { Component } from "react";
import axios from "axios";
import "./PopUp.css";

class PopUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      start: '',
      end: '',
      barber_id: '',
      barber_name: '', 
      user_id: '',
      user_name: '', 
    };
  }

  async componentDidMount() {
      const userData = JSON.parse(localStorage.getItem("login"));
      this.setState(
        {
          start: this.props.start.toLocaleTimeString(),
          end: this.props.end.toLocaleTimeString(),
          barber_id: this.props.barberID,
          barber_name: this.props.barberName,
          user_id: userData.token.data._id,
          user_name: userData.token.data.first_name
        }
      );

      let store = JSON.parse(localStorage.getItem("login"));
      console.log(store);
  }

  handleCancelClick = () => {
    this.props.toggle();
  };

  handleAddEvent = (event) => {
    const addEvent = {
      barberID: this.state.barber_id,
      userID: this.state.user_id,
      barberName: this.state.barber_name,
      userName: this.state.user_name,
      title: this.state.user_name,
      start: new Date(this.props.start),
      end: new Date(this.props.end),
    };

    axios
    .post("http://localhost:8000/api/Events/CreateEvent", addEvent)
    .then((res) => console.log(res))
    .catch((error) => {console.log(error);});
    window.location.reload(false);
    
  };

  render() {
    console.log(this.state.start);
    return (
      <div className="modal">
        <div className="modal_content">
          <span className="close" onClick={this.handleCancelClick}>
            &times;
          </span>
          <div>{this.state.barber_name}</div>
          <div>{this.state.user_name}</div>
          <div>{this.state.start}</div>
          <div>{this.state.end}</div>

          <input type="submit" onClick={this.handleAddEvent} />
        </div>
      </div>
    );
  }
}

export default PopUp;
