import React, { Route, Switch } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Log from "./Log";
import LogBookmark from "./LogBookmark";
import LogDetail from "./LogDetail";
import Grid from "@mui/material/Grid";

function ConversationLog({}) {
  const SidebarItems = [
    { name: "Log", route: "/conversationLog" },
    { name: "LogBookmark", route: "/conversationLog/bookmarks" },
  ];

  return (
    <>
      <Navbar />

      <Grid container spacing = {1}>
        <Grid item xs = {2}>
          <Sidebar Items={SidebarItems}/>
        </Grid>
        <Grid item xs = {10}>
          <Switch>
            <Route exact path="/conversationLog" component={Log} />
            <Route exact path="/conversationLog/bookmarks" component={LogBookmark} />
            <Route exact path="/conversationLog/logdetail/:room_no" component={LogDetail} />
          </Switch>
        </Grid>
      </Grid>
      
    </>
  );
}

export default ConversationLog;
