import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/Navbar";
import ThingsDemo from "./things/ThingsDemo";
import { Container } from "semantic-ui-react";
import Register from "./components/Register";
import Login from "./components/Login";
import FetchUser from "./components/FetchUser";
import Available from "./components/Available";
import MyPag from "./components/MyPag";
import ProtecedRoute from "./components/ProtectedRoute";
import Cities from "./components/Cities";
import FindHomes from "./components/FindHomes";
import CityCost from "./components/CityCost";

// anything in fetchuser will be hidden while that checkuser function is running

function App() {
  return (
    <div>
      <NavBar />

      <Container>
        <FetchUser>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/available" component={Available} />
            <Route exact path="/mypag" component={MyPag} />
            <Route exact path="/cities" component={Cities} />
            <Route exact path="/findHomes" component={FindHomes} />
            <Route exact path="/cityCost" component={CityCost} />

            <ProtecedRoute exact path="/thingsDemo" component={ThingsDemo} />
          </Switch>
        </FetchUser>
      </Container>
    </div>
  );
}

export default App;
