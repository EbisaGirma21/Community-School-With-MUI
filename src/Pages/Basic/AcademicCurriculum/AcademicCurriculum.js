import "./AcademicCurriculum.scss";
import { useState } from "react";
import AdminSidebar from "../../../Components/AdminSidebar/AdminSidebar";
import Datatable from "../../../Components/UI/Datatable/Datatable";
import Modal from "../../..//Components/UI/Modal/Modal";
import Navbar from "../../../Components/UI/Navbar/Navbar";
import Dropdown from "../../../Components/UI/Dropdown/Dropdown";
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
      <AdminSidebar sidebarOpen={sidebarOpen} />
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
