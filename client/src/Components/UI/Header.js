import styled from "@emotion/styled";
import { AppBar, Box, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)(() => ({
  textDecoration: "none",
  color: "#fff",
  fontSize: "20px",
  marginLeft: "10px",
}));
const styledImage = {
  marginRight: "10px",
  height: "50px",
  width: "50px",
  borderRadius: "50%",
  objectFit: "cover",
};
const Header = ({ isLogin }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        p: 3,
        paddingLeft: "100px",
        paddingRight: "100px",
        backgroundColor: "#5e35b1",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#5e35b1",
        }}
      >
        <StyledLink to="/">
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={require("../../assets/unnamed.png")}
              alt={"W"}
              loading="W"
              style={styledImage}
            />{" "}
            WKU-CSMS
          </Box>
        </StyledLink>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <StyledLink to="/">Home</StyledLink>
          <StyledLink to="/">About</StyledLink>
          <StyledLink to="/">Contact</StyledLink>
          {isLogin && <StyledLink to="login">Login</StyledLink>}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
