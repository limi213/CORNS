import React from "react";
import Button from "@mui/material/Button";

function SubjectBtn({ active, subject }) {
  const btnColor = active ? "#98DA7A" : "#ddd";
  return (
    <>
      <Button
        variant="contained"
        sx={{
          height: "40px",
          padding: "0 30px",
          border: "3px solid #111",
          backgroundColor: btnColor,
        }}
      >
        {subject}
      </Button>
    </>
  );
}

export default SubjectBtn;
