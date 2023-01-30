import React, { useState } from "react";

// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
import { Box, Input, Select, MenuItem } from "@mui/material";

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
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-around"}}>
      <Select value={type} onChange={handleChange}>
        <MenuItem value={"user_id"}>아이디</MenuItem>
        <MenuItem value={"nickname"}>닉네임</MenuItem>
      </Select>
      <Box sx={{ width: "100%", height: "100%" }}>
        <Input
          variant="outlined"
          placeholder="5"
          sx={{
            backgroundColor: "#fff",
            border: "1px solid #DDDDDD",
            borderRadius: "10px",
            pl: "1rem",
            mr: "1rem",
            ml: "1rem",
            width: "90%",
            height: "45px",
          }}
        />
        <Search css={css`font-size: 18px`}/>
      </Box>
    </Box>
  );
}

export default SearchComp;
