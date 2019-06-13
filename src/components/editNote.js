import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as firebase from "firebase";

class Editnote extends Component {
  state = {
    title: "",
    content: ""
  };

  componentDidMount() {
    const path = this.props.location.pathname;
    const id = path.toString().substr(10);
    const note = firebase
      .database()
      .ref("notes")
      .child(id);
    note.on("value", data => {
      this.setState({
        title: data.val().title,
        content: data.val().text
      });
    });
  }

  getContent = e => {
    var { target } = e;
    this.setState({ [target.name]: target.value });
  };

  editNote() {
    const path = this.props.location.pathname;
    const id = path.toString().substr(10);
    var singleNote = firebase
      .database()
      .ref("notes")
      .child(id);

    singleNote.update({
      title: this.state.title,
      text: this.state.content,
      date: new Date().toDateString()
    });
  }

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
              onChange={this.getContent}
              value={this.state.title}
            />
          </div>
          <div>
            <textarea
              className="editor"
              name="content"
              onChange={this.getContent}
              value={this.state.content}
            />
          </div>

          <div>
            <Link to="/">
              <input
                type="submit"
                value="Edit Note"
                className="save"
                onClick={this.editNote.bind(this)}
              />
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default Editnote;
