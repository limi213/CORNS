import React, { useEffect } from "react";
import useAxios from "auth/useAxios";

import RankingCard from "./RankingCard";
import { Grid } from "@mui/material";

export default function RankingList({ width }) {
  const { data, status, isLoading, sendRequest } = useAxios();

  useEffect(() => {
    sendRequest({
      url: `${process.env.REACT_APP_HOST}/rank/hof`,
    });
  }, []);

  return (
    <>
      {isLoading && <p>loading중...</p>}
      {!isLoading && status === 200 && (
        <Grid container spacing={1}>
          {data.rankList.map((rankInfo) => {
            return (
              <RankingCard
                key={rankInfo.rankType}
                rankInfo={rankInfo}
                customWidth={width}
              />
            );
          })}
        </Grid>
      )}
    </>
  );
}
