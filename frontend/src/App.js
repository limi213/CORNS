import React, { Route, Switch } from "react-router-dom";
import Home from "./routes/Home";
import Conversation from "./routes/Conversation";
import ConversationLog from "./routes/ConversationLog/ConversationLog";
import Community from "./routes/Community";
import GrowthRecord from "./routes/GrowthRecord/GrowthRecord";
import Login from "./routes/LogIn";
import Signin from "./routes/SignIn";
import Mypage from "./routes/Mypage";
// import FriendList from "./pages/FriendList";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function App() {

  return (
    <div
      className="App"
      css={css`
        margin: 0 105px;
      `}
    >
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/conversation" component={Conversation} />
        <Route path="/conversationLog" component={ConversationLog} />
        <Route path="/community" component={Community} />
        <Route path="/growthRecord" component={GrowthRecord} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signin" component={Signin} />
        <Route path="/mypage" component={Mypage} />
        {/* <Route exact path="/friend-list" component={FriendList} /> */}
      </Switch>
    </div>
  );
}

export default App;
