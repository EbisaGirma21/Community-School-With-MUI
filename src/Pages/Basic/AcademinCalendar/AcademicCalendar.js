import "./AcademicCalendar.scss";
import { useState } from "react";
import Navbar from "../../../Components/UI/Navbar/Navbar";
import AdminSidebar from "../../../Components/AdminSidebar/AdminSidebar";
import Datatable from "../../../Components/UI/Datatable/Datatable";
import Modal from "../../..//Components/UI/Modal/Modal";
import Container from "../../../Components/UI/Container/Container";
import { TextField } from "@mui/material";

function AcademicCalendar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  // function to toggle sidebar state
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const modalBody = [
    {
      title: "New Acedamic Session",
      body: (
        <div>
          <TextField
            autoFocus
            margin="dense"
            id="year"
            label="Academic Year"
            type="number"
            fullWidth
            variant="standard"
          />
        </div>
      ),
    },
  ];

  return (
    <div
      className={`academic_calendar ${
        sidebarOpen ? "sidebar-open" : "sidebar-closed"
      }`}
    >
      <AdminSidebar sidebarOpen={sidebarOpen} />
      <div className="academic_calendar-container">
        <Navbar toggleSidebar={toggleSidebar} />
        <Container>
          <div className="container-title">Academic Calendar</div>
          <div className="container-body">
            <Modal modalBody={modalBody} />
            <div className="container-tables">
              <Datatable />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default AcademicCalendar;
