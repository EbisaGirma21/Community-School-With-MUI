import React from "react";
import Header from "../../components/UI/Header";
import { Box, Card } from "@mui/material";

export const Home = () => {
  return (
    <Box sx={{ backgroundColor: "#EDF0FE", height: "100vh" }}>
      <Header isLogin={true} />

    </Box>
  );
};
