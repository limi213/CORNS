import { React, useState} from "react";
import { Button } from "@mui/material";
import { css } from "@emotion/react";


// function MakeRoomSubjectBtn({ subject }) {
  function MakeRoomSubjectBtn({ subject,onChange }) {
  
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
        {/* <input type="radio" name="topic" value={subjectNo}/> { value }   */}
        <input type="radio" name="topic" defaultValue={subjectNo} onChange={(e)=>onChange(e)}/> { value }
        &nbsp;&nbsp;
    </label>
    </>
  );
}

export default MakeRoomSubjectBtn;
