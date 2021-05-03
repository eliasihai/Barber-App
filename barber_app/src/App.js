import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import {createBrowserHistory} from 'history';
import "./App.css";

import Header from "./components/Header/Header";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import LoginForm from "./components/LoginForm/LoginForm";
import AllBarbers from "./components/AllBarbers/AllBarbers";
import Navbar from "./components/Navbar/navbar.component";
// import Calendar from "react-calendar";
import BigCalendar from "./components/Calendar/Calendar";
// import BigCalendar from './components/Calendar/BigCalendar';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      firstName: "",
      lastName: "",
      login: false,
      store: "",
      userType: "",
    };
  }

  componentDidMount() {
    let store = JSON.parse(localStorage.getItem("login"));
    // console.log("store", store);
    if (store && store.login) {
      this.setState(
        {
          login: true,
          userName: store.token.data.email,
          firstName: store.token.data.first_name,
          lastName: store.token.data.last_name,
          userType: store.token.data.type,
        },
        // () => {
        //   console.log(
        //     "componentDidMount: ",
        //     this.state.login,
        //     this.state.userName,
        //     this.state.firstName,
        //     this.state.lastName,
        //   );
        // }
      );
    }
  }
  render() {
    return (
      <Router>
        <div className="container App mx-auto">
          <Navbar />
          {/* <Header /> */}
          {/* <LoginForm />  */}
          {this.state.login ? (
            this.state.login && this.state.userType === "user" ?
            <Route path="/Barber-App" exact component={AllBarbers} /> : <Route path="/Barber-App" exact component={BigCalendar} />
          ) : (
            <Route path="/Barber-App" exact component={LoginForm} />
          )}

          <Route path="/allBarbers" component={AllBarbers} />
          <Route path="/register" component={RegistrationForm} />
          <Route path="/calendar" component={BigCalendar} />
        </div>
      </Router>
    );
  }
}

export default App;
