import React from "react";
import { NavLink } from "react-router-dom";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const Sidebar = ({ Items, ...rest }) => {
  return (
    <div
      css={css`
        box-sizing: border-box;
        background: #FFC804;
        border: 3px solid #111111;
        padding: 32px 0 100px 32px;
      `}
    >
      {Items.map((item, index) => {
        return (
          <NavLink to={item.route} key={index}  style={{ textDecoration: "none", color: "black" }} activeStyle={{fontWeight: 'bold'}}>
            <div>{item.name}</div>
          </NavLink>
        );
      })}
    </div>
  );
};

export default Sidebar;
