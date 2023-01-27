import React, { useState } from "react";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";

import { Search } from "react-bootstrap-icons";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function SearchComp() {
  const [type, setType] = useState("user_id");

  const [text, setText] = useState("");

  const onChange = (e) => {
    setText(e.target.value);
  };

  const handleChange = (e) => {
    setType(e.target.value);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Select value={type} label={type} onChange={handleChange}>
        <MenuItem value={"user_id"}>아이디</MenuItem>
        <MenuItem value={"nickname"}>닉네임</MenuItem>
      </Select>
      <Box sx={{ width: "100%", height: "100%" }}>
        <input
          type="text"
          value={text}
          onChange={onChange}
          css={css`
            width: 95%;
            height: 100%;
          `}
        />
        <Search />
      </Box>
    </Box>
  );
}

export default SearchComp;
