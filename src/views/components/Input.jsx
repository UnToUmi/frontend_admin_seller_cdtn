import { TextField } from "@mui/material";
import React from "react";
import { nonAccentVietnamese } from "../../utils/nonAccentVietnamese";

export const Input = ({ perPage, setPerPage, setSearchValue, searchValue }) => {
  const handleChange = (event) => {
    const newValue = event.target.value;

    setSearchValue(nonAccentVietnamese(newValue));
  };
  return (
    <TextField
      onChange={(event) => {
        handleChange(event);
      }}
      className="w-[230px]"
      size="small"
      type="text"
      id="standard-basic"
      label="Search..."
      variant="outlined"
      color="success"
      InputProps={{
        style: { borderRadius: 16, backgroundColor: "whitesmoke" },
      }}
    />
  );
};
