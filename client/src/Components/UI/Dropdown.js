import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const Dropdown = ({ options, label, value, onChange, width }) => {
  return (
    <Box className="dropdown-menu mr-4" sx={{ minWidth: width } }>
      <FormControl variant="standard" fullWidth>
        <InputLabel
          id="demo-simple-select-helper-label"
          className="input-field"
        >
          {label}
        </InputLabel>
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
    </Box>
  );
};

export default Dropdown;
