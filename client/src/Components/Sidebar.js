import { createTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Dashboard } from "@mui/icons-material";
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
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import SidebarContext from "../context/SidebarContext";
import { styled } from "@mui/material/styles";
import ActivePageContext from "../context/ActivePageContext";
import GradingIcon from "@mui/icons-material/Grading";

function SideBar() {
  const { isSidebarOpen } = useContext(SidebarContext);

  const [isActivePage, setIsActivePage] = useState(
    JSON.parse(localStorage.getItem("path"))
  );
  const theme = createTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  // Drawer style
  const styledDrawer = {
    "& .MuiDrawer-paper": {
      boxSizing: "border-box",
      width: isSidebarOpen
        ? isSmallScreen
          ? "260px"
          : "260px"
        : isSmallScreen
        ? "0"
        : "70px",
      transition: "0.2s",
      boxShadow: isSidebarOpen
        ? isSmallScreen
          ? "0 0 900px 900px rgba(0, 0, 0, 0.5)"
          : "none"
        : "none",
      border: "none",
      padding: isSidebarOpen ? "0 16px" : isSmallScreen ? "0" : "0 10px",
    },
  };

  // Sidebar title
  const SideBarTitle = styled("div")({
    display: isSidebarOpen ? "flex" : isSmallScreen ? "none" : "flex",
    position: "fixed",
    alignItems: "center",
    marginTop: "16px",
  });

  // list item style
  const listStyle = {
    display: isSidebarOpen ? "flex" : "none",
    fontFamily: "Poppins",
    fontWeight: 500,
    whiteSpace: "nowrap",
    "&:hover": {
      color: "#774FBF",
    },
  };

  // link
  const styledLink = {
    textDecoration: "none",
    margin: "0px 0px 4px",
    padding: 0,
  };

  // button in Link
  const styledButton = {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    textAlign: "left",
    color: "#000",
    background: "#fff",
    borderRadius: 2,
    height: "46px",
    marginBottom: "3px",
    padding: isSidebarOpen ? "10px 16px 10px 24px" : "15px",
    "&:hover": {
      background: "#EDE7F6",
      borderRadius: 2,
      color: "#774FBF",
    },
  };

  const styledActiveButton = {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    textAlign: "left",
    height: "46px",
    padding: isSidebarOpen ? "10px 16px 10px 24px" : "15px",
    background: "#EDE7F6",
    borderRadius: 2,
    marginBottom: "3px",
    color: "#774FBF",
    "&:hover": {
      background: "#EDE7F6",
      borderRadius: 2,
      color: "#774FBF",
    },
  };

  // icon wrapper

  const StyledIconWrapper = styled(ListItemIcon)({
    minWidth: "36px",
    height: "10px",
    color: "#000",
    marginBottom: "8px",
  });

  // image style
  const styledImage = {
    height: "50px",
    width: "50px",
    borderRadius: "50%",
    objectFit: "cover",
  };
  // sidebar title
  const styledSidebarTitle = {
    zIndex: isSidebarOpen ? (isSmallScreen ? "0" : "9999") : "9999",
    background: "white",
    height: "83px",
    width: isSidebarOpen
      ? isSmallScreen
        ? "228px"
        : "228px"
      : isSmallScreen
      ? "0"
      : "50px",
    margin: "0",
  };

  // item title
  const itemTitleStyle = {
    display: isSidebarOpen ? "block" : "none",
    color: "rgb(18, 25, 38)",
    padding: "6px",
    fontWeight: "550",
  };

  const styledList = {
    paddingTop: "0",
    padding: "0",
    paddingBottom: isSidebarOpen ? "8px" : "0px",
  };

  const itemTextStyle = {
    fontFamily: "Poppins",
    fontWeight: 400,
  };

  // activePage
  // activePagestyle
  const activePageTitle = {
    fontFamily: "Poppins",
    fontWeight: 500,
    color: "#774FBF",
  };

  const [menuItems, setMenuItems] = useState(() => getMenuItems());
  function getMenuItems() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user.role === "director") {
      return [
        {
          text: <Typography sx={itemTextStyle}>Dashboard</Typography>,
          icon: <Dashboard sx={{ fontSize: "18px" }} />,
          path: "/dashboard",
        },
        {
          text: <Typography sx={itemTextStyle}>Ac. Session</Typography>,
          icon: <CalendarMonthOutlinedIcon sx={{ fontSize: "18px" }} />,
          path: "academicSession",
        },
        {
          text: <Typography sx={itemTextStyle}>Curriculum</Typography>,
          icon: <StyleIcon sx={{ fontSize: "18px" }} />,
          path: "curriculum",
        },
        {
          text: <Typography sx={itemTextStyle}>Ac. Curriculum</Typography>,
          icon: <SourceOutlinedIcon sx={{ fontSize: "18px" }} />,
          path: "academicCurriculum",
        },
        {
          text: <Typography sx={itemTextStyle}>Students</Typography>,
          icon: <SchoolIcon sx={{ fontSize: "18px" }} />,
          path: "students",
        },
        {
          text: <Typography sx={itemTextStyle}>Teachers</Typography>,
          icon: <CastForEducationIcon sx={{ fontSize: "18px" }} />,
          path: "teachers",
        },
        {
          text: <Typography sx={itemTextStyle}>Modules</Typography>,
          icon: <ViewModuleIcon sx={{ fontSize: "18px" }} />,
          path: "modules",
        },
        {
          text: <Typography sx={itemTextStyle}>Departments</Typography>,
          icon: <SafetyDividerIcon sx={{ fontSize: "18px" }} />,
          path: "departments",
        },
        {
          text: <Typography sx={itemTextStyle}>Ass. Teachers</Typography>,
          icon: <AssignmentReturnIcon sx={{ fontSize: "18px" }} />,
          path: "assignTeacher",
        },
        {
          text: <Typography sx={itemTextStyle}>Registration</Typography>,
          icon: <AppRegistrationIcon sx={{ fontSize: "18px" }} />,
          path: "registration",
        },
        {
          text: <Typography sx={itemTextStyle}>Student Result</Typography>,
          icon: <GradingIcon sx={{ fontSize: "18px" }} />,
          path: "result",
        },
      ];
    } else if (user.role === "teacher") {
      return [
        {
          text: <Typography sx={itemTextStyle}>Students</Typography>,
          icon: <SchoolIcon sx={{ fontSize: "18px" }} />,
          path: "students",
        },
        {
          text: <Typography sx={itemTextStyle}>Registration</Typography>,
          icon: <AppRegistrationIcon sx={{ fontSize: "18px" }} />,
          path: "registration",
        },
        {
          text: <Typography sx={itemTextStyle}>Student Result</Typography>,
          icon: <GradingIcon sx={{ fontSize: "18px" }} />,
          path: "result",
        },
      ];
    } else {
      return [
        {
          text: <Typography sx={itemTextStyle}>Club</Typography>,
          icon: <SchoolIcon sx={{ fontSize: "18px" }} />,
          path: "students",
        },
        {
          text: <Typography sx={itemTextStyle}>Result</Typography>,
          icon: <GradingIcon sx={{ fontSize: "18px" }} />,
          path: "result",
        },
      ];
    }
  }

  const handleClick = (path) => {
    localStorage.setItem("path", JSON.stringify(path));
    setIsActivePage(JSON.parse(localStorage.getItem("path")));
  };
  // // basic side items
  // const basicItems = [
  //   {
  //     text: <Typography sx={itemTextStyle}>Ac. Session</Typography>,
  //     icon: <CalendarMonthOutlinedIcon sx={{ fontSize: "18px" }} />,
  //     path: "/academicSession",
  //   },
  //   {
  //     text: <Typography sx={itemTextStyle}>Curriculum</Typography>,
  //     icon: <StyleIcon sx={{ fontSize: "18px" }} />,
  //     path: "/curriculum",
  //   },
  //   {
  //     text: <Typography sx={itemTextStyle}>Ac. Curriculum</Typography>,
  //     icon: <SourceOutlinedIcon sx={{ fontSize: "18px" }} />,
  //     path: "/academicCurriculum",
  //   },
  // ];

  // // basic side items
  // const listItems = [
  //   {
  //     text: <Typography sx={itemTextStyle}>Students</Typography>,
  //     icon: <SchoolIcon sx={{ fontSize: "18px" }} />,
  //     path: "/students",
  //   },
  //   {
  //     text: <Typography sx={itemTextStyle}>Teachers</Typography>,
  //     icon: <CastForEducationIcon sx={{ fontSize: "18px" }} />,
  //     path: "/teachers",
  //   },
  //   {
  //     text: <Typography sx={itemTextStyle}>Modules</Typography>,
  //     icon: <ViewModuleIcon sx={{ fontSize: "18px" }} />,
  //     path: "/modules",
  //   },
  //   {
  //     text: <Typography sx={itemTextStyle}>Departments</Typography>,
  //     icon: <SafetyDividerIcon sx={{ fontSize: "18px" }} />,
  //     path: "/departments",
  //   },
  // ];

  // // basic side items
  // const operationItems = [
  //   {
  //     text: <Typography sx={itemTextStyle}>Ass. Teachers</Typography>,
  //     icon: <AssignmentReturnIcon sx={{ fontSize: "18px" }} />,
  //     path: "/assignTeacher",
  //   },
  //   {
  //     text: <Typography sx={itemTextStyle}>Registration</Typography>,
  //     icon: <AppRegistrationIcon sx={{ fontSize: "18px" }} />,
  //     path: "/registration",
  //   },
  //   {
  //     text: <Typography sx={itemTextStyle}>Setting</Typography>,
  //     icon: <SettingsApplicationsIcon sx={{ fontSize: "18px" }} />,
  //     path: "/setting",
  //   },
  // ];

  // // basic side items
  // const userItems = [
  //   {
  //     text: <Typography sx={itemTextStyle}>Profile</Typography>,
  //     icon: <AccountCircleIcon sx={{ fontSize: "18px" }} />,
  //     path: "/profile",
  //   },
  //   {
  //     text: <Typography sx={itemTextStyle}>Logout</Typography>,
  //     icon: <ExitToAppIcon sx={{ fontSize: "18px" }} />,
  //     path: "/logout",
  //   },
  // ];

  // returned drawer
  return (
    <Drawer variant="permanent" anchor="left" sx={styledDrawer}>
      <SideBarTitle sx={styledSidebarTitle}>
        <img
          src={require("../assets/unnamed.png")}
          alt={"W"}
          loading="W"
          style={styledImage}
        />
        <Typography
          variant="p"
          sx={{
            display: isSidebarOpen ? "block" : "none",
            textAlign: "center",
            marginLeft: "10px",
            fontWeight: 600,
            fontSize: "20px",
          }}
        >
          WKU-SMS
        </Typography>
      </SideBarTitle>

      {/* list of admin page */}
      <Box sx={{ marginTop: "83px", padding: "0" }}>
        <List sx={styledList}>
          {/* <Typography sx={itemTitleStyle}>Main</Typography> */}
          {menuItems.map((item) => (
            <Link to={item.path} key={item.path} style={styledLink}>
              <ListItemButton
                onClick={() => handleClick(item.path)}
                sx={
                  isActivePage === item.path ? styledActiveButton : styledButton
                }
              >
                <StyledIconWrapper>{item.icon}</StyledIconWrapper>
                <ListItemText sx={listStyle}>{item.text}</ListItemText>
              </ListItemButton>
            </Link>
          ))}
        </List>
        {/* <List sx={styledList}>
          <Typography sx={itemTitleStyle}>Basic</Typography>
          {basicItems.map((item) => (
            <Link to={item.path} key={item.path} style={styledLink}>
              <ListItemButton sx={styledButton}>
                <StyledIconWrapper>{item.icon}</StyledIconWrapper>
                <ListItemText primary={item.text} sx={listStyle} />
              </ListItemButton>
            </Link>
          ))}
        </List>
        <List sx={styledList}>
          <Typography sx={itemTitleStyle}>List</Typography>
          {listItems.map((item) => (
            <Link to={item.path} key={item.path} style={styledLink}>
              <ListItemButton sx={styledButton}>
                <StyledIconWrapper>{item.icon}</StyledIconWrapper>
                <ListItemText primary={item.text} sx={listStyle} />
              </ListItemButton>
            </Link>
          ))}
        </List>
        <List sx={styledList}>
          <Typography sx={itemTitleStyle}>Operation</Typography>
          {operationItems.map((item) => (
            <Link to={item.path} key={item.path} style={styledLink}>
              <ListItemButton sx={styledButton}>
                <StyledIconWrapper>{item.icon}</StyledIconWrapper>
                <ListItemText primary={item.text} sx={listStyle} />
              </ListItemButton>
            </Link>
          ))}
        </List>
        <List sx={styledList}>
          <Typography sx={itemTitleStyle}>User</Typography>
          {userItems.map((item) => (
            <Link to={item.path} key={item.path} style={styledLink}>
              <ListItemButton sx={styledButton}>
                <StyledIconWrapper>{item.icon}</StyledIconWrapper>
                <ListItemText primary={item.text} sx={listStyle} />
              </ListItemButton>
            </Link>
          ))}
        </List> */}
      </Box>
    </Drawer>
  );
}

export default SideBar;
