import React from "react";

const Event = (props) => (
  <div
    style={{ marginBottom: "5rem", marginTop: "5rem" }}
    onClick={props.outPutClick}
  >
    <div>
      <div>{props.firstName}</div>
      <div>
        {props.codeArea}-{props.phonDigits}
      </div>
    </div>
  </div>
);

export default Event;
