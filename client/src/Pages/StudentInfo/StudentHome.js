import { Box } from "@mui/material";
import React from "react";

const StudentHome = () => {
  return (
    <Box  className="flex justify-between min-h-screen  items-center  ">
      <Box className="max-w-full lg:max-w-[43%] lg:basis-[43%] flex flex-col justify-center items-center gap-10 lg:items-start ">
        <h1 className="text-5xl font-bold text-center lg:text-start">
          Welcome to Wolkite University Community School
        </h1>
        <h1 className="text-5xl font-bold text-[#2196F3] text-center lg:text-start">
          We strive for Wisdom
        </h1>
        <p className="font-semibold text-center lg:text-start">
          Cultivating a culture of academic achievement, personal growth, and a
          commitment to shared values, we nurture curiosity, ambition, and the
          pursuit of success in every student.
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
      <Box className="hidden lg:flex  max-w-[58%] basis-[58%]  ">
        <Box className=" scale-[1.4]">
          <img
            src={require("../../assets/student1.gif")}
            alt={"W"}
            loading="Wolkite"
            className="w-full h-full"
          />
        </Box>
        <Box className=" scale-[1.4] pt-16">
          <img
            src={require("../../assets/bus1.gif")}
            alt={"W"}
            loading="Wolkite"
            className="w-full h-full"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default StudentHome;
