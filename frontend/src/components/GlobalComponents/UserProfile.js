import React from "react";
import UserProfileInfo from "./UserProfileInfo";
import UserProfileRankingCard from "./UserProfileRankingCard";
import { Grid } from "@mui/material";

function UserProfile({ user, rankingList }) {  
  return (
    <>
      <UserProfileInfo basicInfo={user} />
      <Grid container sx={{ p: "0 1.5rem 0 3rem" }}>
        {rankingList.map((item) => {
          return <UserProfileRankingCard rank={item} key={item.rankCd} />;
        })}
      </Grid>
    </>
  );
}

export default UserProfile;
