import React, { Fragment } from "react";
import Sidebar from "./components/sidebar";
import Main from "./components/home/home";
import config from './config'
import * as firebase from 'firebase'

firebase.initializeApp(config);

function App() {
  return (
    <Fragment>
      <Sidebar />
      <Main />
    </Fragment>
  )
}

export default App;
