import React from "react";
import Header from "../../components/UI/Header";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

export const MyInfo = () => {
  return (
    <>
      <Box className="flex flex-col min-h-screen items-center gap-52 relative overflow-x-hidden 2xl:pl-72 2xl:pr-72 xl:pl-48 xl:pr-48 lg:pl-24 lg:pr-24 pl-10 pr-10 ease-in-out duration-300">
        <Header isLogin={true} />
        <Outlet />
      </Box>
      <Footer />
    </>
  );
};
