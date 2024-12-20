import { Box, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import AuthContext from "../../../context/AuthContext";
import UserContext from "../../../context/UserContext";

const PersonalDetail = () => {
  const { user } = useContext(AuthContext);

  const { userInfo, fetchUser } = useContext(UserContext);

  // Fetch data when component mounts based on user role
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Box className="w-full ">
      <Grid container spacing={4}>
        {/* Personal Information Section */}
        <Grid item xs={12} md={6}>
          <Box className="border border-gray-300 rounded-md hover:shadow-lg hover:border-gray-200 hover:transition-all duration-300 w-full">
            <Typography className="p-4 font-semibold">
              Personal Information
            </Typography>
            <Box className="flex flex-col w-full p-2 border-t">
              <Box className="flex justify-between w-full hover:bg-slate-100 border-b rounded-md hover:cursor-pointer p-4">
                <Box>Full Name</Box>
                <Box>{`${userInfo?.user?.firstName} ${userInfo?.user?.middleName}`}</Box>
              </Box>

              <Box className="flex justify-between w-full hover:bg-slate-100 border-b rounded-md hover:cursor-pointer p-4">
                <Box>Role</Box>
                <Box className="capitalize">{user?.role[0]}</Box>
              </Box>
              <Box className="flex justify-between w-full hover:bg-slate-100 border-b rounded-md hover:cursor-pointer p-4">
                <Box>School ID Number</Box>
                {user?.role[0] === "student" && (
                  <Box>{`${userInfo?.student?.studentIdNumber}`}</Box>
                )}
                {user?.role[0] === "teacher" && <Box>123456</Box>}
              </Box>
              <Box className="flex justify-between w-full hover:bg-slate-100 border-b rounded-md hover:cursor-pointer p-4">
                <Box>Education Level</Box>
                {user?.role[0] === "student" &&
                userInfo?.student?.currentEnrollement._grade ? (
                  <Box>{`${userInfo?.student?.currentEnrollement?._grade?.stage} - ${userInfo?.student?.currentEnrollement?._grade?.level}`}</Box>
                ) : (
                  user?.role[0] === "student" && <Box>TBA</Box>
                )}
                {user?.role[0] === "teacher" && (
                  <Box>{userInfo?.teacher?.educationLevel}</Box>
                )}
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* Contact Information Section */}
        <Grid item xs={12} md={6}>
          <Box className="border border-gray-300 rounded-md hover:shadow-lg hover:border-gray-200 hover:transition-all duration-300 w-full">
            <Typography className="p-4 font-semibold">
              Contact Information
            </Typography>
            <Box className="flex flex-col w-full p-2 border-t">
              <Box className="flex justify-between w-full hover:bg-slate-100 border-b rounded-md hover:cursor-pointer p-4">
                <Box>Contact Phone</Box>

                <Box>{userInfo?.user?.phoneNumber}</Box>
              </Box>
              <Box className="flex justify-between w-full hover:bg-slate-100 border-b rounded-md hover:cursor-pointer p-4">
                <Box>Email</Box>
                {user?.role[0] === "student" && (
                  <Box>{userInfo?.family?.email}</Box>
                )}
                {user?.role[0] === "teacher" && (
                  <Box>{userInfo?.user?.email}</Box>
                )}
              </Box>
              <Box className="flex justify-between w-full hover:bg-slate-100 border-b rounded-md hover:cursor-pointer p-4">
                <Box>Family Name</Box>
                <Box>{`${userInfo?.user?.middleName} ${userInfo?.user?.lastName}`}</Box>
              </Box>
              <Box className="flex justify-between w-full hover:bg-slate-100 border-b rounded-md hover:cursor-pointer p-4">
                <Box>Address</Box>
                <Box>{userInfo?.user?.address}</Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PersonalDetail;
