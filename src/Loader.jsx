import React from "react";
import spinnerImg from "./spinner.gif";
const Loader = () => {
  return (
    <div className="loader">
      <img src={spinnerImg} alt="Loader" />
      <h1>Fetching Data</h1>
    </div>
  );
};

export default Loader;
