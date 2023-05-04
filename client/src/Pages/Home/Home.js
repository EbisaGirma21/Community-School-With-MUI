import "./Home.scss";
import { useState } from "react";
import { Grid } from "@mui/material";
import Navbar from "../../Components/UI/Navbar/Navbar";
import AdminSidebar from "../../Components/AdminSidebar/AdminSidebar";
import {
  Students,
  FemaleStudents,
  MaleStudents,
  Teachers,
} from "../../Components/UI/Widget/Widget";
import Container from "../../Components/UI/Container/Container";
import Chart from "../../Components/UI/Chart/Chart";
import Featured from "../../Components/UI/Featured/Featured";

// card const

function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // function to toggle sidebar state
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`home ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <AdminSidebar sidebarOpen={sidebarOpen} />
      <div className="home-container">
        <Navbar toggleSidebar={toggleSidebar} />
        <Container>
          <div className="container-title">Dashboard</div>
          <div className="container-body">
            <div className="container-widgets">
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                  <Students type="student" className="card" />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                  <Teachers type="teacher" className="card" />
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={4}>
                  <div>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6} md={6} lg={12}>
                        <MaleStudents type="module" className="card" />
                      </Grid>
                      <Grid item xs={12} sm={6} md={6} lg={12}>
                        <FemaleStudents type="module" className="card" />
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={8}>
                  <Chart />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={4}>
                  <Featured />
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
