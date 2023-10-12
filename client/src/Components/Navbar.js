import { styled, createTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import ToggleProvider from "../context/SidebarContext";
import { useContext, useEffect, useRef, useState } from "react";
import { Button, Typography, useMediaQuery } from "@mui/material";
import { Logout } from "../context/LogoutContext";
import { Link, useNavigate } from "react-router-dom";
import RequestContext from "../context/RequestContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "8px",
  height: "50px",
  display: "flex",
  border: "2px solid #1E88E5",
  alignItems: "center",
  background: "rgb(248, 250, 252)",
  th: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "457px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#000",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
    color: "rgb(18, 25, 38)",
  },
}));

// for icon
const IconWrapper = styled(IconButton)(() => ({
  borderRadius: "10px",
  height: "34px",
  width: "34px",
  margin: "8px 8px",
}));

// profile style
const ProfileStyle = styled(Button)(() => ({
  height: "50px",
  backgroundColor: " #C7E4FC",
  paddingRight: "20px",
  borderRadius: "30px",
  color: "#1E88E5",
  "&:hover": {
    backgroundColor: "#1E88E5",
    color: "#C7E4FC",
  },
}));
// menu icon styles
const styledMenu = {
  color: "#673AB7",
  backgroundColor: "#ede7f6",
  "&:hover": {
    backgroundColor: "#673AB7",
    color: "#ede7f6",
  },
};
const styledMail = {
  color: "#1E88E5",
  backgroundColor: "#C7E4FC",
  "&:hover": {
    backgroundColor: "#1E88E5",
    color: "#C7E4FC",
  },
};

const imgStyle = {
  width: "30px",
  height: "30px",
  borderRadius: "100%",
  marginRight: "5px",
  objectFit: "cover",
  border: "5px solid #fff",
};

export default function Navbar() {
  // switching navbar with sidebar
  const { toggleSidebar, isSidebarOpen } = useContext(ToggleProvider);
  // context
  const { request, fetchRequests } = useContext(RequestContext);

  const theme = createTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const drawerWidth = 260;
  const collapse = 70;

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [isNotification, setIsNotification] = useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const isIconRef = useRef(false);

  const { logout } = Logout();
  const navigate = useNavigate();
  const handleLogoutClick = () => {
    logout();
    navigate("/login");
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  // fecth varint from database
  useEffect(() => {
    fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // request that is not approved
  const unApprovedRequest = request.filter((request) => {
    return request.requestStatus === "notApproved";
  });

  // request that approved
  const approvedRequest = request.filter((request) => {
    return request.requestStatus === "approved";
  });

  const styledButton = {
    color: "#22c55e",
    background: "#bbf7d0",
    textTransform: "lowercase",
    borderRadius: "20px",
    fontSize: "14px",
    height: "28px",
    marginTop: "5px",
    boxShadow: "none",
    padding: "10px",
    "&:hover": {
      background: "#bbf7d0",
    },
  };

  // styled app bar with parameter
  const styledAppBar = {
    height: "83px",
    color: "#000",
    backgroundColor: "#fff",
    width: isSidebarOpen
      ? isSmallScreen
        ? "100%"
        : `calc(100% - ${drawerWidth}px)`
      : isSmallScreen
      ? "100%"
      : `calc(100% - ${collapse}px)`,
    transition: "0.2s",
    boxShadow: "none",
    paddingLeft: "4px !important",
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton>
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  // notification panel handler
  const handleNotificationOpen = () => {
    setIsNotification(!isNotification);
    isIconRef.current = true;
  };

  const notificationRef = useRef(null);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        if (!isIconRef.current) {
          setIsNotification(false);
        }
        isIconRef.current = false;
      }
    };
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <Box
      sx={{ flexGrow: 1 }}
      onClick={() => {
        return isSidebarOpen ? (isSmallScreen ? toggleSidebar() : null) : null;
      }}
    >
      <AppBar position="fixed" sx={styledAppBar}>
        <Toolbar
          style={{ height: "83px", paddingLeft: "4px", paddingRight: "10px" }}
        >
          <IconWrapper onClick={toggleSidebar} sx={styledMenu}>
            <MenuIcon sx={{ fontSize: "19px" }} />
          </IconWrapper>
          <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: "#697586 " }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search"
              inputProps={{ "aria-label": "search" }}
              sx={{ width: "100%" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {/* mail icon */}
            <IconWrapper sx={styledMail}>
              <Badge badgeContent={4} color="error">
                <MailIcon sx={{ fontSize: "19px" }} />
              </Badge>
            </IconWrapper>

            {/* notification icon */}
            <IconWrapper
              sx={styledMenu}
              ref={notificationRef}
              onClick={handleNotificationOpen}
            >
              <Badge badgeContent={unApprovedRequest.length} color="error">
                <NotificationsIcon sx={{ fontSize: "19px" }} />
              </Badge>
            </IconWrapper>

            {/* user icon */}
            <ProfileStyle aria-controls={menuId}>
              <img
                src={require("../assets/unnamed.png")}
                alt="CSMS"
                style={imgStyle}
              />
              <AccountCircle
                onClick={handleProfileMenuOpen}
                sx={{ fontSize: "19px" }}
              />
            </ProfileStyle>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
          {/* Notification Box */}
          <Box
            ref={notificationRef}
            sx={{ display: isNotification ? "block" : "none" }}
            className="absolute bg-white shadow-2xl w-80 h-auto right-16 top-16 rounded-xl "
          >
            {/* header */}
            <Box className="text-blue-950 pt-5 px-2  h-16 border-b border-b-gray-300 flex justify-between text-sm">
              <Typography variant="p">App Notification</Typography>
              <Link>Mark as all unread</Link>
            </Box>

            {/* body */}
            <Box className="w-80 h-96 overflow-y-auto">
              {/* unapproved notification */}
              {unApprovedRequest.map((request) => {
                return (
                  <Box
                    key={request._id}
                    className="flex p-2 border-b border-t-gray-300 hover:bg-slate-200"
                    sx={{ background: "#E3F2FD" }}
                  >
                    <img
                      src={require("../assets/warning.png")}
                      alt="store"
                      className=" rounded-full object-contain w-12 h-12 bg-red-200"
                    />
                    <Box className="text-blue-950 px-2 py-3 h-32">
                      <Box className=" text-sm flex justify-between">
                        <Typography variant="p" className=" font-semibold	">
                          Unapproved:
                        </Typography>
                        <Typography variant="p" className="text-xs">
                          {formatDistanceToNow(new Date(request.updatedAt), {
                            addSuffiX: true,
                          })}
                        </Typography>
                      </Box>

                      <Box className="text-xs flex justify-center p-2">
                        <Typography
                          variant="p"
                          className="text-xs whitespace-break-spaces "
                        >
                          {request.acCurriculum} goes under threshold value.
                          Request for transfer as soon as possible
                        </Typography>
                      </Box>
                      <Box className="flex justify-start">
                        <button className="text-red-500 text-sm  bg-red-200 lowercase p-1 rounded-full px-2 !important m-1 ">
                          {"unread"}
                        </button>
                        <Button disabled={false} sx={styledButton}>
                          {"Approve"}
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                );
              })}

              {/* Approved request */}
              {approvedRequest.map((request) => {
                return (
                  <Box
                    key={request._id}
                    className="flex p-2 border-b border-t-gray-300 hover:bg-slate-200"
                  >
                    <img
                      src={require("../assets/store.png")}
                      alt="store"
                      className=" rounded-full object-contain w-12 h-12 bg-green-200"
                    />
                    <Box className="text-blue-950 px-2 py-3 h-32">
                      <Box className=" text-sm flex justify-between">
                        <Typography variant="p" className=" font-semibold	">
                          Approved:
                        </Typography>
                        <Typography variant="p" className="text-xs">
                          {formatDistanceToNow(new Date(request.updatedAt), {
                            addSuffiX: true,
                          })}
                        </Typography>
                      </Box>

                      <Box className="text-xs flex justify-center p-2">
                        <Typography
                          variant="p"
                          className="text-xs whitespace-break-spaces "
                        >
                          {request.acCurriculum} goes under threshold value.
                          Request for transfer as soon as possible
                        </Typography>
                      </Box>
                      <Box className="flex justify-start">
                        <button className="text-red-500 text-sm  bg-red-200 lowercase p-1 rounded-full px-2 !important m-1 ">
                          approved
                        </button>
                        <Button
                          // onClick={() => handleSeenApproved(request._id)}
                          sx={styledButton}
                        >
                          View
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>
            {/* footer */}
            <Box className=" bg-white  pt-1 text-sky-500 border border-t-slate-300 flex justify-center rounded-bl-xl rounded-br-xl">
              <Button className=" ">View All</Button>
            </Box>
          </Box>
          {/* End of notification box */}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
