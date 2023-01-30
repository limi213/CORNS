import React from "react";
import UserProfileInfo from "./UserProfileInfo";
import UserProfileRankingCard from "./UserProfileRankingCard";
import { Grid } from "@mui/material";

function UserProfile({ user }) {
  const { basicInfo, rankingList } = user;

  return (
    <>
      <UserProfileInfo basicInfo={basicInfo} />
      <Grid container spacing={1} sx={{ p: "0 48px" }}>
        {rankingList.map((item, index) => {
          return <UserProfileRankingCard ranking={item} key={index} />;
        })}
      </Grid>
    </>
  );
}

export default UserProfile;
