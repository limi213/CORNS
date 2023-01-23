import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ Items, ...rest }) => {
  return (
    <>
      {Items.map((item, index) => {
        return (
          <Link to={item.route} key={index}>
            <div>{item.name}</div>
          </Link>
        );
      })}
    </>
  );
};

export default Sidebar;
