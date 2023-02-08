import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFriendRequestListAxios } from "store/reducers/friendListReducer";

import RequestList from "./RequestList";
import { Box } from "@mui/material";

function FriendRequest() {
  const dispatch = useDispatch();
  const users = useSelector(
    (state) => state.friendListReducer.friendRequestList
  );
  const loading = useSelector(
    (state) => state.friendListReducer.isFriendRequestListLoading
  );

  useEffect(() => {
    dispatch(getFriendRequestListAxios());
  }, [dispatch]);

  return (
    <>
      <h3>친구신청</h3>
      <Box
        sx={{
          backgroundColor: "#DDDDDD",
          border: "3px solid #111111",
          position: "relative",
          p: "1.5rem",
          // minHeight: "300px",
        }}
      > 
        {loading && <p>loading 중...</p>}
        {!loading && users.length > 0 && <RequestList users={users} />}
        {!loading && users.length === 0 && <p>친구신청이 없습니다.</p>}
      </Box>
    </>
  );
}
export default FriendRequest;
