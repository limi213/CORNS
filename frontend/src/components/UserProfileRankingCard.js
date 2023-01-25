import React from "react";

function UserProfileRankingCard({ ranking }) {
  const { type, rank, indicate } = ranking;


  return (
    <div>
      <p>{type}</p>
      <p>{rank}위</p>
      <p>{indicate}</p>
    </div>
  );
}

export default UserProfileRankingCard;
