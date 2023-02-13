import React, { Route, Switch, Redirect } from "react-router-dom";
import AuthRoute from "routes/AuthRoute";

import Home from "routes/Home";
import Tutorial from "routes/Tutorial";
import Conversation from "routes/Conversation";
import ConversationLog from "routes/ConversationLog/ConversationLog";
import Community from "routes/Community/Community";
import GrowthRecord from "routes/GrowthRecord/GrowthRecord";
import Login from "routes/LogIn";
import Signin from "routes/SignIn";
import Mypage from "routes/MyPage/MyPage";
import Room from "routes/Room/Room";
import ResultEvolution from "routes/ResultEvolution"
import InvitationList from "routes/InvitationList";
import NotFound from "routes/NotFound";
import TopBtn from "components/GlobalComponents/TopBtn";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/tutorial" component={Tutorial} />
        <Route exact path="/conversation" component={Conversation} />
        <AuthRoute path="/conversationLog" component={ConversationLog} />
        <AuthRoute path="/community" component={Community} />
        <AuthRoute path="/growthRecord" component={GrowthRecord} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signin" component={Signin} />
        <AuthRoute path="/mypage" component={Mypage} />
        <AuthRoute path="/room" component={Room} />
        <AuthRoute exact path="/resultEvolution/:roomNo" component={ResultEvolution} />
        <AuthRoute exact path="/invitationList" component={InvitationList} />
        <Route exact path="/NotFound" component={NotFound} />
        <Redirect to="/NotFound" />
      </Switch>
      <TopBtn />
    </div>
  );
}

export default App;
