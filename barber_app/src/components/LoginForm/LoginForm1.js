import React, { Component, useState } from "react";
import axios from "axios";

// CSS
import "./LoginForm.css";

function LoginForm(props) {
  const [state, setState] = useState({
    email: "",
    password: "",
    successMessage: null,
    login: false,
    store: "",
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    const payload = {
      email: state.email,
      password: state.password,
    };

    axios
      .post("http://localhost:8000/api/Users/login", payload)
      // .post("https://barber-calendar-app.herokuapp.com/Users/login", payload)
      .then(function (response) {
        if (response.status === 200) {
          setState((prevState) => ({
            ...prevState,
            successMessage: "Login successful. Redirecting to home page..",
          }));
          console.log(response.data.header);
          localStorage.setItem(
            "login",
            JSON.stringify({
              login: true,
              token: response.data.header,
            })
          );
          // localStorage.setItem(ACCESS_TOKEN_NAME,response.data.token);
          redirectToHome();
          // props.showError(null)
        } else if (response.code === 204) {
          console.log("Username and password do not match");
          // props.showError("Username and password do not match");
        } else {
          // props.showError("Username does not exists");
          console.log("Username and password do not match2");
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    // console.log(payload);
    // fetch("https://localhost:8000/api/Users/login", {
    //   method: "POST",
    //   body: payload
    //   // headers: { "Content-Type": "application/json" },
    //   // body: JSON.stringify({
    //   //   "email": state.email,
    //   //   "password": state.password,
    //   // })
    // }).then((response) => {
    //   // response.json().then((result) => {
    //     console.warn("result", response);
    //     // localStorage.setItem(
    //     //   "login",
    //     //   JSON.stringify({
    //     //     login: true,
    //     //     token: result.token,
    //     //   })
    //     // );
    //   // });
    // });
  };

  const redirectToHome = () => {
    // props.updateTitle("create");
    this.context.history.push("/calendar");
  };
  const redirectToRegister = () => {
    props.history.push("/register");
    // props.updateTitle("Register");
  };

  return (
    <div className="card col-12 col-lg-4 login-card mt-5 hv-center mx-auto p-2">
      <div>
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
              value={state.email}
              onChange={handleChange}
            />

            <label htmlFor="exampleInputPassword1" className="mt-2">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={state.password}
              onChange={handleChange}
            />
          </div>
          <button
            onClick={handleSubmitClick}
            type="submit"
            className="btn btn-primary mx-auto d-flex"
          >
            Log In
          </button>
        </form>

        <div
          className="alert alert-success mt-2"
          style={{ display: state.successMessage ? "block" : "none" }}
          role="alert"
        >
          {state.successMessage}
        </div>
        <div className="registerMessage">
          <span>Dont have an account? </span>
          <span className="loginText" onClick={() => redirectToRegister()}>
            Register
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
