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
import { useContext, useState } from "react";
import { Button, useMediaQuery } from "@mui/material";
import { Logout } from "../context/LogoutContext";
import { useNavigate } from "react-router-dom";

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
  const theme = createTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const drawerWidth = 260;
  const collapse = 70;

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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
            <IconWrapper sx={styledMenu}>
              <Badge badgeContent={17} color="error">
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
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
