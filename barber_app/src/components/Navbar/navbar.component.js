import React, { Component } from "react";
import { Link } from "react-router-dom";

// LOGO
import logo from "../../images/barber-shop.svg";
class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      store: "",
    };
  }

  componentDidMount() {
    let store = JSON.parse(localStorage.getItem("login"));
    if (store) {
      this.setState({ store: store, userName: store.token.data.first_name });
    }
  }

  logout() {
    localStorage.clear();
    window.location.href = "/Barber-App";
  }

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg d-flex">
        <Link to="/Barber-App" className="navbar-brand">
          <img src={logo} width="40px" />
        </Link>

        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/allBarbers" className="navbar-brand">
                All Barbers
              </Link>
            </li>
            {/* <li className="navbar-item">
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </li> */}
            {/* <li className="navbar-item">
              <Link to="/calendar" className="nav-link">
                Calendar
              </Link>
            </li> */}
          </ul>
        </div>
        {this.state.store.token ? (
          <div className="collpase navbar-collapse" style={{ color: "white" }}>
            <ul className="navbar-nav w-100 d-flex justify-content-around">
              <li className="navbar-item ">Hello: {this.state.userName}</li>
              <li
                className="navbar-item"
                style={{ color: "white", cursor:"pointer" }}
                onClick={this.logout}
              >
                {/* <Link to="/" style={{color: 'white'}}> */}
                Log Out
                {/* </Link> */}
              </li>
            </ul>
          </div>
        ) : null}
      </nav>
    );
  }
}

export default Navbar;
