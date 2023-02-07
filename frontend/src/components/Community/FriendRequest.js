import React, { useEffect, useState } from "react";
import axios from "axios";
import RequestList from "./RequestList";
import { Box } from "@mui/material";

const getFriendRequest = async (setUsers) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_HOST}/friend/receive/${sessionStorage.getItem(
        "userId"
      )}`
    );
    if (response.status === 200) {
      // console.log(response);
      setUsers(response.data.recvList);
    } else if (response.status === 204) {
      // console.log(response)
      setUsers([]);
    }
  } catch {}
};

function FriendRequest() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getFriendRequest(setUsers);
  }, []);

  return (
    <>
      <h3>친구신청</h3>
      {users.length > 0 && <RequestList users={users} />}
      {users.length === 0 && (
        <Box
          sx={{
            backgroundColor: "#DDDDDD",
            border: "3px solid #111111",
            position: "relative",
            p: "1.5rem",
          }}
        >
          <p>친구신청이 없습니다.</p>
        </Box>
      )}
    </>
  );
}
export default FriendRequest;
