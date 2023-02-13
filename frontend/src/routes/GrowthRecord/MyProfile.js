import React from "react";
import { useEffect } from "react";
import UserProfile from "../../components/GlobalComponents/UserProfile";
import { Box, Typography } from "@mui/material";
import useAxios from "auth/useAxios";
// import { useDispatch, useSelector } from "react-redux";

function MyProfile() {
  // const dispatch = useDispatch();
  // const userInfo = useSelector((state) => state.userInfoReducer);
  const { data, status, isLoading, sendRequest } = useAxios();
  const userId = sessionStorage.getItem("userId");
  // useEffect(() => {
  //   dispatch(getUserInfo());
  // }, [dispatch]);
  useEffect(() => {
    sendRequest({
      url: `${process.env.REACT_APP_HOST}/user/${userId}`,
    });
  }, []);

  const rankingList = [
    { type: "sungsil", rank: 80, indicate: 1800 },
    { type: "ddabong", rank: null, indicate: 8 },
    { type: "suda", rank: 67, indicate: 387 },
    { type: "ingi", rank: null, indicate: 4 },
  ];
  if (!isLoading && status === 200) {
    const userInfo = data.user;
    return (
      <Box sx={{ border: "3px solid #111", p: "32px 0 200px" }}>
        <Typography variant="h5" sx={{ ml: "32px" }}>
          내 정보
        </Typography>
        <UserProfile user={userInfo} rank={rankingList} />
      </Box>
    );
  } else {
    return <p>loading 중...</p>;
  }
}

export default MyProfile;
