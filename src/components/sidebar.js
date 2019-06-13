import React, { Component } from './node_modules/react';

class Sidebar extends Component {
  render() {
    return (
      <div className='sidebar'>
        <div className="deep"></div>
        <ul className="links">
          <li><i className="ion-grid"></i>Overview</li>
          <li><i className="ion-ios-calendar-outline"></i> Tasks</li>
          <li><i className="ion-document"></i>Documents</li>
          <li><i className="ion-clipboard"></i>Notes</li>
          <li> <i className="ion-stats-bars"></i>Output</li>
          <li> <i className="ion-android-call"></i>Support</li>
        </ul>
      </div>
    )
  }
};

export default Sidebar;
