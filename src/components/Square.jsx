import React from "react";
import "../styles/square.css";

function Square({ data,selected,handleCategorySelection}) {
  return (
    <div className={selected === data.name?"selected squareCard":"squareCard"} onClick={()=>{handleCategorySelection(data.name)}}>
      <p>{data.name}</p>
      <img src={data.image} alt="squareImage" />
    </div>
  );
}

export default Square;
