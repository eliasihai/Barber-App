import React, { Component } from "react";
import axios from "axios";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import { withRouter } from "react-router";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
// CSS
import "./LoginForm.css";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.state = {
      email: "",
      password: "",
      successMessage: "",
      login: false,
      store: "",
      userName: "",
      emailError: "",
      passwordError: "",
      errorCode: "",
      selectedOption: "",
      checked: false,
    };
  }
  componentDidMount() {
    this.storeCollector();
    let store = JSON.parse(localStorage.getItem("login"));
    if (store && store.login) {
      console.log(store);
      this.setState({ login: true, userName: store.token.data.first_name });
    }
  }

  storeCollector() {
    let store = JSON.parse(localStorage.getItem("login"));
    if (store && store.login) {
      this.setState((prevState) => ({
        ...prevState,
        successMessage: "Login successful. Redirecting to home page..?",
        login: true,
        store: store.token,
        userName: store.token.data.first_name,
      }));
      // props.history.push('/calendar');
    }
    // console.log("fdsfsdfsd", store);
  }

  handleChange = (e) => {
    const { id, value } = e.target;
    this.setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  handleSubmitClick = (e) => {
    e.preventDefault();
    const payload = {
      email: this.state.email,
      password: this.state.password,
    };

    const isValid = this.validate();
    if (isValid) {
      // Clear the form

      this.setState({
        email: "",
        password: "",
        emailError: "",
        passwordError: "",
      });
    }
    console.log("dasdasad");
    if (this.state.checked == true) {
      console.log('barber Login ',this.state.checked);
      axios
        .post("http://localhost:8000/api/Barbers/login", payload)
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem(
              "login",
              JSON.stringify({
                login: true,
                token: response.data,
              })
            );
            this.storeCollector();
            this.redirectToCalendar();
          } else if (response.code === 204) {
            console.log(response);
            console.log("Email and password do not match");
            this.setState({ errorCode: "Email and password do not match" });
            console.log("Email and password do not match2");
          } else {
            this.setState({ errorCode: "Email and password do not match" });
            console.log("Email and password do not match2");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      console.log(this.state.checked);
      axios
        .post("http://localhost:8000/api/Users/login", payload)
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem(
              "login",
              JSON.stringify({
                login: true,
                token: response.data,
              })
            );
            this.storeCollector();
            this.redirectToAllBarbers();
          } else if (response.code === 204) {
            console.log(response);
            console.log("Email and password do not match");
          } else {
            this.setState({ errorCode: "Email and password do not match" });
            console.log("Email and password do not match2");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  redirectToCalendar() {
    window.location.reload();
    this.props.history.push("/calendar");
  }

  redirectToAllBarbers() {
    window.location.reload();
    this.props.history.push("/allBarbers");
  }

  validate = () => {
    let emailError = "";
    let passwordError = "";

    if (!this.state.email.includes("@")) {
      emailError = "Invalid email";
    }

    if (emailError) {
      this.setState({ emailError });
      return false;
    }

    if (this.state.password.length < 6) {
      passwordError = "Invalid password";
    }

    if (passwordError) {
      this.setState({ passwordError });
      return false;
    }

    return true;
  };

  onValueChange(event) {
    this.setState({ checked: !this.state.checked }, () => {
      console.log("ddasdassd ", this.state.checked);
    });
    return this.state.checked;
    // this.setState(
    //   {
    //     selectedOption: event.target.value,
    //   },
    //   () => {
    //     console.log(this.state.selectedOption);
    //   }
    // );

    // return this.state.selectedOption;
  }
  // redirectToRegister() {
  //   this.props.history.push("/register");
  //   // props.updateTitle("Register");
  // };

  render() {
    return (
      <div>
        {!this.state.login ? (
          <div className="card col-12 col-lg-4 login-card mt-5 hv-center mx-auto p-2">
            <div className="text-center">Login</div>
            <form>
              <div className="form-group text-left">
                <label htmlFor="exampleInputEmail1" className="mt-2">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <div style={{ color: "red" }}>{this.state.emailError}</div>
                <label htmlFor="exampleInputPassword1" className="mt-2">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <div style={{ color: "red" }}>{this.state.passwordError}</div>

                <div className="mb-2 d-flex" style={{ textAlign: "left" }}>
                  <span className="mr-1">Barber</span>
                  {/* <input
                    id="barberBtn"
                    type="radio"
                    value="Barber"
                    name="Barber"
                    checked={this.state.selectedOption === "Barber"}
                    onChange={this.onValueChange}
                  /> */}
                  <ToggleSwitch
                    id="toggleSwitch"
                    checkedChange={this.onValueChange}
                    checked={this.checked}
                  />
                </div>
              </div>
              <button
                onClick={this.handleSubmitClick}
                type="submit"
                className="btn btn-primary mx-auto d-flex"
              >
                Log In
              </button>
              <div style={{ color: "red" }}>{this.state.errorCode}</div>
            </form>

            <div className="registerMessage">
              <span>Dont have an account? </span>
              <span className="loginText" onClick={this.redirectToRegister}>
                <Link to="/register">Register</Link>
              </span>
            </div>
          </div>
        ) : (
          <div>
            <div
              className="alert alert-success mt-2"
              // style={{ display: this.state.successMessage ? "block" : "none" }}
              // role="alert"
            >
              {this.state.successMessage} <Link to="/calendar">CLICK HERE</Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(LoginForm);
