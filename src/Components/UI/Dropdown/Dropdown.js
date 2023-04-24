import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import "./Dropdown.scss";
import { useState } from "react";

const Dropdown = () => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
      setSelectedOption(event.target.value);
    };

  return (
    <div className="dropdown-menu">
      <FormControl className="dromdown-form">
        <InputLabel id="demo-simple-select-label" className="dropdown-title">
          Select a Curriculum
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedOption}
          onChange={handleChange}
        >
          <MenuItem value={10}>Curriculmum-1 2015 ( KG - R )</MenuItem>
          <MenuItem value={10}>Elementary 2015 ( PRM - R )</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default Dropdown;
