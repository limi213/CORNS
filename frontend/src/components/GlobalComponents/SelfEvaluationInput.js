import { TextField, Box, Button } from "@mui/material";
import React from "react";

function SelfEvaluationInput({}) {
  return (
    <>
      <Box component="form">
        <TextField
          variant="outlined"
          id="my-input"
          aria-describedby="my-helper-text"
          multiline
          rows={4}
          sx={{ width: "100%" }}
        />
        <Button variant="contained" component="label">
          등록
          <input hidden type="submit"></input>
        </Button>
      </Box>
    </>
  );
}

export default SelfEvaluationInput;
