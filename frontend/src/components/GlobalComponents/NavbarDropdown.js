import React from "react";
import { NavLink } from "react-router-dom";
import { PersonCircle } from "react-bootstrap-icons";
import Collapse from "@mui/material/Collapse";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function NavbarDropdown() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <PersonCircle onClick={handleClick} />
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
            top: "60px",
            right: "105px",
            backgroundColor: "#fff",
            padding: "16px",
            border: "3px solid #111",
          }}
        >
          <li>
            <NavLink to="/mypage">마이페이지</NavLink>
          </li>
          <li>
            <NavLink to="/friend-list">친구신청목록</NavLink>
          </li>
        </Collapse>
      </ul>
    </>
  );
}

export default NavbarDropdown;
