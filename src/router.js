import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import App from "./App";
import Login from "./components/login/login";
import AddNote from "./components/add-note/add-note";
import EditNote from "./components/edit-note/edit-note";

const user = localStorage.getItem('user');
const Routes = () => (

  <Router>
    <Switch>
      <Route exact path="/" render={() => (
        !user ? (<Redirect to="/login" />)
          : (<App />)
      )} />
      <Route path="/login" component={Login} />
      <Route path="/add-note" component={AddNote} />
      <Route path="/edit-note/:id" component={EditNote} />

    </Switch>
  </Router>
);

export default Routes;
