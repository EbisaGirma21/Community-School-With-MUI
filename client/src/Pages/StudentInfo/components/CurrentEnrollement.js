import { Box, TextField } from "@mui/material";
import React, { useContext, useEffect } from "react";
import StudentContext from "../../../context/StudentContext";

const CurrentEnrollement = () => {
  const { fetchStudentById, studentById } = useContext(StudentContext);

  useEffect(() => {
    fetchStudentById();
  }, []);

  return (
    <Box className="flex gap-10 ">
      <Box className="shadow-md w-full lg:w-1/4">
        <Box className="">
          <img
            src={require("../../../assets/student.jpg")}
            alt={"W"}
            loading="Wolkite"
            className=""
          />
        </Box>
        <Box>
          <Box className="flex flex-col w-full p-2">
            <Box className="flex justify-between w-full hover:bg-slate-100 hover:cursor-pointer p-2">
              <Box>Name</Box>
              <Box>{`${studentById?.firstName} ${studentById?.middleName}`}</Box>
            </Box>
            <Box className=" flex justify-between w-full hover:bg-slate-100 hover:cursor-pointer p-2">
              <Box>Family</Box>
              <Box>{`${studentById?.middleName} ${studentById?.lastName}`}</Box>
            </Box>
            <Box className=" flex justify-between w-full hover:bg-slate-100 hover:cursor-pointer p-2">
              <Box>ID Number</Box>
              <Box>01/23/2015</Box>
            </Box>
            <Box className=" flex justify-between w-full hover:bg-slate-100 hover:cursor-pointer p-2">
              <Box>Year</Box>
              <Box>2015</Box>
            </Box>
            <Box className=" flex justify-between w-full hover:bg-slate-100 hover:cursor-pointer p-2">
              <Box>Grade</Box>
              <Box>KG-1</Box>
            </Box>
            <Box className=" flex justify-between w-full hover:bg-slate-100 hover:cursor-pointer p-2">
              <Box>Section</Box>
              <Box>A</Box>
            </Box>
            <Box className=" flex justify-between w-full hover:bg-slate-100 hover:cursor-pointer p-2">
              <Box>Roll No</Box>
              <Box>1</Box>
            </Box>
            <Box className=" flex justify-between w-full hover:bg-slate-100 hover:cursor-pointer p-2">
              <Box> Current Status</Box>
              <Box>Pass</Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className="shadow-md w-3/4 flex flex-col p-4 gap-4">
        <Box className="w-20 h-20 ">
          <img
            src={require("../../../assets/student.jpg")}
            alt={"W"}
            loading="Wolkite"
            className="rounded-full object-cover"
          />
        </Box>
        <Box className="flex w-full gap-4">
          <Box className="w-full">
            <Box className="p-2"> First Name </Box>
            <Box className="w-full border-2 border-gray-100 p-2">Ebisa</Box>
          </Box>
          <Box className="w-full">
            <Box className="p-2"> Last Name </Box>
            <Box className="w-full border-2 border-gray-100 p-2">Girma</Box>
          </Box>
        </Box>
        <Box className="w-full">
          <Box className="p-2"> Your Home Room Teacher </Box>
          <Box className="w-full border-2 border-gray-100 p-2">
            Isayas Melkmau
          </Box>
        </Box>
        <Box className="flex w-full gap-4">
          <Box className="w-full">
            <Box className="p-2">Grade </Box>
            <Box className="w-full border-2 border-gray-100 p-2">KG-1</Box>
          </Box>
          <Box className="w-full">
            <Box className="p-2"> Section </Box>
            <Box className="w-full border-2 border-gray-100 p-2">A</Box>
          </Box>
        </Box>
        <Box className="w-full gap-4">
          <Box className="p-2">Subjects </Box>
          <Box className="w-full flex gap-4">
            <Box className="w-full flex flex-col gap-4">
              <Box className="w-full border-2 border-gray-100 p-2">English</Box>
              <Box className="w-full border-2 border-gray-100 p-2">
                Mathimatics
              </Box>
              <Box className="w-full border-2 border-gray-100 p-2">አማሪኛ</Box>
            </Box>
            <Box className="w-full flex flex-col gap-4">
              <Box className="w-full border-2 border-gray-100 p-2">
                Enviromental Science
              </Box>
              <Box className="w-full border-2 border-gray-100 p-2">Sport</Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CurrentEnrollement;
