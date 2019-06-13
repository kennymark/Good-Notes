import React, { Component } from "react";
import { Link } from "react-router-dom";
import Login from "../login/login";
import * as firebase from "firebase";

class Addnote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      text: ""
    };
  }
  componentDidMount() {
    var user = localStorage.getItem("user");
    if (!user) {
      return <Login />;
    }
  }
  getTitle = e => {
    var title = e.target.value;
    this.setState({
      title
    });
  };

  getContent = value => {
    var content = value.target.value;
    this.setState({ text: content });
  };

  postNote = e => {
    var ref = firebase.database().ref("notes");
    var date = new Date();
    ref.push({
      title: this.state.title,
      text: this.state.text,
      time: date,
      date: date.toDateString()
    });
  };

  render() {
    return (
      <div className="addnote">
        <form action="#" method="post">
          <div>
            <label htmlFor="title" /> <br />
            <input
              type="text"
              name="title"
              placeholder="Title"
              onChange={this.getTitle}
            />
          </div>
          <div>
            <textarea className="editor" onChange={this.getContent} />
          </div>
          <div>
            <Link to="/">
              <input
                type="submit"
                value="Add Note"
                className="save"
                onClick={this.postNote}
              />
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default Addnote;
