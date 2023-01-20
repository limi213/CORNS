import React, { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Conversation from "./pages/Conversation";
import ConversationLog from "./pages/ConversationLog";
import Community from "./pages/Community";
import GrowthRecord from "./pages/GrowthRecord";
import Login from "./pages/LogIn";
import Signin from "./pages/SignIn";
import Mypage from "./pages/Mypage";
import FriendList from "./pages/FriendList";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <p>CORNS의 첫페이지 입니다!!</p>
      </header> */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/conversation" component={Conversation} />
        <Route exact path="/conversationLog" component={ConversationLog} />
        <Route exact path="/community" component={Community} />
        <Route exact path="/growthRecord" component={GrowthRecord} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/mypage" component={Mypage} />
        <Route exact path="/friend-list" component={FriendList} />
      </Switch>
    </div>
  );
}

export default App;
