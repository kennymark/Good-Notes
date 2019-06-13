import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import * as firebase from "firebase";
import Header from "./header/header";



class Main extends Component {

  db = firebase.database().ref("notes")

  state = {
    isMounted: false,
    searchVal: "",
    data: {},
    localnotes: {}
  };

  componentDidMount() {
    const localnotes = localStorage.getItem("notes");
    this.getData(localnotes);
  }

  getData = (localnotes) => {
    this.db.on("value", data => {
      const notes = data.val();
      this.setState({ data: notes });
      this.setState({ localnotes });
      localStorage.setItem("notes", JSON.stringify(notes));
    });
  }

  delete = (note) => {
    const singleNote = firebase.database().ref("notes").child(note);
    singleNote.remove();
  }

  findNotes(query) {
    const notes = document.querySelectorAll(".note");
    notes.forEach(note => {
      if (note.innerText.toLowerCase().includes(query.toLowerCase())) {
        note.style.display = "flex";
      } else {
        note.remove()
      }
    });
  }

  render() {
    var notes = this.state.data;
    var keys = Object.keys(notes);

    return (
      <Fragment>
        <Header findNotes={this.findNotes.bind(this)} />
        <div className="container">
          <div className="main">
            <ul className="categories">
              <li className="active">All</li>
              <li>Projects</li>
              <li>Business</li>
              <li>Personal</li>
              <Link to="/addnote">
                <li>
                  {" "}
                  {/* <i className="ion-ios-plus-outline"></i> */}
                  Add a note
                </li>
              </Link>
            </ul>
            <div className="notes">
              {keys.reverse().map((note, index) => {
                return (
                  <Link
                    to={`/editnote/${note}`}
                    className="singlenote"
                    key={index}>
                    <div className="note" key={note}>
                      <h1 className="title">{String(notes[note].title)}</h1>
                      <p className="content">
                        {notes[note].text.substr(0, 110)} ...
                      </p>
                      <p className="date">{notes[note].date}</p>
                      <p className="date">{notes[note].updatedAt}</p>
                      <i
                        className="ion-ios-trash-outline delete"
                        onClick={() => this.delete(notes[note])}
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default Main;
