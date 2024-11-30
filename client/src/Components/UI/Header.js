import { styled, createTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Logout } from "../../context/LogoutContext";

export const StyledLink = styled(Link)(() => ({
  textDecoration: "none",
  color: "#000",
  fontSize: "16px",
  fontWeight: "55px",
}));
const styledImage = {
  marginRight: "10px",
  height: "50px",
  width: "50px",
  borderRadius: "50%",
  objectFit: "cover",
};

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

const imgStyle = {
  width: "30px",
  height: "30px",
  borderRadius: "100%",
  marginRight: "5px",
  objectFit: "cover",
  border: "5px solid #fff",
};

const Header = ({ isLogin }) => {
  const [hasShadow, setHasShadow] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  // currentPath of the window
  const currentPath = window.location.pathname;

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [isNotification, setIsNotification] = useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const { logout } = Logout();
  const navigate = useNavigate(); // Move the navigate hook here
  const handleLogoutClick = () => {
    logout();
    navigate("/login"); // Use the navigate function from the outer scope
  };
  const myAccount = () => {
    currentPath !== "/myAccount"
      ? navigate("myAccount")
      : navigate("/myAccount"); // Use the navigate function from the outer scope
    handleMenuClose();
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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasShadow(true);
      } else {
        setHasShadow(false);
      }
    };
    // Attach the scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
      <MenuItem onClick={myAccount}>My Account</MenuItem>

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
        <Link to="/myAccount">My Account</Link>
      </MenuItem>
    </Menu>
  );
  return (
    <Box
      sx={{ background: "#FDFDFE" }}
      className={`fixed w-full py-4 ${
        hasShadow ? "shadow-lg" : ""
      } 2xl:pl-72 2xl:pr-72 xl:pl-48 xl:pr-48 lg:pl-24 lg:pr-24 pl-10 pr-10 ease-in-out duration-300 z-50`}
    >
      <Box
        sx={{ background: "#FDFDFE" }}
        className="flex w-full justify-between"
      >
        <StyledLink
          to={
            user ? (user.role.includes("student") ? "/studentInfo" : "/") : "/"
          }
        >
          <Box sx={{ margin: "0", display: "flex", alignItems: "center" }}>
            <img
              src={require("../../assets/unnamed.png")}
              alt={"W"}
              loading="W"
              style={styledImage}
            />
            <Typography sx={{ fontFamily: "Fruktur", fontSize: "38" }}>
              WKU-CSMS
            </Typography>
          </Box>
        </StyledLink>
        <Box className="flex justify-end gap-5 items-center">
          <StyledLink
            to={
              user
                ? user.role.includes("student")
                  ? "/studentInfo"
                  : "/"
                : "/"
            }
          >
            {user
              ? user.role.includes("student")
                ? "My Home"
                : "Home"
              : "Home"}
          </StyledLink>
          {user && user.role.includes("student") && (
            <StyledLink
              to={currentPath === "/" ? "studentInfo/myDocs" : "myDocs"}
            >
              My Docs
            </StyledLink>
          )}
          {!user && <StyledLink to="/">About</StyledLink>}

          {!user && <StyledLink to="/">Contacts</StyledLink>}
          {user && !user.role.includes("student") && (
            <StyledLink to="/dashboard">Dashboard</StyledLink>
          )}
          {isLogin && !user && (
            <Button
              sx={{
                background: "#5E35B1",
                color: "#fff",
                "&:hover": { background: "#5E35B1" },
                textTransform: "capitalize",
                fontWeight: "bold",
              }}
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
          )}
          {/* user icon */}
          {user && (
            <ProfileStyle
              aria-controls={menuId}
              onClick={handleProfileMenuOpen}
            >
              <img
                src={require("../../assets/unnamed.png")}
                alt="CSMS"
                style={imgStyle}
              />
              <AccountCircle sx={{ fontSize: "19px" }} />
            </ProfileStyle>
          )}
        </Box>
        {renderMobileMenu}
        {renderMenu}
      </Box>
    </Box>
  );
};

export default Header;
