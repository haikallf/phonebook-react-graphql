import React from "react";
import Home from "./pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddNewContact from "./pages/AddNewContact";
import Navbar from "./components/Navbar";
import FavoriteContact from "./pages/FavoriteContact";
import EditContact from "./pages/EditContact";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/edit">
          <EditContact />
        </Route>
        <Route path="/favorite">
          <FavoriteContact />
        </Route>
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
