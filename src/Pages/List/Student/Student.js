import "./Student.scss";
import { useState } from "react";
import Datatable from "../../../Components/UI/Datatable/Datatable";
import AdminSidebar from "../../../Components/AdminSidebar/AdminSidebar";
import Navbar from "../../../Components/UI/Navbar/Navbar";
import Dropdown from "../../../Components/UI/Dropdown/Dropdown";
import { Grid } from "@mui/material";
import Container from "../../../Components/UI/Container/Container";

function Student() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  // function to toggle sidebar state
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div
      className={`student ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}
    >
      <AdminSidebar sidebarOpen={sidebarOpen} />
      <div className="student-container">
        <Navbar toggleSidebar={toggleSidebar} />
        <Container>
          <div className="container-title">Students</div>
          <div className="container-body">
            <div className="container-modal">
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
            <div className="container-body__tables">
              <Datatable />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Student;
