import React from "react";
import { NavLink } from "react-router-dom";
import { PersonCircle } from "react-bootstrap-icons";
import Collapse from "@mui/material/Collapse";
import Divider from '@mui/material/Divider'
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function NavbarDropdown() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <PersonCircle onClick={handleClick} width="100%" css={css`font-size: 20px;`}/>
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
            width: '120px',
          }}
        >
          <li css={css`padding: 5%`}>
            <NavLink to="/mypage/changeProfile" style={{ textDecoration: "none", color: "black" }} activeStyle={{fontWeight: 'bold'}}>마이페이지</NavLink>
          </li>
          <Divider />
          <li css={css`padding: 5%`}>
            <NavLink to="/community/friends" style={{ textDecoration: "none", color: "black" }} activeStyle={{fontWeight: 'bold'}}>친구신청</NavLink>
          </li>
        </Collapse>
      </ul>
    </>
  );
}

export default NavbarDropdown;
