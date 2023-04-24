import "./AcademicCurriculum.scss";
import { useState } from "react";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import Datatable from "../../../Components/UI/Datatable/Datatable";
import Modal from "../../../Components/UI/Container/Container";
import Navbar from "../../../Components/UI/Navbar/Navbar";
import Dropdown from "../../../Components/Dropdown/Dropdown";
import Container from "../../../Components/UI/Container/Container";

function AcademicCurriculum() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  // function to toggle sidebar state
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div
      className={`academic_curriculum ${
        sidebarOpen ? "sidebar-open" : "sidebar-closed"
      }`}
    >
      <Sidebar sidebarOpen={sidebarOpen} />
      <div className="academic_curriculum-container">
        <Navbar toggleSidebar={toggleSidebar} />
        <Container>
          <div className="container-title">Academic Curriculum</div>
          <div className="container-body">
            <Dropdown />
            <hr />
            <Modal />
            <div className="container-body__tables">
              <Datatable />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default AcademicCurriculum;
