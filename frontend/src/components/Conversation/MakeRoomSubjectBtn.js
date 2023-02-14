import { React, useState } from "react";
import { Button } from "@mui/material";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";




  function MakeRoomSubjectBtn({ subject,onChange }) {
  
    const { subjectNo, value } = subject;
    const [toggle, setToggle] = useState(true);


  return (
    <>

      <span
        css={css`
          border: 3px solid #111;
          color: #111;
          background-color: #98da7a;
          box-sizing: border-box;
          padding: 8px 16px;
          margin-right: 16px;
          font-weight: bold;
        `}
      >
        <input type="radio" name="topic" defaultValue={subjectNo} onChange={(e)=>onChange(e)}/> {value}
        
      </span>

      {/* <Button
        variant="contained"
        sx={{
          height: "40px",
          padding: "0 30px",
          mr: "32px",
          border: "3px solid #111",
          borderRadius: "0",
          color: "#111",
        //   backgroundColor: "#ddd",
          backgroundColor: toggle ? "#98DA7A" : "#ddd",
          "&:hover": {
            backgroundColor: "#BAE8A4",
          },
        }}
        id={subjectNo}
        onClick={() => {
          btnColorToggle();
        //   checkFilter();
        }}
      >
        { value }
      </Button> */}
</>
  )
}

export default MakeRoomSubjectBtn;
