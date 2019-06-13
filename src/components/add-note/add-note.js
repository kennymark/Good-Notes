import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as firebase from "firebase";

class Addnote extends Component {
  db = firebase.database().ref("notes");

  state = { title: "", text: "" };

  componentDidMount() {
    const user = localStorage.getItem("user");
    if (!user) this.props.history.push('/login');
  }

  getTitle = e => {
    var title = e.target.value;
    this.setState({ title });
  };

  getContent = value => {
    const content = value.target.value;
    this.setState({ text: content });
  };

  postNote = e => {
    this.db.push({
      title: this.state.title,
      text: this.state.text,
      time: new Date(),
      date: new Date().toDateString()
    });
  };

  render() {
    return (
      <div className="addnote">
        <form action="#" method="post">
          <div>
            <label htmlFor="title" /> <br />
            <input type="text" name="title" placeholder="Title" onChange={this.getTitle} />
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
