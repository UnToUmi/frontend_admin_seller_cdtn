import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { FormattedMessage } from "react-intl";

const Search = ({ perPage, setPerPage, setSearchValue, searchValue }) => {
  const handleChange = (event) => {
    const newValue = parseInt(event.target.value);
    setPerPage(newValue);
    console.log("New perPage value:", newValue);
  };
  return (
    <FormControl
      sx={{
        width: "100px",
      }}
      variant="outlined"
      size="small"
    >
      <InputLabel color="success" id="demo-simple-select-helper-label">
        <FormattedMessage id="main.pages" />
      </InputLabel>
      <Select
        style={{ borderRadius: "16px", backgroundColor: "whitesmoke" }}
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={perPage}
        label="Pages"
        onChange={handleChange}
        color="success"
      >
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={15}>15</MenuItem>
      </Select>
    </FormControl>
  );
};

export default Search;
