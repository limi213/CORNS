import { Route, Switch, Redirect } from "react-router-dom";
import Navbar from "../../components/GlobalComponents/Navbar";
import Sidebar from "../../components/GlobalComponents/Sidebar";
import MyProfile from "./MyProfile";
import ExperienceDetail from "./ExperienceDetail";
import Indicators from "./Indicators";
import Grid from "@mui/material/Grid";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function GrowthRecord() {
  const SidebarItems = [
    { name: "내정보", route: "/growthRecord/myProfile" },
    { name: "경험치", route: "/growthRecord/experienceDetail" },
    { name: "지표보기", route: "/growthRecord/indicators/weeklyLiner" },
  ];

  return (
    <div
      css={css`
        margin: 0 105px;
      `}
    >
      <Navbar />

      <Grid container spacing={1} sx={{margin: '124px 0 0 0'}}>
        <Grid item xs={2}>
          <Sidebar Items={SidebarItems} />
        </Grid>
        <Grid item xs={10}>
          <Switch>
            <Route exact path="/growthRecord/myProfile" component={MyProfile} />
            <Route
              exact
              path="/growthRecord/experienceDetail"
              component={ExperienceDetail}
            />
            <Route path="/growthRecord/indicators" component={Indicators} />
            <Redirect to ="/NotFound" />
          </Switch>
        </Grid>
      </Grid>
    </div>
  );
}

export default GrowthRecord;
