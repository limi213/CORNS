import React from "react";
import RequestCard from "./RequestCard";
import Box from "@mui/material/Box";

function RequestList({ users }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "row", padding: "24px", backgroundColor: "#DDDDDD", border: "3px solid #111111"}}>
      {users.map((item, index) => {
        return <RequestCard user={item} key={index} />;
      })}
    </Box>
  );
}

export default RequestList;
