import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import "./Dropdown.scss";
import { useState } from "react";

const Dropdown = () => {
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className="dropdown-menu">
      <FormControl
        sx={{ mb: 2, minWidth: 300 }}
        className="dropdown-form"
        variant="standard"
      >
        <InputLabel id="demo-simple-select-helper-label">Curriculum</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={age}
          label="Curriculum"
          onChange={handleChange}
        >
          <MenuItem value="">
            <p>Curriculum</p>
          </MenuItem>
          <MenuItem value={10}>Curriculum-2013-KG</MenuItem>
          <MenuItem value={20}>Curriculum-2014-KG</MenuItem>
          <MenuItem value={30}>Curriculum-2015-KG</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default Dropdown;
