import "./Home.scss";
import { useState } from "react";
import { Grid } from "@mui/material";
import Navbar from "../../Components/UI/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Widget from "../../Components/UI/Widget/Widget";
import Container from "../../Components/UI/Container/Container";

function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // function to toggle sidebar state
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`home ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <Sidebar sidebarOpen={sidebarOpen} />
      <div className="home-container">
        <Navbar toggleSidebar={toggleSidebar} />
        <Container>
          <div className="container-title">Dashboard</div>
          <div className="container-body">
            <div className="container-widgets">
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                  <Widget type="student" className="card" />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                  <Widget type="teacher" className="card" />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                  <Widget type="module" className="card" />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                  <Widget type="departmnet" className="card" />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                  <Widget type="student" className="card" />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                  <Widget type="teacher" className="card" />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                  <Widget type="module" className="card" />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                  <Widget type="departmnet" className="card" />
                </Grid>
              </Grid>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Home;
