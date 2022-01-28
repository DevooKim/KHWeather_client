import React, { useState, useCallback } from "react";
import { Paper, Box, Typography } from "@mui/material";
import { IconButton } from "@material-ui/core";
import Brightness7 from "@mui/icons-material/Brightness7";
import Brightness4 from "@mui/icons-material/Brightness4";
import AutocompleteSearchInput from "../../components/AutocompleteSearchInput";

const dummy = [1, 2, 3, 4, 5];
const NewHeader = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [value, setValue] = useState("");

  const onClick = useCallback(() => setIsDarkMode((prev) => !prev), []);
  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onKeyDown = () => {
    if (e.key !== "Enter") return;
    console.log(value);
    //change query
  };
  return (
    <Paper
      elevation={3}
      sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: "4rem", py: "0.25rem" }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography variant="h4">KHWeather</Typography>
        <IconButton onClick={onClick}>{isDarkMode ? <Brightness4 /> : <Brightness7 />}</IconButton>
      </Box>
      <AutocompleteSearchInput
        label="지역 검색"
        options={dummy}
        size="small"
        onChange={onChange}
        onKeyDown={onKeyDown}
        fullWidth={true}
        sx={{ width: "15rem" }}
      />
    </Paper>
  );
};

export default NewHeader;
