import "./Module.scss";
import { useState } from "react";
import Navbar from "../../../Components/UI/Navbar/Navbar";
import AdminSidebar from "../../../Components/AdminSidebar/AdminSidebar";
import Datatable from "../../../Components/UI/Datatable/Datatable";
import Modal from "../../../Components/UI/Modal/Modal";
import Container from "../../../Components/UI/Container/Container";
import { TextField } from "@mui/material";

function Module() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  // function to toggle sidebar state
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // // Function to enter data on clicck of button
  // const createAcedamicSession = (year) => {
  //   console.log(year);
  // };

  // MODAL BODY Created for adding acedamic session

  const modalBody = [
    {
      bt_name: "New",
      title: "Merge Module",
      body: (
        <div>
          <TextField
            autoFocus
            margin="dense"
            id="moduleTitle"
            label="Module Title"
            type="text"
            sx={{ minWidth: 300 }}
            variant="standard"
          />
        </div>
      ),
    },
  ];

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

export default Module;
