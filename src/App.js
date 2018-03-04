import React, { Component } from "react";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import Main from "./components/main";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Sidebar />
        <Header />
        <div className="container">
          <Main />
        </div>
      </div>
    );
  }
}

export default App;
