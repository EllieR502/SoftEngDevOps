import * as React from "react";
import { Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";

export default function StandardSelect({
  label,
  selectOptions,
  data,
  setData,
}) {
  const handleChange = (event) => {
    setData(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel sx={{ marginTop: -1.5 }} id="label-id">
          {label}
        </InputLabel>
        <Select
          sx={{ maxHeight: 30 }}
          labelId="label-id"
          id="select-id"
          value={data}
          label={label}
          onChange={handleChange}
        >
          {selectOptions.map((option) => {
            return <MenuItem value={option}>{option}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
