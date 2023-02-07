import React from "react";
import UserProfileInfo from "./UserProfileInfo";
import UserProfileRankingCard from "./UserProfileRankingCard";
import { Grid } from "@mui/material";

function UserProfile({ user, rank }) {
  return (
    <>
      <UserProfileInfo basicInfo={user} />
      <Grid container sx={{ p: "0 1.5rem 0 3rem" }}>
        {rank.map((item, index) => {
          return <UserProfileRankingCard ranking={item} key={index} />;
        })}
      </Grid>
    </>
  );
}

export default UserProfile;
