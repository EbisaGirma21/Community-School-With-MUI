import Button from "@mui/material/Button";

export const CustomButton = ({ children }) => {
  return (
    <Button
      variant="contained"
      sx={{
        textTransform: "capitalize",
        margin: "4px",
        background: "#5E35B1",
      }}
    >
      {children}
    </Button>
  );
};
