import React, { Component } from "react";
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
    this.setState({ [e.target.name]: e.target.value });
  };

  editNote = () => {
    const { title, text, currUser, id } = this.state
    const date = new Date().toDateString()
    const singleNote = database().ref(`notes/${currUser.uid}/${id}`)
    singleNote.update({ title, text, date })
      .then(_ => this.props.history.push('/'));
  }

  render() {
    const { title, text } = this.state
    return (
      <div className="addnote">
        <form action="#" method="post">

          <div>
            <input name="title" placeholder="Title" onChange={this.getContent} value={title} />
          </div>

          <div>
            <textarea className="editor" name="text" onChange={this.getContent} value={text} />
          </div>

          <div>
            <input type="submit" value="Edit Note" className="save" onClick={this.editNote} />
          </div>

        </form>
      </div>
    );
  }
}

export default Editnote;
