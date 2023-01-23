import React, { Route, Switch } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Log from "./Log";
import LogBookmark from "./LogBookmark";
import LogDetail from "./LogDetail";

function ConversationLog({}) {
  const SidebarItems = [
    { name: "Log", route: "/conversationLog" },
    { name: "LogBookmark", route: "/conversationLog/bookmarks" },
  ];

  return (
    <>
      <Navbar />
      <hr />

      <Sidebar Items={SidebarItems}/>
      
      <hr />
      <Switch>
        <Route exact path="/conversationLog" component={Log} />
        <Route exact path="/conversationLog/bookmarks" component={LogBookmark} />
        <Route exact path="/conversationLog/logdetail/:log_id" component={LogDetail} />
      </Switch>

    </>
  );
}

export default ConversationLog;
