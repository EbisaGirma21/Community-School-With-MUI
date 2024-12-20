import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import React, { useState, useContext } from "react";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AuthContext from "../../../context/AuthContext";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const { changePassword, isLoading, error } = useContext(AuthContext); // Import AuthContext
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // State to toggle password visibility
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangePassword = async () => {
    setSuccessMessage("");

    if (newPassword !== confirmPassword) {
      toast.warning("New password and confirm password do not match.");
      return;
    }

    const success = await changePassword(currentPassword, newPassword);
    if (success) {
      toast.success("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  const handleClear = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setSuccessMessage("");
  };

  const togglePasswordVisibility = (field) => {
    switch (field) {
      case "current":
        setShowCurrentPassword((prev) => !prev);
        break;
      case "new":
        setShowNewPassword((prev) => !prev);
        break;
      case "confirm":
        setShowConfirmPassword((prev) => !prev);
        break;
      default:
        break;
    }
  };

  return (
    <Box className="flex flex-col gap-6">
      {/* Alert Section */}
      <Box className="border-2 border-dotted flex border-orange-200 gap-4 items-center p-2 rounded-md">
        <WarningAmberIcon className="text-orange-200" />
        <Box className="flex flex-col">
          <Typography>Alert</Typography>
          <Typography>
            Change your password every 3 months if possible. Do not share your
            password.
          </Typography>
        </Box>
      </Box>

      {/* Form Section */}
      <Box className="border border-gray-300 rounded-md hover:shadow-lg hover:border-gray-200 hover:transition-all duration-300">
        <Typography className="p-4">Change Password</Typography>
        <Box className="border-t p-4">
          <Box className="w-full flex gap-4">
            <TextField
              margin="dense"
              label="Current Password"
              type={showCurrentPassword ? "text" : "password"}
              variant="outlined"
              className="w-1/2"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => togglePasswordVisibility("current")}
                      edge="end"
                    >
                      {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box className="w-1/2"></Box>
          </Box>
          <Box className="w-full flex gap-4">
            <TextField
              margin="dense"
              label="New Password"
              type={showNewPassword ? "text" : "password"}
              variant="outlined"
              className="w-1/2"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => togglePasswordVisibility("new")}
                      edge="end"
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="dense"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              sx={{ minWidth: 300 }}
              variant="outlined"
              className="w-1/2 rounded-lg"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => togglePasswordVisibility("confirm")}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Buttons */}
          <Box className="mt-4 flex justify-end gap-2">
            <Button
              variant="contained"
              color="primary"
              onClick={handleChangePassword}
              disabled={isLoading}
            >
              {isLoading ? "Changing..." : "Change Password"}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClear}
              disabled={isLoading}
            >
              Clear
            </Button>
          </Box>
        </Box>

        {/* Error Message */}
        {error && (
          <Typography color="error" className="p-4">
            {error}
          </Typography>
        )}

        {/* Success Message */}
        {successMessage && (
          <Typography color="success" className="p-4">
            {successMessage}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ChangePassword;
