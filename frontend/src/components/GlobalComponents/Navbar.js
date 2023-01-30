import React from "react";
import { NavLink } from "react-router-dom";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import NavbarDropdown from "./NavbarDropdown";



const Navbar = () => {
  const user = false;

  return (
    <nav
      css={css`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 50%;

        width: 1730px
        height: 60px;
        top: 0px;

        background: #ffc804;
      `}
    >
      <div
        css={css`
          // width: 95px;
          // height: 57px;

          flex: none;
          order: 0;
          flex-grow: 0;
          color: 'black'
        `}
      >
        <NavLink to="/">corns</NavLink>
      </div>

      <ul
        css={css`
          list-style: none;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding: 0px;
          width: 40%;
          height: 26px;
          color: black;
        `}
      >
        <li>
          <NavLink to="/conversation" style={{ textDecoration: "none", color: "black" }} activeStyle={{fontWeight: 'bold'}}>쫑알쫑알</NavLink>
        </li>
        <li>
          <NavLink to="/conversationLog" style={{ textDecoration: "none", color: "black" }} activeStyle={{fontWeight: 'bold'}}>쫑알로그</NavLink>
        </li>
        <li>
          <NavLink to="/growthRecord" style={{ textDecoration: "none", color: "black" }} activeStyle={{fontWeight: 'bold'}}>성장기록</NavLink>
        </li>
        <li>
          <NavLink to="/community/ranking/sincerity" style={{ textDecoration: "none", color: "black" }} activeStyle={{fontWeight: 'bold'}}>커뮤니티</NavLink>
        </li>

        {user ? (
          <>
            <li>
              <NavLink to="/login" style={{ textDecoration: "none", color: "black" }}>로그인</NavLink>
            </li>
            <li>
              <NavLink to="/signin" style={{ textDecoration: "none", color: "black" }}>회원가입</NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/" style={{ textDecoration: "none", color: "black" }}>로그아웃</NavLink>
            </li>
            <li>
              <NavbarDropdown />
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
