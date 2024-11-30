import React from "react";
import RequestTab from "./components/RequestTab";
import { Box } from "@mui/material";

const Requests = () => {
  {
    localStorage.setItem("path", JSON.stringify("registration"));
  }
  return (
    <>
      <Box className="bg-white p-4 text-lg rounded-lg">Request </Box>
      <RequestTab />
    </>
  );
};

export default Requests;
