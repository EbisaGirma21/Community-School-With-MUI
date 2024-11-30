import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";

const PersonalDetail = () => {
  return (
    <Box className="flex w-full gap-4">
      <Box className="border border-gray-300 rounded-md hover:shadow-lg hover:border-gray-200 hover:transition-all duration-300 w-1/2">
        <Typography className="p-4">Personal Information</Typography>
        <Box className="flex flex-col w-full p-2 border-t">
          <Box className="flex justify-between w-full hover:bg-violet-100 rounded-md hover:cursor-pointer p-4">
            <Box>Full Name</Box>
            <Box>Ebisa Girma</Box>
          </Box>
          <Box className=" flex justify-between w-full hover:bg-violet-100 rounded-md hover:cursor-pointer p-4">
            <Box>Full Family Name</Box>
            <Box>Girma Garedo</Box>
          </Box>
          <Box className=" flex justify-between w-full hover:bg-violet-100 rounded-md hover:cursor-pointer p-4">
            <Box>School ID Number</Box>
            <Box>01/23/2015</Box>
          </Box>
          <Box className=" flex justify-between w-full hover:bg-violet-100 rounded-md hover:cursor-pointer p-4">
            <Box>Year</Box>
            <Box>2015</Box>
          </Box>
          <Box className=" flex justify-between w-full hover:bg-violet-100 rounded-md hover:cursor-pointer p-4">
            <Box>Grade</Box>
            <Box>KG-1</Box>
          </Box>
          <Box className=" flex justify-between w-full hover:bg-violet-100 rounded-md hover:cursor-pointer p-4">
            <Box>Section</Box>
            <Box>A</Box>
          </Box>
          <Box className=" flex justify-between w-full hover:bg-violet-100 rounded-md hover:cursor-pointer p-4">
            <Box>Roll No</Box>
            <Box>1</Box>
          </Box>
          <Box className=" flex justify-between w-full hover:bg-violet-100 rounded-md hover:cursor-pointer p-4">
            <Box> Current Status</Box>
            <Box>Pass</Box>
          </Box>
        </Box>
      </Box>
      <Box className="border border-gray-300 rounded-md hover:shadow-lg hover:border-gray-200 hover:transition-all duration-300 w-1/2">
        <Typography className="p-4">Contact Information</Typography>
        <Box className="flex flex-col w-full p-2 border-t">
          <Box className="flex justify-between w-full hover:bg-violet-100 rounded-md hover:cursor-pointer p-4">
            <Box>Contact Phone</Box>
            <Box>+251908765423</Box>
          </Box>
          <Box className=" flex justify-between w-full hover:bg-violet-100 rounded-md hover:cursor-pointer p-4">
            <Box>Email</Box>
            <Box>example@dev.com</Box>
          </Box>
          <Box className=" flex justify-between w-full hover:bg-violet-100 rounded-md hover:cursor-pointer p-4">
            <Box>Office Number</Box>
            <Box>01/23/2015</Box>
          </Box>
          <Box className=" flex justify-between w-full hover:bg-violet-100 rounded-md hover:cursor-pointer p-4">
            <Box>Address</Box>
            <Box>3379 Monroe Avenue, Fort Myers, Florida(33912)</Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PersonalDetail;
