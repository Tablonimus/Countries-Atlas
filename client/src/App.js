import "./App.css";

import { Route, Switch } from "react-router-dom"; // a mano

import LandingPage from "./components/LandingPage/LandingPage"; //a mano
import Home from "./components/HomePage/Home";
import CountryDetail from "./components/CountryDetail/CountryDetail";
import CreateActivity from "./components/CreateActivity/CreateActivity";
// import Error404 from "./components/Error404/Error404";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={"/"} component={LandingPage} />
        <Route exact path={"/countries"} component={Home} />
        <Route exact path={"/countries/:id"} component={CountryDetail} />
        <Route exact path={"/activities"} component={CreateActivity} />
        {/* <Route path="*" component={Error404} /> */}
      </Switch>
    </div>
  );
}

export default App;
