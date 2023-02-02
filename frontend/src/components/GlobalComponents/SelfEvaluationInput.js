import { Input, Box, Button } from "@mui/material";
import React from "react";
import StarRating from "./StarRating";

function SelfEvaluationInput({}) {
  return (
    <>
      <Box
        component="form"
        sx={{
          border: "3px solid #111",
          position: "relative",
          width: "100%",
        }}
      >
        <StarRating />
        <Input
          id="my-input"
          aria-describedby="my-helper-text"
          rows={4}
          multiline={true}
          sx={{
            width: "100%",
            backgroundColor: "white",
            padding: "1rem 5.5rem 1rem 1rem",
          }}
        />

        <Button
          variant="contained"
          component="label"
          sx={{ position: "absolute", bottom: "24px", right: "24px" }}
        >
          등록
          <input hidden type="submit"></input>
        </Button>
      </Box>
    </>
  );
}

export default SelfEvaluationInput;
