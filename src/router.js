import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import Login from "./components/login";
import AddNote from "./components/addNote";
import EditNote from "./components/editNote";
import Header from "./components/header"

const Routes = () => (
  <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/addnote" component={AddNote} />
        <Route path="/editnote/:noteid" component={EditNote} />

      </Switch>
  </Router>
);

export default Routes;
