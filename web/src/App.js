import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CradTrips from "./pages/Trips";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path={["/", "/trips"]} component={CradTrips} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
