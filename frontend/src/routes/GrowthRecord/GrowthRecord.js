import {Route, Switch} from 'react-router-dom'
import Navbar from "../../components/GlobalComponents/Navbar";
import Sidebar from "../../components/GlobalComponents/Sidebar";
import MyProfile from './MyProfile'
import ExperienceDetail from './ExperienceDetail';
import Indicators from './Indicators';
import Grid from "@mui/material/Grid";

function GrowthRecord() {
  const SidebarItems = [
    { name: "내정보", route: "/growthRecord" },
    { name: "경험치", route: "/growthRecord/experienceDetail" },
    { name: "지표보기", route: "/growthRecord/indicators/weeklyLiner" },
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
            <Route exact path="/growthRecord" component={MyProfile} />
            <Route exact path="/growthRecord/experienceDetail" component={ExperienceDetail} />
            <Route path="/growthRecord/indicators" component={Indicators} />
          </Switch>
        </Grid>
      </Grid>

    </>
  );
}

export default GrowthRecord;
