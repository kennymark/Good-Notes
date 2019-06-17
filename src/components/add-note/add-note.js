import React, { Component } from "react";
import { Link } from "react-router-dom";
import { database, auth } from "firebase";

class Addnote extends Component {
  db = database().ref("notes");

  state = { title: "", text: "" };

  componentDidMount() {
    const user = auth().currentUser
    if (!user) this.props.history.push('/login');
  }

  getContent = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  postNote = e => {
    const { currentUser } = auth()
    this.db.child(currentUser.uid).push({
      title: this.state.title,
      text: this.state.text,
      date: new Date().toDateString()
    });
  };

  render() {
    return (
      <div className="addnote">
        <form action="#" method="post">
          <div>
            <label htmlFor="title" /> <br />
            <input type="text" name="title" placeholder="Title" onChange={this.getContent} />
          </div>
          <div>
            <textarea className="editor" onChange={this.getContent} name='text' />
          </div>
          <div>
            <Link to="/">
              <input type="submit" value="Add Note" className="save" onClick={this.postNote} />
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default Addnote;
