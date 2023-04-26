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

function AdminSidebar({ sidebarOpen }) {
  return (
    <Sidebar sidebarOpen={sidebarOpen}>
      {/* Sidebar top part */}
      <div className="top">
        <Link to="/" className="link">
          {/* School name and logo */}
          <div className="logo">
            <img src={require("../../assets/unnamed.png")} alt="" />
          </div>
          <Typography className="sidebar-title" variant="h4">
            WKU-CSMS
          </Typography>
        </Link>
      </div>
      {/* Sidebar Center Part */}
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" className="link">
            <li>
              <DashboardIcon className="icon" />
              <Typography className="page-title">Dashboard</Typography>
            </li>
          </Link>
          <hr />
          <p className="title">BASIC</p>

          <Link to="/academicCalendar" className="link">
            <li>
              <CalendarMonthOutlinedIcon className="icon" />
              <Typography className="page-title">Ac. Calendar</Typography>
            </li>
          </Link>
          <Link to="/curriculum" className="link">
            <li>
              <StyleIcon className="icon" />
              <Typography className="page-title">Curriculum</Typography>
            </li>
          </Link>
          <Link to="/academicCurriculum" className="link">
            <li>
              <SourceOutlinedIcon className="icon" />
              <Typography className="page-title">Ac. Curriculum</Typography>
            </li>
          </Link>
          <hr />
          <p className="title">LISTS</p>

          <Link to="/students" className="link">
            <li>
              <SchoolIcon className="icon" />
              <Typography className="page-title">Students</Typography>
            </li>
          </Link>
          <Link to="/teachers" className="link">
            <li>
              <CastForEducationIcon className="icon" />
              <Typography className="page-title">Teachers</Typography>
            </li>
          </Link>
          <Link to="/modules" className="link">
            <li>
              <ViewModuleIcon className="icon" />
              <Typography className="page-title">Modules</Typography>
            </li>
          </Link>
          <Link to="/departments" className="link">
            <li>
              <SafetyDividerIcon className="icon" />
              <Typography className="page-title">Department</Typography>
            </li>
          </Link>
          <hr />
          <p className="title operation">OPERATION</p>
          <Link to="/ass_teacher" className="link">
            <li>
              <AssignmentReturnIcon className="icon" />
              <Typography className="page-title">Ass. Teachers</Typography>
            </li>
          </Link>
          <Link to="/registration" className="link">
            <li>
              <AppRegistrationIcon className="icon" />
              <Typography className="page-title">Registration</Typography>
            </li>
          </Link>
          <Link to="/setting" className="link">
            <li>
              <SettingsApplicationsIcon className="icon" />
              <Typography className="page-title">Setting</Typography>
            </li>
          </Link>
          <hr />
          <p className="title">USER</p>

          <Link to="/profile" className="link">
            <li>
              <AccountCircleIcon className="icon" />
              <Typography className="page-title">Profile</Typography>
            </li>
          </Link>
          <Link to="/logout" className="link">
            <li>
              <ExitToAppIcon className="icon" />
              <Typography className="page-title">Logout</Typography>
            </li>
          </Link>
        </ul>
      </div>
    </Sidebar>
  );
}

export default AdminSidebar;
