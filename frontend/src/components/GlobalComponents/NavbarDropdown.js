import React from "react";
import { NavLink } from "react-router-dom";
import { PersonCircle } from "react-bootstrap-icons";
import { Collapse, Box, Divider } from "@mui/material";

import almeng from "assets/almeng.png";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import ProfileImg from "./ProfileImg";

function NavbarDropdown() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box
        sx={{cursor: "pointer"}}
        onClick={handleClick}
      >
        <ProfileImg
          imgSrc={
            sessionStorage.getItem("imgUrl") !== "null"
              ? sessionStorage.getItem("imgUrl")
              : ""
          }
          nickname={sessionStorage.getItem("nickname")}
          width={"30px"}
        />
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
              css={css`font-weight: ${window.location.href.includes("mypage") && "bold"}`}
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
              css={css`font-weight: ${window.location.href.includes("community/friends") && "bold"}`}
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
