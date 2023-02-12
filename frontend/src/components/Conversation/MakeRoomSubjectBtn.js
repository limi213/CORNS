import { React, useState} from "react";
import { Button } from "@mui/material";
import { css } from "@emotion/react";


function MakeRoomSubjectBtn({ subject }) {
  
    const { subjectNo, value } = subject;
    const [toggle, setToggle] = useState(true);

    // 버튼을 눌렀을 때 색깔이 바뀌게 하는 toggle 함수
    // const btnColorToggle = (e) => {
    //   setToggle((prev) => !prev);
    // };
    
return (
    <>
    <label  style={{
        border: '3px solid #111',
        margin: '15px',
        padding: '3px',
        color: "#111",
        backgroundColor: "#98DA7A"
    }}>
        <input type="radio" name="topic" value={subjectNo}/> { value }  &nbsp;&nbsp;
    </label>

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
  );
}

export default MakeRoomSubjectBtn;
