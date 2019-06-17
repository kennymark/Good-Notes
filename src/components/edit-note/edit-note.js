import React, { Component } from "react";
import { Link } from "react-router-dom";
import { database, auth } from "firebase";

class Editnote extends Component {
  db = database().ref("notes")

  state = {
    title: "",
    text: "",
    currUser: '',
    id: this.props.match.params.id
  };

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      const { id } = this.state
      this.setState({ currUser: user })
      this.db.on("value", data => {
        const { title, text } = data.val()[user.uid][id]
        this.setState({ title, text })
      });
    });
  }

  getContent = e => {
    const { target } = e;
    this.setState({ [target.name]: target.value });
  };


  editNote = () => {
    const { title, text, currUser, id } = this.state
    const singleNote = this.db.child(currUser.uid)[id];
    singleNote.update({
      title, text,
      date: new Date().toDateString()
    });
  }

  render() {
    return (
      <div className="addnote">
        <form action="#" method="post">
          <div>
            <label htmlFor="title" /> <br />
            <input type="text" name="title" placeholder="Title"
              onChange={this.getContent} value={this.state.title} />
          </div>

          <div>
            <textarea className="editor" sname="text"
              onChange={this.getContent} value={this.state.text} />
          </div>

          <div>
            <Link to="/">
              <input type="submit" value="Edit Note"
                className="save" onClick={this.editNote} />
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default Editnote;
