import React from "react";
import { NavLink } from "react-router-dom";
import { PersonCircle } from "react-bootstrap-icons";
import { Collapse, Box, Divider } from "@mui/material";

import almeng from "assets/almeng.png";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function NavbarDropdown() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const image = () => {
    if (sessionStorage.getItem("imgUrl") !== "null") {
      // 프로필 img 있는 경우
      return <img />;
    } else {
      // 프로필 img 없는 경우 
      return (
        <img
          src={almeng}
          alt="profile"
          css={css`
            width: 100%;
            margin-top: 10%;
          `}
        />
      );
    }
  };

  return (
    <>
      <Box
        sx={{
          height: "30px",
          width: "30px",
          borderRadius: "200px",
          border: "2px solid #111",
          cursor: "pointer",
          backgroundColor: "white"
        }}
        onClick={handleClick}
      >
        {image()}
      </Box>

      <ul
        css={css`
          list-style: none;
        `}
      >
        <Collapse
          in={open}
          timeout="auto"
          unmountOnExit
          sx={{
            position: "absolute",
            top: "50px",
            right: "3%",
            backgroundColor: "#fff",
            border: "3px solid #111",
            width: "120px",
          }}
        >
          <li
            css={css`
              padding: 5%;
            `}
          >
            <NavLink
              to="/mypage/changeProfile"
              style={{ textDecoration: "none", color: "black" }}
              activeStyle={{ fontWeight: "bold" }}
            >
              마이페이지
            </NavLink>
          </li>
          <Divider />
          <li
            css={css`
              padding: 5%;
            `}
          >
            <NavLink
              to="/community/friends"
              style={{ textDecoration: "none", color: "black" }}
              activeStyle={{ fontWeight: "bold" }}
            >
              친구신청
            </NavLink>
          </li>
        </Collapse>
      </ul>
    </>
  );
}

export default NavbarDropdown;
