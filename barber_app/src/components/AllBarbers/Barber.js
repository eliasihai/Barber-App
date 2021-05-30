import React from "react";
import "./Barber.css";
import { Link } from "react-router-dom";

const Barber = (props) => (
  <Link
    to={{
      pathname: "/calendar",
      state: { barber_ID: props.barberId, barber_name: props.firstName },
    }}
  >
    <div className="barber-container" onClick={props.outPutClick}>
      <div>
        <div>{props.barberId}</div>
        <div>{props.firstName}</div>
        <div>{props.lastName}</div>
        <div>
          {props.codeArea}-{props.phonDigits}
        </div>
      </div>
    </div>
  </Link>
);

export default Barber;
