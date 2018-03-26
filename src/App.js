import React, { Component, Fragment } from "react";
import Sidebar from "./components/sidebar";
import Main from "./components/main";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Sidebar />
        <Main />
      </Fragment>
    );
  }
}

export default App;
