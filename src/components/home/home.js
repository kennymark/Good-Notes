import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { database, auth } from "firebase";
import Header from "../header/header";



class Main extends Component {
  db = database().ref("notes")
  currUser;

  state = {
    isMounted: false,
    searchVal: "",
    data: {},
    localnotes: {}
  };

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      this.currUser = user
      this.getData()
    });
  }

  getData = () => {
    this.db.on("value", data => {
      const notes = data.val()[this.currUser.uid]
      if (!notes) return;
      this.setState({ data: notes });
    });
  }

  delete = (note) => {
    const singleNote = this.db.child(note);
    singleNote.remove();
  }

  findNotes = (query) => {
    const notes = document.querySelectorAll(".note");
    notes.forEach(note => {
      if (note.innerText.toLowerCase().includes(query.toLowerCase()))
        note.style.display = "flex";
      else
        note.style.display = "none";
    });
  }

  render() {
    const notes = this.state.data;
    const keys = Object.keys(notes).reverse();

    return (
      <Fragment>
        <Header findNotes={this.findNotes} />
        <div className="container">
          <div className="main">
            <ul className="categories">
              <li className="active">All</li>
              <li>Projects</li>
              <li>Business</li>
              <li>Personal</li>
              <li>
                <Link to="/add-note"> Add a note</Link>
              </li>
            </ul>
            <div className="notes">
              {keys.map((note, i) => (
                <span key={i}>
                  <div className="note" >
                    <Link to={`/edit-note/${note}`} className="singlenote">
                      <h1 className="title">{String(notes[note].title)}</h1>
                      <p className="content">
                        {notes[note].text.substr(0, 110)} ...
                      </p>
                      <p className="date">{notes[note].date}</p>
                      <p className="date">{notes[note].updatedAt}</p>
                    </Link>
                  </div>
                  <i className="ion-ios-trash-outline delete"
                    onClick={() => this.delete(note)} />
                </span>
              ))}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default Main;
