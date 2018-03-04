import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as firebase from "firebase";
import Login from "./login";
import config from "./../config";

firebase.initializeApp(config);

class Main extends Component {
  state = {
    isMounted: false,
    notes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    data: {}
  };

  componentDidMount() {
    this.getData();
    var user = localStorage.getItem("user");
    if (!user) {
      window.location = "/login";
    }
  }

  getData() {
    var user = localStorage.getItem("user");
    const db = firebase.database().ref("notes");

    if (user) {
      db.on("value", data => {
        var notes = data.val();
        this.setState({ data: notes });
        localStorage.setItem("notes", JSON.stringify(notes));
      });
    } else {
      return <Login />;
    }
  }

  editNote(note) {
    var singleNote = firebase
      .database()
      .ref("notes")
      .child(note);

    /*   singleNote.update(
      {
        title: 
        text
      }
    ) */
    //console.log(note);
  }

  delete(note) {
    const singleNote = firebase
      .database()
      .ref("notes")
      .child(note);
    singleNote.remove();
  }
  render() {
    var notes = this.state.data;
    var keys = Object.keys(notes);

    return (
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
          {keys.reverse().map(note => {
            return (
              <div
                className="note"
                key={note}
                onClick={() => this.editNote(note)}
              >
                <h1 className="title">{String(notes[note].title)}</h1>
                <p className="content">
                  {notes[note].text.substring(0, 110)} ...
                </p>
                <p className="date">{notes[note].date}</p>
                <p hidden>{note}</p>
                <i
                  className="ion-ios-trash-outline delete"
                  onClick={() => this.delete(note)}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default Main;
