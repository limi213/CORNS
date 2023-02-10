import React, { useState, useEffect } from "react";
import { Switch, Redirect } from "react-router-dom";

import Tabmenu from "../../components/GlobalComponents/Tabmenu";

import RankingList from "../../components/GlobalComponents/RankingList";
import RankingTableList from "../../components/Community/RankingTableList";

import Box from "@mui/material/Box";

function Ranking({ location, history }) {
  const TabMenus = [
    { name: "성실", route: "/community/ranking/sincerity", color: "#FFD704" },
    { name: "따봉", route: "/community/ranking/thumbs", color: "#3C90F2" },
    { name: "수다", route: "/community/ranking/chat", color: "#67C73A" },
    { name: "인기", route: "/community/ranking/popularity", color: "#DDDDDD" },
  ];

  // dummy data (갱신 체크용)
  const rankingSincerity = [
    {
      img_url:
        "https://i.pinimg.com/564x/af/7b/de/af7bde50489a2cb932a98741b877704b.jpg",
      nickname: "Sincerity1",
      user_id: 1000,
      level: 10,
      value: 10000,
    },
    {
      img_url:
        "https://i.pinimg.com/564x/af/7b/de/af7bde50489a2cb932a98741b877704b.jpg",
      nickname: "Sincerity2",
      user_id: 1001,
      level: 100,
      value: 900,
    },
    {
      img_url:
        "https://i.pinimg.com/564x/af/7b/de/af7bde50489a2cb932a98741b877704b.jpg",
      nickname: "Sincerity3",
      user_id: 1001,
      level: 100,
      value: 900,
    },
    {
      img_url:
        "https://i.pinimg.com/564x/af/7b/de/af7bde50489a2cb932a98741b877704b.jpg",
      nickname: "Sincerity4",
      user_id: 1001,
      level: 100,
      value: 900,
    },
    {
      img_url:
        "https://i.pinimg.com/564x/af/7b/de/af7bde50489a2cb932a98741b877704b.jpg",
      nickname: "Sincerity5",
      user_id: 1001,
      level: 100,
      value: 900,
    },
  ];
  const rankingThumbs = [
    {
      img_url:
        "https://i.pinimg.com/564x/af/7b/de/af7bde50489a2cb932a98741b877704b.jpg",
      nickname: "Thumbs1",
      user_id: 1000,
      level: 10,
      value: 10000,
    },
    {
      img_url:
        "https://i.pinimg.com/564x/af/7b/de/af7bde50489a2cb932a98741b877704b.jpg",
      nickname: "Thumbs2",
      user_id: 1001,
      level: 100,
      value: 900,
    },
    {
      img_url:
        "https://i.pinimg.com/564x/af/7b/de/af7bde50489a2cb932a98741b877704b.jpg",
      nickname: "Thumbs3",
      user_id: 1001,
      level: 100,
      value: 900,
    },
    {
      img_url:
        "https://i.pinimg.com/564x/af/7b/de/af7bde50489a2cb932a98741b877704b.jpg",
      nickname: "Thumbs4",
      user_id: 1001,
      level: 100,
      value: 900,
    },
    {
      img_url:
        "https://i.pinimg.com/564x/af/7b/de/af7bde50489a2cb932a98741b877704b.jpg",
      nickname: "Thumbs5",
      user_id: 1001,
      level: 100,
      value: 900,
    },
  ];
  const rankingChat = [
    {
      img_url:
        "https://i.pinimg.com/564x/af/7b/de/af7bde50489a2cb932a98741b877704b.jpg",
      nickname: "Chat1",
      user_id: 1000,
      level: 10,
      value: 10000,
    },
    {
      img_url:
        "https://i.pinimg.com/564x/af/7b/de/af7bde50489a2cb932a98741b877704b.jpg",
      nickname: "Chat2",
      user_id: 1001,
      level: 100,
      value: 900,
    },
    {
      img_url:
        "https://i.pinimg.com/564x/af/7b/de/af7bde50489a2cb932a98741b877704b.jpg",
      nickname: "Chat3",
      user_id: 1001,
      level: 100,
      value: 900,
    },
    {
      img_url:
        "https://i.pinimg.com/564x/af/7b/de/af7bde50489a2cb932a98741b877704b.jpg",
      nickname: "Chat4",
      user_id: 1001,
      level: 100,
      value: 900,
    },
    {
      img_url:
        "https://i.pinimg.com/564x/af/7b/de/af7bde50489a2cb932a98741b877704b.jpg",
      nickname: "Chat5",
      user_id: 1001,
      level: 100,
      value: 900,
    },
  ];
  const rankingPopularity = [
    {
      img_url:
        "https://i.pinimg.com/564x/af/7b/de/af7bde50489a2cb932a98741b877704b.jpg",
      nickname: "Popularity1",
      user_id: 1000,
      level: 10,
      value: 10000,
    },
    {
      img_url:
        "https://i.pinimg.com/564x/af/7b/de/af7bde50489a2cb932a98741b877704b.jpg",
      nickname: "Popularity2",
      user_id: 1001,
      level: 100,
      value: 900,
    },
    {
      img_url:
        "https://i.pinimg.com/564x/af/7b/de/af7bde50489a2cb932a98741b877704b.jpg",
      nickname: "Popularity3",
      user_id: 1001,
      level: 100,
      value: 900,
    },
    {
      img_url:
        "https://i.pinimg.com/564x/af/7b/de/af7bde50489a2cb932a98741b877704b.jpg",
      nickname: "Popularity4",
      user_id: 1001,
      level: 100,
      value: 900,
    },
    {
      img_url:
        "https://i.pinimg.com/564x/af/7b/de/af7bde50489a2cb932a98741b877704b.jpg",
      nickname: "Popularity5",
      user_id: 1001,
      level: 100,
      value: 900,
    },
  ];

  // location.pathname: 현재 url
  // -> 이거 따라서 api 다르게 보내고 rankingList 갱신
  // 이중에 없으면 404
  const [rankingList, setRankingList] = useState([]);
  useEffect(() => {
    if (location.pathname === "/community/ranking/sincerity") {
      setRankingList(rankingSincerity);
    } else if (location.pathname === "/community/ranking/thumbs") {
      setRankingList(rankingThumbs);
    } else if (location.pathname === "/community/ranking/chat") {
      setRankingList(rankingChat);
    } else if (location.pathname === "/community/ranking/popularity") {
      setRankingList(rankingPopularity);
    } else {
      history.push("/NotFound");
    }
  }, [location.pathname]);

  return (
    <>
      <h2>알맹이 랭킹</h2>

      {/* 1-4등 데이터 prop */}
      <Box sx={{ py: "64px" }}>
        <RankingList width={150} />
      </Box>

      <Tabmenu Items={TabMenus} Location={location.pathname} />
      {/* 5등 - 데이터 prop */}
      <Box sx={{ border: "3px solid #111111" }} padding="48px 112px" mb="32px">
        <RankingTableList items={rankingList} />
      </Box>
    </>
  );
}

export default Ranking;
