import "./AcademicCalendar.scss";
import { useState } from "react";
import Navbar from "../../../Components/UI/Navbar/Navbar";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import Datatable from "../../../Components/UI/Datatable/Datatable";
import Modal from "../../..//Components/UI/Modal/Modal";
import Container from "../../../Components/UI/Container/Container";

function AcademicCalendar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  // function to toggle sidebar state
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div
      className={`academic_calendar ${
        sidebarOpen ? "sidebar-open" : "sidebar-closed"
      }`}
    >
      <Sidebar sidebarOpen={sidebarOpen} />
      <div className="academic_calendar-container">
        <Navbar toggleSidebar={toggleSidebar} />
        <Container>
          <div className="container-title">Academic Calendar</div>
          <div className="container-body">
            <Modal />
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
