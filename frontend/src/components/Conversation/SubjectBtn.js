import { React, useState } from "react";
import { Button, Typography } from "@mui/material";

function SubjectBtn({ active, subject }) {
  const [toggle, setToggle] = useState(false);

  // 버튼을 눌렀을 때 색깔이 바뀌게 하는 toggle 함수
  const btnColorToggle = (e) => {
    setToggle((prev) => !prev);
    console.log(e.target.textContent);
  };
  return (
    <>
      <Button
        variant="contained"
        sx={{
          height: "40px",
          padding: "0 30px",
          mr: "32px",
          border: "3px solid #111",
          borderRadius: "0",
          color: "#111",
          backgroundColor: toggle ? "#98DA7A" : "#ddd",
          "&:hover": {
            backgroundColor: "#BAE8A4",
          },
        }}
        onClick={btnColorToggle}
      >
        {subject}
      </Button>
    </>
  );
}

export default SubjectBtn;
