import React from "react";
import RequestTab from "./components/RequestTab";

const Requests = () => {
  {
    localStorage.setItem("path", JSON.stringify("registration"));
  }
  return <RequestTab/>
};

export default Requests;
