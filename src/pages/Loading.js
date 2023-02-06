import React from "react";
import load from "../assets/images/load.gif";

function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
        margin: "auto",
        padding: "20px",
        backgroundSize: "cover",
      }}
    >
      <img src={load} alt="loading" />
    </div>
  );
}

export default Loading;
