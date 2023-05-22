import { Box, Checkbox, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const Dropdown = ({ options, label, value, onChange, width }) => {
  const renderSelectedItems = (selected) => {
    const selectedCount = selected.length;
    if (selectedCount === 0) {
      return "None selected";
    } else if (selectedCount === 1) {
      const option = options.find((option) => option.value === selected[0]);
      return option.label;
    } else {
      return `${selectedCount} selected`;
    }
  };

  return (
    <Box sx={{ minWidth: width, marginRight: 3 }}>
      <FormControl variant="standard" fullWidth>
        <InputLabel id="demo-multiple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-multiple-select-label"
          id="demo-multiple-select"
          multiple
          value={value}
          onChange={onChange}
          renderValue={renderSelectedItems}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <Checkbox checked={value.includes(option.value)} />
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Dropdown;
