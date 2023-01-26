import { Route, Switch } from "react-router-dom";
import Navbar from "../../components/GlobalComponents/Navbar";
import Sidebar from "../../components/GlobalComponents/Sidebar";
import Friends from "./Friends";
import Ranking from "./Ranking";
import SearchUser from "./SearchUser";
import Grid from "@mui/material/Grid";

function Community() {
  const SidebarItems = [
    { name: "알맹이랭킹", route: "/community/ranking/sincerity" },
    { name: "유저검색", route: "/community/searchUser" },
    { name: "친구", route: "/community/friends" },
  ];

  return (  
    <>
      <Navbar />

      <Grid container spacing={1}>
        <Grid item xs={2}>
          <Sidebar Items={SidebarItems} />
        </Grid>
        <Grid item xs={10}>
          <Switch>
            <Route exact path="/community/searchUser" component={SearchUser} />
            <Route exact path="/community/friends" component={Friends} />
            <Route path="/community" component={Ranking} />
          </Switch>
        </Grid>
      </Grid>
    </>
  );
}

export default Community;
