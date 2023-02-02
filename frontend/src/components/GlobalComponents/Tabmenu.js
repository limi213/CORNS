import React from "react";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";

const Tabmenu = ({ Items, Location, ...rest }) => {
  const gridColumn = `span ${Math.round(12 / Items.length)}`;

  return (
    <Box sx={{ width: "100%", textAlign: "center" }}>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)">
        {Items.map((item, index) => {
          const backgroundColor = Location === item.route ? item.color : null;

          return (
            <Box
              gridColumn={gridColumn}
              key={index}
              sx={{
                display: "grid",
                border: "3px solid #111111",
                backgroundColor: { backgroundColor },
                height: "60px",
                alignItems: "center",
                textSize: '26px',
                margin: "0 10% 0 10%"
              }}
            >
              <NavLink
                to={item.route}
                style={{ textDecoration: "none", color: "black" }}
                activeStyle={{ fontWeight: "bold" }}
              >
                {item.name}
              </NavLink>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Tabmenu;
