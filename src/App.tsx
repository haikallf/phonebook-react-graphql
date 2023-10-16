import React from "react";
import Home from "./pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddNewContact from "./pages/AddNewContact";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/contact">
          <AddNewContact />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
