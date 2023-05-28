import { styled } from "@mui/material/styles";
import { Box, Button, Divider, Input, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const ErrorLabel = styled(Box)(() => ({
  backgroundColor: "#FFF0F1",
  border: "1px solid #e5a9ac",
  padding: "5px",
  borderRadius: "10px",
  color: "#864348",
  marginTop: "10px",
}));
export const StyledButton = styled(Button)(() => ({
  backgroundColor: "#4454c3",
  color: "white",
  margin: "5px",
  marginTop: "10px",
  marginBottom: "10px",
  "&:hover": {
    backgroundColor: "#3042b5",
  },
}));
export const StyledInput = styled(Input)(() => ({
  margin: "5px",
  marginTop: "10px",
}));
const StyledBox = styled(Box)(() => ({
  minHeight: "calc(100vh - 250px)",
  height: "auto",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const CardWrapper = styled(Box)(() => ({
  border: "0",
  boxShadow: "0 10px 10px 20px #b0b8d617, 10px 10px 15px -5px #b0b8d6",
  borderRadius: "8px",
  padding: "50px",
  minHeight: "440px",
  marginTop: "200px",
}));

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) {
      navigate("/dashboard");
      setUsername("");
      setPassword("");
    }
  };

  return (
    <>
      <StyledBox>
        <CardWrapper>
          <Divider>
            <Typography variant="h4">Login</Typography>
          </Divider>
          <Typography
            variant="body1"
            sx={{ mt: 2, mb: 1, textAlign: "center" }}
          >
            Sign in to your account
          </Typography>
          <br />
          <Box sx={{ mt: 1, mb: 1, textAlign: "center" }}>
            <StyledButton sx={{ backgroundColor: "#FF5B51" }}>
              Google
            </StyledButton>
            <StyledButton>Twitter</StyledButton>
            <StyledButton>Facebook</StyledButton>
          </Box>
          <Divider sx={{ mt: 2, mb: 2 }}>OR</Divider>
          <form onSubmit={handleSubmit}>
            <StyledInput
              type="text"
              placeholder="Username"
              fullWidth
              value={username}
              onChange={handleUsernameChange}
            />
            <StyledInput
              type="password"
              placeholder="Password"
              fullWidth
              value={password}
              onChange={handlePasswordChange}
            />

            <StyledButton type="submit" disabled={isLoading} fullWidth>
              Login
            </StyledButton>
            {error && <ErrorLabel>{error}</ErrorLabel>}
          </form>
          <Link to="/forgot-password">Forgot password?</Link>
        </CardWrapper>
      </StyledBox>
    </>
  );
};

export default Login;
