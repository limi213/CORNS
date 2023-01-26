import React, {useState, useEffect} from "react";
import Tabmenu from "../../components/GlobalComponents/Tabmenu";
import RankingList from "../../components/Community/RankingList";
import Box from "@mui/material/Box";

function Ranking({ location }) {
  const TabMenus = [
    { name: "성실", route: "/community/ranking/sincerity", color: "#FFD704" },
    { name: "따봉", route: "/community/ranking/thumbs", color: "#3C90F2" },
    { name: "수다", route: "/community/ranking/chat", color: "#67C73A" },
    { name: "인기", route: "/community/ranking/popularity", color: "#DDDDDD" },
  ];


  // dummy data (갱신 체크용)
  const rankingSincerity = [
    {
      img_url: "",
      nickname: "Sincerity1",
      user_id: 1000,
      level: 10,
      value: 10000,
    },
    {
      img_url: "",
      nickname: "Sincerity2",
      user_id: 1001,
      level: 100,
      value: 900,
    },
    {
      img_url: "",
      nickname: "Sincerity3",
      user_id: 1001,
      level: 100,
      value: 900,
    },
    {
      img_url: "",
      nickname: "Sincerity4",
      user_id: 1001,
      level: 100,
      value: 900,
    },
    {
      img_url: "",
      nickname: "Sincerity5",
      user_id: 1001,
      level: 100,
      value: 900,
    },
  ];
  const rankingThumbs = [
    {
      img_url: "",
      nickname: "Thumbs1",
      user_id: 1000,
      level: 10,
      value: 10000,
    },
    {
      img_url: "",
      nickname: "Thumbs2",
      user_id: 1001,
      level: 100,
      value: 900,
    },
    {
      img_url: "",
      nickname: "Thumbs3",
      user_id: 1001,
      level: 100,
      value: 900,
    },
    {
      img_url: "",
      nickname: "Thumbs4",
      user_id: 1001,
      level: 100,
      value: 900,
    },
    {
      img_url: "",
      nickname: "Thumbs5",
      user_id: 1001,
      level: 100,
      value: 900,
    },
  ];
  const rankingChat = [
    {
      img_url: "",
      nickname: "Chat1",
      user_id: 1000,
      level: 10,
      value: 10000,
    },
    {
      img_url: "",
      nickname: "Chat2",
      user_id: 1001,
      level: 100,
      value: 900,
    },
    {
      img_url: "",
      nickname: "Chat3",
      user_id: 1001,
      level: 100,
      value: 900,
    },
    {
      img_url: "",
      nickname: "Chat4",
      user_id: 1001,
      level: 100,
      value: 900,
    },
    {
      img_url: "",
      nickname: "Chat5",
      user_id: 1001,
      level: 100,
      value: 900,
    },
  ];
  const rankingPopularity = [
    {
      img_url: "",
      nickname: "Popularity1",
      user_id: 1000,
      level: 10,
      value: 10000,
    },
    {
      img_url: "",
      nickname: "Popularity2",
      user_id: 1001,
      level: 100,
      value: 900,
    },
    {
      img_url: "",
      nickname: "Popularity3",
      user_id: 1001,
      level: 100,
      value: 900,
    },
    {
      img_url: "",
      nickname: "Popularity4",
      user_id: 1001,
      level: 100,
      value: 900,
    },
    {
      img_url: "",
      nickname: "Popularity5",
      user_id: 1001,
      level: 100,
      value: 900,
    },
  ];

  // location.pathname: 현재 url -> 이거 따라서 api 다르게 보내고 rankingList 갱신
  const [rankingList, setRankingList] = useState([])
  useEffect(() => {
    if (location.pathname === "/community/ranking/sincerity") {
      setRankingList(rankingSincerity);
    } else if (location.pathname === "/community/ranking/thumbs") {
      setRankingList(rankingThumbs);
    } else if (location.pathname === "/community/ranking/chat") {
      setRankingList(rankingChat);
    } else if (location.pathname === "/community/ranking/popularity") {
      setRankingList(rankingPopularity);
    }
  }, [location.pathname])


  return (
    <>
      <h2>알맹이 랭킹</h2>
      <Tabmenu Items={TabMenus} Location={location.pathname} />

      <Box sx={{border: '3px solid #111111'}}>
        <RankingList items={rankingList}/>
      </Box>
    </>
  );
}

export default Ranking;
