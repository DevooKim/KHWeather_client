import React from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";

const AutocompleteSearchInput = ({ label, options, onChange, size, sx }) => (
  <Autocomplete
    clearOnEscape
    options={options}
    onChange={onChange}
    size={size}
    sx={{ ...sx }}
    renderInput={(params) => (
      <TextField
        {...params}
        label={label}
        InputProps={{
          ...params.InputProps,
          endAdornment: <SearchIcon />,
        }}
      />
    )}
  />
);

AutocompleteSearchInput.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
  size: PropTypes.string,
};

AutocompleteSearchInput.defaultProps = {
  options: [],
  size: "small",
};

export default AutocompleteSearchInput;
