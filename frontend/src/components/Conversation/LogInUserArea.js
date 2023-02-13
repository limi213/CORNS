import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import UserCard from "./UserCard";
import UserInfo from "./UserInfo";
import useAxios from "auth/useAxios";
import Grid from "@mui/material/Grid";

function LogInUserArea() {
  const { userId, nickname } = sessionStorage;
  const { data, status, isLoading, sendRequest } = useAxios();

  useEffect(() => {
    sendRequest({
      url: `${process.env.REACT_APP_HOST}/growth/exp/bar/${userId}`,
    });
  }, []);
  if (!isLoading && status === 200) {
    const { levelNo } = data?.level;
    return (
      <Grid container sx={{ marginBottom: "64px" }}>
        <Grid item xs={5} sx={{ pr: "1.5rem" }}>
          <UserCard id={userId} nickname={nickname} level={levelNo} />
        </Grid>
        <Grid item xs={7}>
          <UserInfo />
        </Grid>
      </Grid>
    );
  } else {
    return <p>loading 중...</p>;
  }
}

export default LogInUserArea;
