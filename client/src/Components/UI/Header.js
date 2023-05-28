import { AppBar, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Link to="login">Login</Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
