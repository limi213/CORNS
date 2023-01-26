import React from "react";
import { Link } from "react-router-dom";
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
          <Link to={item.route} key={index}>
            <div>{item.name}</div>
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
