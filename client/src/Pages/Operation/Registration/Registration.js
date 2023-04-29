import "./Registration.scss";
import { useState } from "react";
import AdminSidebar from "../../../Components/AdminSidebar/AdminSidebar";
import Navbar from "../../../Components/UI/Navbar/Navbar";
import Dropdown from "../../../Components/UI/Dropdown/Dropdown";
import { Grid } from "@mui/material";
import RegistrationTab from "../../../Components/RegistrationTab/RegistrationTab";
import Container from "../../../Components/UI/Container/Container";

function Registration() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  // function to toggle sidebar state
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div
      className={`registration ${
        sidebarOpen ? "sidebar-open" : "sidebar-closed"
      }`}
    >
      <AdminSidebar sidebarOpen={sidebarOpen} />
      <div className="registration-container">
        <Navbar toggleSidebar={toggleSidebar} />
        <Container >
          <div className="container-title">
            Registrations
            <div className="container-dropdown">
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                  <Dropdown />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                  <Dropdown />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                  <Dropdown />
                </Grid>
              </Grid>
            </div>
          </div>
          <div className="container-body">
            <div className="container-body__tab">
              <RegistrationTab />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Registration;
