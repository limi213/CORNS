import { React, useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { addSubject, removeSubject } from "store/reducers/roomFilterReducer";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
function SubjectBtn({ subject, reset }) {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.roomFilterReducer);

  const { subjectNo, value } = subject;
  const [toggle, setToggle] = useState(true);

  // 버튼을 눌렀을 때 색깔이 바뀌게 하는 toggle 함수
  const btnColorToggle = (e) => {
    setToggle((prev) => !prev);
  };

  if (reset) {
    setToggle(() => true);
  }

  // 주제 버튼 누를 때마다 params 주제 해제하는 함수
  const checkFilter = () => {
    if (toggle === false) {
      dispatch(addSubject(subjectNo, "ADD_SUBJECT"));
    } else {
      dispatch(removeSubject(subjectNo, "REMOVE_SUBJECT"));
    }
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
          fontFamily: "'Noto Sans KR', sans-serif",
          fontWeight: "bold",
          fontSize: "16px",
          backgroundColor: toggle ? "#98DA7A" : "#ddd",
          "&:hover": {
            backgroundColor: "#BAE8A4",
          },
        }}
        id={subjectNo}
        onClick={() => {
          btnColorToggle();
          checkFilter();
        }}
      >
        {value}
      </Button>
    </>
  );
}

export default SubjectBtn;
