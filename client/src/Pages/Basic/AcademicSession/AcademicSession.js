import "./AcademicSession.scss";
import { useState } from "react";
import Navbar from "../../../Components/UI/Navbar/Navbar";
import AdminSidebar from "../../../Components/AdminSidebar/AdminSidebar";
import AddIcon from "@mui/icons-material/Add";
import Container from "../../../Components/UI/Container/Container";
import { Button } from "@mui/material";
import AcademicSessionTable from "./components/Table/AcademicSessionTable";
import AcademicSessionCreate from "./components/Modal/AcademicSessionCreate";

function AcademicSession() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  // function to toggle sidebar state
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div
      className={`academic_session ${
        sidebarOpen ? "sidebar-open" : "sidebar-closed"
      }`}
    >
      <AdminSidebar sidebarOpen={sidebarOpen} />
      <div className="academic_session-container">
        <Navbar toggleSidebar={toggleSidebar} />
        <Container>
          <div className="container-title">Academic Session</div>
          <div className="container-body">
          <div>
              <Button
                onClick={handleOpen}
                variant="contained"
                className="add__button"
              >
                <AddIcon />
                New
              </Button>
              <AcademicSessionCreate open={open} handleClose={handleClose} />
              <div className="container-tables">
                <AcademicSessionTable />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default AcademicSession;
