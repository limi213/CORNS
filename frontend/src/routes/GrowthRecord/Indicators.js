import React from "react"; // 주석추가
import { Route, Switch, Redirect } from "react-router-dom";
import { Box } from "@mui/material";
import Tabmenu from "../../components/GlobalComponents/Tabmenu";

import WeeklyLiner from "./WeeklyLiner";
import SubjectCircle from "./SubjectCircle";
import DailyBar from "./DailyBar";

function Indicators({ location }) {
  const TabMenus = [
    {
      name: "최근 일주일 일별 대화량",
      route: "/growthRecord/indicators/weeklyLiner",
      color: "#FFD704",
    },
    {
      name: "대화 주제 비율",
      route: "/growthRecord/indicators/subjectCircle",
      color: "#FFD704",
    },
    {
      name: "일일 경험치 획득량",
      route: "/growthRecord/indicators/dailyBar",
      color: "#FFD704",
    },
  ];

  return (
    <Box
      sx={{
        border: "3px solid #111",
        p: "10px 32px 32px 32px",
        boxSizing: "border-box",
      }}
    >
      <h2>지표보기</h2>
      <Tabmenu Items={TabMenus} Location={location.pathname} />

      <Switch>
        <Route
          exact
          path="/growthRecord/indicators/weeklyLiner"
          component={WeeklyLiner}
        />
        <Route
          exact
          path="/growthRecord/indicators/subjectCircle"
          component={SubjectCircle}
        />
        <Route
          exact
          path="/growthRecord/indicators/dailyBar"
          component={DailyBar}
        />
        <Redirect to="/NotFound" />
      </Switch>
    </Box>
  );
}

export default Indicators;
