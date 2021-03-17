import React from "react";
import "./Barber.css";

// const Barber = (props) => (
//   <div className="barber-container" style={{marginBottom: '5rem', marginTop: '5rem'}} onClick={props.outPutClick}>
//     {/* <h1>{props.firstName}</h1> */}
//     <table className="table">
//           {/* <thead className="thread-light"> */}
//             <tr>
//               <td>{props.firstName}</td>
//               <td>{props.codeArea}-{props.phonDigits}</td>
//             </tr>
//           {/* </thead> */}
//         </table>
//   </div>
// );

const Barber = (props) => (
  <div
    className="barber-container"
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

export default Barber;
