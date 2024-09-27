import React from "react";
import "../styles/square.css";

function Square({ data }) {
  return (
    <div className="squareCard">
      <p>{data.name}</p>
      <img src={data.image} alt="squareImage" />
    </div>
  );
}

export default Square;
