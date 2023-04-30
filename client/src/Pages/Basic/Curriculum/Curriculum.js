import "./Curriculum.scss";
import { useContext, useEffect, useState } from "react";
import Navbar from "../../../Components/UI/Navbar/Navbar";
import AdminSidebar from "../../../Components/AdminSidebar/AdminSidebar";
import CurriculumTab from "../../../Components/CurriculumTab/Tab/CurriculumTab";
import Container from "../../../Components/UI/Container/Container";
import CurriculumContext from "../../../Context/CurriculumContext";

function Curriculum() {
  // curriculum context state
  const { fetchCurriculums } = useContext(CurriculumContext);
  // Loading the data from the curriculum
  useEffect(() => {
    fetchCurriculums();
  }, [fetchCurriculums]);

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
