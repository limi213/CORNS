import React, { Route, Switch, Redirect } from "react-router-dom";
import Navbar from "../../components/GlobalComponents/Navbar";
import Sidebar from "../../components/GlobalComponents/Sidebar";
import Footer from "components/GlobalComponents/Footer";
import ChangeProfile from "./ChangeProfile";
import ChangePassword from "./ChangePassword";
import Withdrawl from "./Withdrawl";

import Grid from "@mui/material/Grid";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function Mypage() {
  const SidebarItems = [
    { name: "회원수정", route: "/mypage/changeProfile" },
    { name: "비밀번호 수정", route: "/mypage/changePassword" },
    { name: "회원탈퇴", route: "/mypage/withDrawl" },
  ];

  return (
    <div>
      <div
        css={css`
          margin: 0 105px;
          height: auto;
          min-height: 100%;
          padding-bottom: 35vh;
        `}
      >
        <Navbar />

        <Grid container spacing={1} sx={{ margin: "64px 0 0 0" }}>
          <Grid item xs={2}>
            <Sidebar Items={SidebarItems} />
          </Grid>
          <Grid item xs={10} sx={{minHeight: "500px"}}>
            <div
              css={css`
                box-sizing: border-box;
                border: 3px solid #111111;
                padding: 0 32px 64px 32px;
              `}
            >
              <Switch>
                <Route
                  exact
                  path="/mypage/changeProfile"
                  component={ChangeProfile}
                />
                <Route
                  exact
                  path="/mypage/changePassword"
                  component={ChangePassword}
                />
                <Route exact path="/mypage/withDrawl" component={Withdrawl} />
                <Redirect to="/NotFound" />
              </Switch>
            </div>
          </Grid>
        </Grid>
      </div>
      <Footer />
    </div>
  );
}

export default Mypage;
