import React, { Route, Switch } from "react-router-dom";
import Navbar from "../../components/GlobalComponents/Navbar";
import Sidebar from "../../components/GlobalComponents/Sidebar";
import Log from "./Log";
import LogBookmark from "./LogBookmark";
import LogDetail from "./LogDetail";
import LogWord from "./LogWord";
import Grid from "@mui/material/Grid";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function ConversationLog({}) {
  const SidebarItems = [
    { name: "쫑알로그", route: "/conversationLog" },
    { name: "즐겨찾기", route: "/conversationLog/bookmarks" },
    { name: "쫑알단어", route: "/conversationLog/words" },
  ];

  return (
    <div
      css={css`
        margin: 0 105px;
      `}
    >
      <Navbar />

      <Grid container spacing={1}>
        <Grid item xs={2}>
          <Sidebar Items={SidebarItems} />
        </Grid>
        <Grid item xs={10}>
          <div
            css={css`
              box-sizing: border-box;
              border: 3px solid #111111;
              padding: 0 32px;
            `}
          >
            <Switch>
              <Route exact path="/conversationLog" component={Log} />
              <Route
                exact
                path="/conversationLog/bookmarks"
                component={LogBookmark}
              />
              <Route
                exact
                path="/conversationLog/logdetail/:room_no"
                component={LogDetail}
              />
              <Route exact path="/conversationLog/words" component={LogWord} />
            </Switch>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default ConversationLog;
