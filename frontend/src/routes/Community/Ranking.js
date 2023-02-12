import React, { useState, useEffect } from "react";

import Tabmenu from "components/GlobalComponents/Tabmenu";
import RankingList from "components/GlobalComponents/RankingList";
import RankingTableList from "components/Community/RankingTableList";
import Box from "@mui/material/Box";

function Ranking({ location, history }) {
  const TabMenus = [
    { name: "성실", route: "/community/ranking/sincerity", color: "#FFD704" },
    { name: "따봉", route: "/community/ranking/thumbs", color: "#3C90F2" },
    { name: "수다", route: "/community/ranking/chat", color: "#67C73A" },
    { name: "인기", route: "/community/ranking/popularity", color: "#DDDDDD" },
  ];
  const [type, setType] = useState(1);
  const [unit, setUnit] = useState("");


  // location.pathname: 현재 url
  // 이중에 없으면 404
  useEffect(() => {
    if (location.pathname === "/community/ranking/sincerity") {
      setType(1);
      setUnit("exp");
    } else if (location.pathname === "/community/ranking/thumbs") {
      setType(2);
      setUnit("개");
    } else if (location.pathname === "/community/ranking/chat") {
      setType(3);
      setUnit("분");
    } else if (location.pathname === "/community/ranking/popularity") {
      setType(4);
      setUnit("명");
    } else {
      history.push("/NotFound");
    }
  }, [location.pathname]);

  return (
    <>
      <h2>알맹이 랭킹</h2>

      <Box sx={{ py: "64px" }}>
        <RankingList width={150} /> 
      </Box>

      <Tabmenu Items={TabMenus} Location={location.pathname} />

      {/* 각 랭킹 리스트 */}
      <Box sx={{ border: "3px solid #111111" }} padding="48px 112px" mb="32px">
        <RankingTableList type={type} unit={unit} />
      </Box>
    </>
  );
}

export default Ranking;
