import React, { useState } from "react";
import SideBar from "./Sidebar";
import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";
import Box from "@mui/material/Box";
import TogglePovider from "../context/SidebarContext";
import { createTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { ActivePageProvider } from "../context/ActivePageContext";

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const theme = createTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const ValueToShare = {
    isSidebarOpen,
    toggleSidebar,
  };

  return (
    <TogglePovider.Provider value={ValueToShare}>
      <Box>
        <NavBar />
        <ActivePageProvider>
          <SideBar />
        </ActivePageProvider>

        <Box
          sx={{
            mt: "83px",
            ml: isSidebarOpen
              ? isSmallScreen
                ? "0"
                : "260px"
              : isSmallScreen
              ? "0"
              : "70px",
            transition: "0.2s",
            borderRadius: "10px",
            padding: "10px",
            backgroundColor: "#eef1ff",
            minHeight: "100vh",
            height: "auto",
          }}
          onClick={() => {
            return isSidebarOpen
              ? isSmallScreen
                ? toggleSidebar()
                : null
              : null;
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </TogglePovider.Provider>
  );
}

export default Layout;
