import React, { useState, Component } from "react";
import axios from "axios";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import Number from "../PhonesNumbers/PhonesNumbers";

// CSS
import "./RegistrationForm.css";

// import barberIcon from "../../images/barber-icon.jpg";
class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.phoneNumberHandleChange = this.phoneNumberHandleChange.bind(this);
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      users: [],
      selectedOption: "",
      checked: false,
      phoneNumberSelected1: "",
      phoneNumbersOptions: [
        { value: "02", label: "02" },
        { value: "03", label: "03" },
        { value: "04", label: "04" },
        { value: "08", label: "08" },
        { value: "09", label: "09" },
        { value: "050", label: "050" },
        { value: "051", label: "051" },
        { value: "052", label: "052" },
        { value: "053", label: "053" },
        { value: "054", label: "054" },
        { value: "055", label: "055" },
        { value: "056", label: "056" },
        { value: "058", label: "058" },
        { value: "059", label: "059" },
      ],
      phone_digits: "",

      fields: {},
      errors: {},
      errorsBoolean: true,
    };
  }
  // componentDidMount() {
  //   axios
  //     .get("http://localhost:8000/api/Users/getAllUsers")
  //     .then((response) => {
  //       if (response.data.length > 0) {
  //         this.setState({
  //           users: response.data.map((user) => user.first_name),
  //           first_name: response.data[0].first_name,
  //         });

  //         console.log(response.data.map((user) => user.first_name));
  //       }
  //     });
  // }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    let errorsBoolean = false;
    //Name
    if (this.state.first_name === "") {
      formIsValid = false;
      errorsBoolean = true;
      errors["first_name"] = "Cannot be empty";
    }

    if (this.state.last_name === "") {
      formIsValid = false;
      errorsBoolean = true;
      errors["last_name"] = "Cannot be empty";
    }

    //Email
    if (this.state.email === "") {
      formIsValid = false;
      errorsBoolean = true;
      errors["email"] = "Cannot be empty";
    }

    if (typeof this.state.email !== "undefined") {
      let lastAtPos = this.state.email.lastIndexOf("@");
      let lastDotPos = this.state.email.lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          this.state.email.indexOf("@@") == -1 &&
          lastDotPos > 2 &&
          this.state.email.length - lastDotPos > 2
        )
      ) {
        errorsBoolean = true;
        formIsValid = false;
        errors["email"] = "Email is not valid";
      }
    }

    if (this.state.password === "" || this.state.password.lenth < "6") {
      errorsBoolean = true;
      formIsValid = false;
      errors["password"] = "Password must be more then 6 digits";
    }

    if (this.state.password != this.state.confirmPassword) {
      errorsBoolean = true;
      formIsValid = false;
      errors["confirmPassword"] = "Password did not match: Please try again...";
    }

    if (this.state.phoneNumberSelected1 === "") {
      errorsBoolean = true;
      formIsValid = false;
      errors["area_code"] = "Please choose area code";
    }

    if (this.state.phone_digits === "") {
      errorsBoolean = true;
      formIsValid = false;
      errors["phoneDigits"] = "Please enter phone digits";
    }

    this.setState({ errors: errors, errorsBoolean: errorsBoolean }, () =>
      console.log(errorsBoolean)
    );
    return formIsValid;
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

    if (this.handleValidation()) {
      const user = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        password: this.state.password,
        type: "user",
        phoneNumberSelected1: this.state.phoneNumberSelected1,
        phone_digits: this.state.phone_digits,
        // phone: this.state.phoneNumberSelected1 + "-" + this.state.phone_digits,
      };
      const barber = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        password: this.state.password,
        type: "barber",
        phoneNumberSelected1: this.state.phoneNumberSelected1,
        phone_digits: this.state.phone_digits,
      };

      if (this.state.checked === true) {
        console.log(barber);
        console.log("barber register");
        axios
          .post("http://localhost:8000/api/Barbers/register", barber)
          .then((res) => console.log(res))
          .catch((error) => {
            console.log(error.response.data);
            let errors = {};
            let formIsValid = true;
            let errorsBoolean = false;
            // Name
            if (this.state.first_name === "") {
              formIsValid = false;
              errorsBoolean = true;
              errors["first_name"] = error.response.data.message;
  
              this.setState(
                { errors: errors, errorsBoolean: errorsBoolean },
                () => console.log(errorsBoolean)
              );
              return formIsValid;
            }
            // last name
            if (this.state.last_name === "") {
              formIsValid = false;
              errorsBoolean = true;
              errors["last_name"] = error.response.data.message;
  
              this.setState(
                { errors: errors, errorsBoolean: errorsBoolean },
                () => console.log(errorsBoolean)
              );
              return formIsValid;
            }
  
            // Email
            if (this.state.email === "") {
              formIsValid = false;
              errorsBoolean = true;
              errors["email"] = error.response.data.message;
  
              this.setState(
                { errors: errors, errorsBoolean: errorsBoolean },
                () => console.log(errorsBoolean)
              );
              return formIsValid;
            }
  
            if (error.response.data.message === "Email already exist") {
              formIsValid = false;
              errorsBoolean = true;
              errors["email"] = error.response.data.message;
  
              this.setState(
                { errors: errors, errorsBoolean: errorsBoolean },
                () => console.log(errorsBoolean)
              );
              return formIsValid;
            }
            // Email
            if (typeof this.state.email !== "undefined") {
              let lastAtPos = this.state.email.lastIndexOf("@");
              let lastDotPos = this.state.email.lastIndexOf(".");
  
              if (
                !(
                  lastAtPos < lastDotPos &&
                  lastAtPos > 0 &&
                  this.state.email.indexOf("@@") == -1 &&
                  lastDotPos > 2 &&
                  this.state.email.length - lastDotPos > 2
                )
              ) {
                errorsBoolean = true;
                formIsValid = false;
                errors["email"] = error.response.data.message;
                this.setState(
                  { errors: errors, errorsBoolean: errorsBoolean },
                  () => console.log(errorsBoolean)
                );
                return formIsValid;
              }
            }
            // password
            if (this.state.password === "" || this.state.password.lenth < "6") {
              errorsBoolean = true;
              formIsValid = false;
              errors["password"] = error.response.data.message;
  
              this.setState(
                { errors: errors, errorsBoolean: errorsBoolean },
                () => console.log(errorsBoolean)
              );
              return formIsValid;
            }
            // re password
            if (this.state.confirmPassword === "") {
              errorsBoolean = true;
              formIsValid = false;
              errors["confirmPassword"] =
                "Password did not match: Please try again...";
  
              this.setState(
                { errors: errors, errorsBoolean: errorsBoolean },
                () => console.log(errorsBoolean)
              );
              return formIsValid;
            }
  
            if (this.state.password != this.state.confirmPassword) {
              errorsBoolean = true;
              formIsValid = false;
              errors["confirmPassword"] =
                "Password did not match: Please try again...";
  
              this.setState(
                { errors: errors, errorsBoolean: errorsBoolean },
                () => console.log(errorsBoolean)
              );
              return formIsValid;
            }
            // area code selection
            if (this.state.phoneNumberSelected1 === "") {
              errorsBoolean = true;
              formIsValid = false;
              console.log(error.response.data.message)
              errors["area_code"] = error.response.data.message;
  
              this.setState(
                { errors: errors, errorsBoolean: errorsBoolean },
                () => console.log(errorsBoolean)
              );
              return formIsValid;
            }
            // phone digits
            if (this.state.phone_digits === "") {
              errorsBoolean = true;
              formIsValid = false;
              errors["phoneDigits"] = error.response.data.message;
  
              this.setState(
                { errors: errors, errorsBoolean: errorsBoolean },
                () => console.log(errorsBoolean)
              );
              return formIsValid;
            }
  
            return formIsValid;
          });
  
        window.location = "/Barber-App";
      } else {
        console.log(user);
        console.log("user register");
        axios
          .post("http://localhost:8000/api/Users/register", user)
          .then((res) => console.log(res))
          .catch((error) => {
            console.log(error.response.data);
            let errors = {};
            let formIsValid = true;
            let errorsBoolean = false;
            // Name
            if (this.state.first_name === "") {
              formIsValid = false;
              errorsBoolean = true;
              errors["first_name"] = error.response.data.message;
  
              this.setState(
                { errors: errors, errorsBoolean: errorsBoolean },
                () => console.log(errorsBoolean)
              );
              return formIsValid;
            }
            // last name
            if (this.state.last_name === "") {
              formIsValid = false;
              errorsBoolean = true;
              errors["last_name"] = error.response.data.message;
  
              this.setState(
                { errors: errors, errorsBoolean: errorsBoolean },
                () => console.log(errorsBoolean)
              );
              return formIsValid;
            }
  
            // Email
            if (this.state.email === "") {
              formIsValid = false;
              errorsBoolean = true;
              errors["email"] = error.response.data.message;
  
              this.setState(
                { errors: errors, errorsBoolean: errorsBoolean },
                () => console.log(errorsBoolean)
              );
              return formIsValid;
            }
  
            if (error.response.data.message === "Email already exist") {
              formIsValid = false;
              errorsBoolean = true;
              errors["email"] = error.response.data.message;
  
              this.setState(
                { errors: errors, errorsBoolean: errorsBoolean },
                () => console.log(errorsBoolean)
              );
              return formIsValid;
            }
            // Email
            if (typeof this.state.email !== "undefined") {
              let lastAtPos = this.state.email.lastIndexOf("@");
              let lastDotPos = this.state.email.lastIndexOf(".");
  
              if (
                !(
                  lastAtPos < lastDotPos &&
                  lastAtPos > 0 &&
                  this.state.email.indexOf("@@") == -1 &&
                  lastDotPos > 2 &&
                  this.state.email.length - lastDotPos > 2
                )
              ) {
                errorsBoolean = true;
                formIsValid = false;
                errors["email"] = error.response.data.message;
                this.setState(
                  { errors: errors, errorsBoolean: errorsBoolean },
                  () => console.log(errorsBoolean)
                );
                return formIsValid;
              }
            }
            // password
            if (this.state.password === "" || this.state.password.lenth < "6") {
              errorsBoolean = true;
              formIsValid = false;
              errors["password"] = error.response.data.message;
  
              this.setState(
                { errors: errors, errorsBoolean: errorsBoolean },
                () => console.log(errorsBoolean)
              );
              return formIsValid;
            }
            // re password
            if (this.state.confirmPassword === "") {
              errorsBoolean = true;
              formIsValid = false;
              errors["confirmPassword"] =
                "Password did not match: Please try again...";
  
              this.setState(
                { errors: errors, errorsBoolean: errorsBoolean },
                () => console.log(errorsBoolean)
              );
              return formIsValid;
            }
  
            if (this.state.password != this.state.confirmPassword) {
              errorsBoolean = true;
              formIsValid = false;
              errors["confirmPassword"] =
                "Password did not match: Please try again...";
  
              this.setState(
                { errors: errors, errorsBoolean: errorsBoolean },
                () => console.log(errorsBoolean)
              );
              return formIsValid;
            }
            // area code selection
            if (this.state.phoneNumberSelected1 === "") {
              errorsBoolean = true;
              formIsValid = false;
              console.log(error.response.data.message)
              errors["area_code"] = error.response.data.message;
  
              this.setState(
                { errors: errors, errorsBoolean: errorsBoolean },
                () => console.log(errorsBoolean)
              );
              return formIsValid;
            }
            // phone digits
            if (this.state.phone_digits === "") {
              errorsBoolean = true;
              formIsValid = false;
              errors["phoneDigits"] = error.response.data.message;
  
              this.setState(
                { errors: errors, errorsBoolean: errorsBoolean },
                () => console.log(errorsBoolean)
              );
              return formIsValid;
            }
  
            return formIsValid;
          });
  
        window.location = "/Barber-App";
      }
    }
  };

  onValueChange(event) {
    this.setState({ checked: !this.state.checked }, () => {
      console.log("ddasdassd ", this.state.checked);
    });
    return this.state.checked;
  }

  phoneNumberHandleChange(event) {
    const re = /^[0-9\b]+$/;
    if (event.target.value === "" || re.test(event.target.value)) {
      this.setState({ phone_digits: event.target.value });
    }
  }

  onChangePhoneNumber(event) {
    console.log(event.target.value);
    this.setState({
      phoneNumberSelected1: event.target.value,
    });
  }

  render() {
    const numbers = this.state.phoneNumbersOptions.map((phonenum) => {
      return <Number number={phonenum.value} />;
    });

    return (
      <div className="card col-12 col-lg-4 login-card mt-5 hv-center mx-auto p-2">
        <div className="text-center">Registeration</div>
        {/* <img src={barberIcon}/> */}
        <form name="contactform" className="contactform">
          <div className="form-group text-left">
            <div>
              <label htmlFor="exampleInputFirstName">First Name</label>
              <input
                name="first_name"
                type="text"
                className="form-control"
                id="first_name"
                aria-describedby="emailHelp"
                placeholder="Enter first name"
                value={this.state.first_name}
                onChange={this.handleChange}
              />
              <label
                style={{ marginBottom: "0" }}
                className={
                  this.state.errorsBoolean ? "errStyle" : "formIsValid"
                }
              >
                {this.state.errors["first_name"]}
              </label>
            </div>

            <div>
              <label htmlFor="exampleInputLastName" className="mt-2">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="last_name"
                aria-describedby="emailHelp"
                placeholder="Enter last name"
                value={this.state.last_name}
                onChange={this.handleChange}
              />
              <label
                style={{ marginBottom: "0" }}
                className={
                  this.state.errorsBoolean ? "errStyle" : "formIsValid"
                }
              >
                {this.state.errors["last_name"]}
              </label>
            </div>
            <div>
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
              <label
                style={{ marginBottom: "0" }}
                className={
                  this.state.errorsBoolean ? "errStyle" : "formIsValid"
                }
              >
                {this.state.errors["email"]}
              </label>
            </div>
            <div>
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

              <label
                style={{ marginBottom: "0" }}
                className={
                  this.state.errorsBoolean ? "errStyle" : "formIsValid"
                }
              >
                {this.state.errors["password"]}
              </label>
            </div>
            {/* </div> */}
            {/* <div className="form-group text-left"> */}
            <div>
              <label htmlFor="exampleInputPassword1" className="mt-2">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Enter confirm password"
                value={this.state.confirmPassword}
                onChange={this.handleChange}
              />
              <label
                style={{ marginBottom: "0" }}
                className={
                  this.state.errorsBoolean ? "errStyle" : "formIsValid"
                }
              >
                {this.state.errors["confirmPassword"]}
              </label>
            </div>
            <label htmlFor="exampleInputPhone1" className="mt-2">
              Phone Number
            </label>
            <div className="d-flex">
              <select
                name={this.state.phoneNumberSelected1}
                value={this.state.phoneNumberSelected1}
                onChange={this.onChangePhoneNumber}
              >
                <option value=""></option>
                {numbers}
                {/* <option value="Orange">{this.state.phoneNumbersOptions[0].value}</option> */}
              </select>
              <input
                type="text"
                pattern="[0-9]*"
                className="form-control"
                id="phone"
                aria-describedby="phoneHelp"
                placeholder="Enter phone number"
                value={this.state.phone_digits}
                onChange={this.phoneNumberHandleChange}
              />
            </div>
            <label
              style={{ marginBottom: "0" }}
              className={this.state.errorsBoolean ? "errStyle" : "formIsValid"}
            >
              {this.state.errors["area_code"]}
            </label>
            <label
              style={{ marginBottom: "0" }}
              className={this.state.errorsBoolean ? "errStyle" : "formIsValid"}
            >
              {this.state.errors["phoneDigits"]}
            </label>
          </div>
          <div className="mb-2 d-flex" style={{ textAlign: "left" }}>
            <span className="mr-1">If you a barber click here</span>
            <ToggleSwitch
              id="toggleSwitch"
              checkedChange={this.onValueChange}
              checked={this.checked}
            />
          </div>
          <button
            onClick={this.handleSubmitClick}
            type="submit"
            className="btn btn-primary mx-auto d-flex"
          >
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default RegistrationForm;

// function RegistrationForm(props) {
// const [state, setState] = useState({
//   first_name: "",
//   last_name: "",
//   email: "",
//   password: "",
// });

// const handleChange = (e) => {
//   const { id, value } = e.target;
//   setState((prevState) => ({
//     ...prevState,
//     [id]: value,
//   }));
// };

// const handleSubmitClick = (e) => {
//   e.preventDefault();
//   if (state.password === state.confirmPassword) {
//     sendDetailsToServer();
//   } else {
//     props.showError("Passwords do not match");
//   }
// };

// const sendDetailsToServer = () => {
//   if (state.email.length && state.password.length) {
//     props.showError(null);
//     const payload = {
//       email: state.email,
//       password: state.password,
//     };
//     axios
//       .post(API_BASE_URL + "/user/register", payload)
//       .then(function (response) {
//         if (response.status === 200) {
//           setState((prevState) => ({
//             ...prevState,
//             successMessage:
//               "Registration successful. Redirecting to home page..",
//           }));
//           redirectToHome();
//           props.showError(null);
//         } else {
//           props.showError("Some error ocurred");
//         }
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   } else {
//     props.showError("Please enter valid username and password");
//   }
// };
// }
