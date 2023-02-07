import React from "react";
import { useEffect } from "react";
import UserProfile from "../../components/GlobalComponents/UserProfile";
import { Box, Typography } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "store/reducers/userInfoReducer";

function MyProfile() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfoReducer);

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  const rankingList = [
    { type: "sungsil", rank: 80, indicate: 1800 },
    { type: "ddabong", rank: null, indicate: 8 },
    { type: "suda", rank: 67, indicate: 387 },
    { type: "ingi", rank: null, indicate: 4 },
  ];

  return (
    <Box sx={{ border: "3px solid #111", p: "32px 0 200px" }}>
      <Typography variant="h5" sx={{ ml: "32px" }}>
        내 정보
      </Typography>
      <UserProfile user={userInfo} rank={rankingList} />
    </Box>
  );
}

export default MyProfile;
