import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const ChangePassword = () => {
  return (
    <Box className="flex flex-col gap-6">
      <Box className="border-2 border-dotted flex border-orange-200 gap-4 items-center p-2 rounded-md">
        <WarningAmberIcon className="text-orange-200" />
        <Box className="flex flex-col">
          <Typography>Alert</Typography>
          <Typography>
            Your Password will expire in every 3 months. So change it
            periodically. Do not share your password
          </Typography>
        </Box>
      </Box>
      <Box className="border border-gray-300 rounded-md hover:shadow-lg hover:border-gray-200 hover:transition-all duration-300">
        <Typography className="p-4">Change Password</Typography>
        <Box className="border-t p-4">
          <Box className="w-full flex gap-4">
            <TextField
              margin="dense"
              label="Current Password"
              type="text"
              variant="outlined"
              className="w-1/2"
            />
            <Box className="w-1/2"></Box>
          </Box>
          <Box className="w-full flex gap-4">
            <TextField
              margin="dense"
              label="New Password"
              type="text"
              variant="outlined"
              className="w-1/2"
            />
            <TextField
              margin="dense"
              label="Confirm Password"
              type="text"
              sx={{ minWidth: 300 }}
              variant="outlined"
              className="w-1/2 rounded-lg"
            />
          </Box>
          <Box className="mt-4 flex justify-end">
            <Button>Change Password</Button>
            <Button>Clear</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ChangePassword;
