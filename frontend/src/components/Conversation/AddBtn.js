import React from "react";

import Tooltip from "@mui/material/Tooltip";
import { PlusCircleFill } from "react-bootstrap-icons";

function AddBtn() {
  return (
    <>
      <Tooltip title="쫑알룸 만들기" placement="top-start">
        <PlusCircleFill
          style={{
            fontSize: "64px",
            color: "#ffa903",
            position: "fixed",
            bottom: "40px",
            right: "105px",
            borderRadius: "40px",
            border: "3px solid #111",
            boxShadow: "4px 4px 4px rgb(0,0,0,.5)",
            cursor: "pointer",
          }}
        />
      </Tooltip>
    </>
  );
}

export default AddBtn;
