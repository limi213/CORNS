import React from "react";
import { useEffect } from "react";
import UserProfile from "../../components/GlobalComponents/UserProfile";
import { Box, Typography } from "@mui/material";
import useAxios from "auth/useAxios";

function MyProfile() {
  const { data, status, isLoading, sendRequest } = useAxios();
  const userId = sessionStorage.getItem("userId");


  useEffect(() => {
    sendRequest({
      url: `${process.env.REACT_APP_HOST}/user/${userId}`,
    });
  }, []);


  if (!isLoading && status === 200) {    
    const userInfo = data.user;

    return (
      <Box sx={{ border: "3px solid #111", p: "32px 0 200px" }}>
        <Typography variant="h5" sx={{ ml: "32px" }}>
          내 정보
        </Typography>
        <UserProfile user={userInfo} rankingList={userInfo.rank} />
      </Box>
    );
  } else {
    return <p>loading 중...</p>;
  }
}

export default MyProfile;
