import "./Curriculum.scss";
import { useState } from "react";
import Navbar from "../../../Components/UI/Navbar/Navbar";
import AdminSidebar from "../../../Components/AdminSidebar/AdminSidebar";
import CurriculumTab from "../../../Components/CurriculumTab/CurriculumTab";
import Container from "../../../Components/UI/Container/Container";

function Curriculum() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  // function to toggle sidebar state
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div
      className={`curriculum ${
        sidebarOpen ? "sidebar-open" : "sidebar-closed"
      }`}
    >
      <AdminSidebar sidebarOpen={sidebarOpen} />
      <div className="curriculum-container">
        <Navbar toggleSidebar={toggleSidebar} />
        <Container>
          <div className="container-title">Curriculum</div>
          <div className="container-body">
            <CurriculumTab />
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Curriculum;
