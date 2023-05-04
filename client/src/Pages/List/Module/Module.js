import "./Module.scss";
import { useState } from "react";
import Navbar from "../../../Components/UI/Navbar/Navbar";
import AdminSidebar from "../../../Components/AdminSidebar/AdminSidebar";
import AddIcon from "@mui/icons-material/Add";
import Container from "../../../Components/UI/Container/Container";
import { Button } from "@mui/material";
import ModuleTable from "./components/Table/ModuleTable";
import ModuleCreate from "./components/Modal/ModuleCreate";

function Module() {
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
      className={`module ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}
    >
      <AdminSidebar sidebarOpen={sidebarOpen} />
      <div className="module-container">
        <Navbar toggleSidebar={toggleSidebar} />
        <Container>
          <div className="container-title">Module</div>
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
              <ModuleCreate open={open} handleClose={handleClose} />
              <div className="container-tables">
                <ModuleTable />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Module;
