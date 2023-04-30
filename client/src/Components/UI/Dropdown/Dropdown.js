import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import "./Dropdown.scss";

const Dropdown = ({ options, label, value, onChange }) => {
  return (
    <div className="dropdown-menu">
      <FormControl
        sx={{ mt: 1, minWidth: 300 }}
        className="dropdown-form"
        variant="standard"
      >
        <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={value}
          label={label}
          onChange={onChange}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default Dropdown;
