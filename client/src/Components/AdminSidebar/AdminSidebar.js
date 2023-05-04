import "./AdminSidebar.scss";
import Typography from "@mui/material/Typography";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import StyleIcon from "@mui/icons-material/Style";
import SourceOutlinedIcon from "@mui/icons-material/SourceOutlined";
import SchoolIcon from "@mui/icons-material/School";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import SafetyDividerIcon from "@mui/icons-material/SafetyDivider";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { Link } from "react-router-dom";
import Sidebar from "../UI/Sidebar/Sidebar";
import { useState } from "react";

function AdminSidebar({ sidebarOpen }) {
  const [activeButton, setActiveButton] = useState(0);

  const handleClick = (buttonNumber) => {
    setActiveButton(buttonNumber);
  };

  return (
    <Sidebar sidebarOpen={sidebarOpen}>
      {/* Sidebar top part */}
      <div className="top">
        <Link to="/" className="link">
          {/* School name and logo */}

          <div className="logo">
            <img src={require("../../assets/unnamed.png")} alt="" />
            <div className="sidebar-title">WKU-CSMS</div>
          </div>
        </Link>
      </div>

      {/* Sidebar Center Part */}
      <div className="center">
        <ul>
          <div className="main">
            <p className="title">Main</p>
            <Link
              onClick={() => handleClick(1)}
              to="/"
              className={`link ${activeButton === 1 ? "active" : ""}`}
            >
              <li>
                <DashboardIcon className="icon" />
                <Typography className="page-title">Dashboard</Typography>
              </li>
            </Link>
          </div>
          <hr />

          <div className="basic">
            <p className="title">Basic</p>
            <Link
              to="/academicSession"
              className={`link ${activeButton === 13 ? "active" : ""}`}
              onClick={() => handleClick(13)}
            >
              <li>
                <CalendarMonthOutlinedIcon className="icon" />
                <Typography className="page-title">Ac. Session</Typography>
              </li>
            </Link>
            <Link
              onClick={() => handleClick(2)}
              to="/curriculum"
              className={`link ${activeButton === 2 ? "active" : ""}`}
            >
              <li>
                <StyleIcon className="icon" />
                <Typography className="page-title">Curriculum</Typography>
              </li>
            </Link>
            <Link
              to="/academicCurriculum"
              className={`link ${activeButton === 3 ? "active" : ""}`}
              onClick={() => handleClick(3)}
            >
              <li>
                <SourceOutlinedIcon className="icon" />
                <Typography className="page-title">Ac. Curriculum</Typography>
              </li>
            </Link>
          </div>
          <hr />
          <div className="list">
            <p className="title">Lists</p>

            <Link
              to="/students"
              className={`link ${activeButton === 4 ? "active" : ""}`}
              onClick={() => handleClick(4)}
            >
              <li>
                <SchoolIcon className="icon" />
                <Typography className="page-title">Students</Typography>
              </li>
            </Link>
            <Link
              to="/teachers"
              className={`link ${activeButton === 5 ? "active" : ""}`}
              onClick={() => handleClick(5)}
            >
              <li>
                <CastForEducationIcon className="icon" />
                <Typography className="page-title">Teachers</Typography>
              </li>
            </Link>
            <Link
              to="/modules"
              className={`link ${activeButton === 6 ? "active" : ""}`}
              onClick={() => handleClick(6)}
            >
              <li>
                <ViewModuleIcon className="icon" />
                <Typography className="page-title">Modules</Typography>
              </li>
            </Link>
            <Link
              to="/departments"
              className={`link ${activeButton === 7 ? "active" : ""}`}
              onClick={() => handleClick(7)}
            >
              <li>
                <SafetyDividerIcon className="icon" />
                <Typography className="page-title">Department</Typography>
              </li>
            </Link>
          </div>
          <hr />
          <div className="operation">
            <p className="title">Operation</p>
            <Link
              to="/ass_teacher"
              className={`link ${activeButton === 8 ? "active" : ""}`}
              onClick={() => handleClick(8)}
            >
              <li>
                <AssignmentReturnIcon className="icon" />
                <Typography className="page-title">Ass. Teachers</Typography>
              </li>
            </Link>
            <Link
              to="/registration"
              className={`link ${activeButton === 9 ? "active" : ""}`}
              onClick={() => handleClick(9)}
            >
              <li>
                <AppRegistrationIcon className="icon" />
                <Typography className="page-title">Registration</Typography>
              </li>
            </Link>
            <Link
              to="/setting"
              className={`link ${activeButton === 10 ? "active" : ""}`}
              onClick={() => handleClick(10)}
            >
              <li>
                <SettingsApplicationsIcon className="icon" />
                <Typography className="page-title">Setting</Typography>
              </li>
            </Link>
          </div>
          <hr />
          <div className="user">
            <p className="title">User</p>

            <Link
              to="/profile"
              className={`link ${activeButton === 11 ? "active" : ""}`}
              onClick={() => handleClick(11)}
            >
              <li>
                <AccountCircleIcon className="icon" />
                <Typography className="page-title">Profile</Typography>
              </li>
            </Link>
            <Link
              to="/logout"
              className={`link ${activeButton === 12 ? "active" : ""}`}
              onClick={() => handleClick(12)}
            >
              <li>
                <ExitToAppIcon className="icon" />
                <Typography className="page-title">Logout</Typography>
              </li>
            </Link>
          </div>
        </ul>
      </div>
    </Sidebar>
  );
}

export default AdminSidebar;
