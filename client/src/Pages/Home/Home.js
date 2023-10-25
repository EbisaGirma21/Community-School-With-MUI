import React from "react";
import Header from "../../components/UI/Header";
import { Box } from "@mui/material";

export const Home = () => {
  return (
    <Box className="flex flex-col min-h-screen items-center gap-52 relative overflow-x-hidden 2xl:pl-72 2xl:pr-72 xl:pl-48 xl:pr-48 lg:pl-24 lg:pr-24 pl-10 pr-10 ease-in-out duration-300">
      <Header isLogin={true} />
      <Box className="flex justify-between min-h-screen  items-center  ">
        <Box className="max-w-full lg:max-w-[41%] lg:basis-[41%] flex flex-col justify-center items-center gap-10 lg:items-start ">
          <h1 className="text-5xl font-bold text-center lg:text-start">
            Wolkite University Community School
          </h1>
          <h1 className="text-5xl font-bold text-[#2196F3] text-center lg:text-start">
            We strive for Wisdom
          </h1>
          <p className="font-semibold text-center lg:text-start">
            Inspiring excellence, encouraging greatness, and values in everyone
            fostering exploration, ambition, and success.
          </p>
          <Box className="flex  items-center gap-3 ">
            <Box className="cursor-pointer">
              <img
                src={require("../../assets/1.png")}
                alt={"W"}
                loading="Wolkite"
              />
            </Box>
            <Box className="cursor-pointer">
              <img
                src={require("../../assets/2.png")}
                alt={"W"}
                loading="Wolkite"
              />
            </Box>
            <Box className="cursor-pointer">
              <img
                src={require("../../assets/3.png")}
                alt={"W"}
                loading="Wolkite"
              />
            </Box>
            <Box className="cursor-pointer">
              <img
                src={require("../../assets/4.png")}
                alt={"W"}
                loading="Wolkite"
              />
            </Box>
          </Box>
        </Box>
        <Box className="relative hidden lg:flex  max-w-[58%] basis-[58%]  mt-72 z-[9] ">
          <Box className="relative scale-[1]">
            <img
              src={require("../../assets/dashboard.png")}
              alt={"W"}
              loading="Wolkite"
              className="ml-64 rounded-2xl transform scale-[1.5] origin-bottom"
            />
            <Box>
              <img
                src={require("../../assets/users.png")}
                alt={"W"}
                loading="Wolkite"
                className="absolute top-[-200px] right-[-210px] max-w-48 max-h-48  animate-bounce "
              />
            </Box>
            <Box>
              <img
                src={require("../../assets/chart.png")}
                alt={"W"}
                loading="Wolkite"
                className="absolute ml-20 mt-16 top-32 left-72 max-w-48 max-h-48  animate-bounce "
              />
            </Box>
          </Box>
        </Box>
        <img
          src={require("../../assets/frame.png")}
          alt={"W"}
          loading="Wolkite"
          className="absolute hidden lg:block filter-none right-0 mt-72  transform origin-center "
        />
      </Box>
    </Box>
  );
};
