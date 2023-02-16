import React, { useState, useEffect } from "react";

import { Box, Input, Select, MenuItem } from "@mui/material";
import { Search } from "react-bootstrap-icons";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function SearchComp({ type, setType, text, setText, setSearch, isIcon }) {
  const [textInfo, setTextInfo] = useState("");
  const [textState, setTextState] = useState(true);

  // id or nickname 확인
  useEffect(() => {
    if (type === "id") {
      setTextInfo("숫자로 입력해주세요.");
    } else {
      setTextInfo("영어로 입력해주세요.");
    }
  }, [type]);

  // input handle
  const onChange = (e) => {
    if (type === "id") {
      if (e.target.value.toLowerCase().match(/^[0-9]*$/)) {
        setText(e.target.value);
        setTextState(true);
      } else {
        setTextState(false);
      }
    } else {
      if (e.target.value.match(/^[a-zA-Z]*$/)) {
        setText(e.target.value);
        setTextState(true);
      } else {
        setTextState(false);
      }
    }
  };

  // type handle
  const handleChange = (e) => {
    setType(e.target.value);
    setText("");
    setSearch(0);
  };

  // search handle
  const onSearch = () => {
    setSearch((prev) => prev + 1);
  };

  // enterkey handle
  const enterKey = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Select
          value={type}
          onChange={handleChange}
          sx={{ height: "51px", border: "3px solid #111", fontFamily: "Noto Sans KR", fontSize: "18px"}}
        >
          <MenuItem value={"nickname"} sx={{fontFamily: "Noto Sans KR", fontSize: "16px"}}>닉네임</MenuItem>
          <MenuItem value={"id"} sx={{fontFamily: "Noto Sans KR", fontSize: "16px"}}>아이디</MenuItem>
        </Select>
        <Box sx={{ width: "100%", height: "100%" }}>
          <input
            placeholder={`${
              type === "nickname" ? "닉네임을" : "아이디를"
            } 입력해주세요.`}
            value={text}
            onChange={onChange}
            css={css`
              border: 3px solid #111;
              border-radius: 5px;
              width: ${isIcon ? "90%" : "95%"};
              height: 45px;
              font-size: 18px;
              font-family: "Noto Sans KR";
              padding: 0 0 0 2%;
              margin: 0 2%;
            `}
            onKeyUp={enterKey}
          />

          {isIcon && (
            <Search
              css={css`
                font-size: 18px;
                cursor: pointer;
              `}
              onClick={onSearch}
            />
          )}
        </Box>
      </Box>

      <p
        css={css`
          font-size: 14px;
          margin-left: 12%;
          color: ${textState? "#111" : "#FF0000"};
        `}
      >
        {textInfo}
      </p>
    </>
  );
}

export default SearchComp;
