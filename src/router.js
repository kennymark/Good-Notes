import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from './App';
import Login from './components/login'
import AddNote from './components/addNote'
const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/addnote" component={AddNote} />

    </Switch>

  </Router>
);

export default Routes;