import React, { Component } from "react";
import * as firebase from "firebase";

class Login extends Component {
  constructor(props) {
    super(props);
    this.auth = firebase.auth()
    this.email = this.refs.email.value;
    this.password = this.refs.password.value;
    this.state = {
      loggedIn: false,
      error: "",
      success: ""
    };
  }

  signup = e => {
    e.preventDefault();
    this.auth.createUserWithEmailAndPassword(this.email, this.password)
    .then(user => {
        console.log(user);
        this.setState({
          success: "User has been created sucesssfully"
        });
      })
      .catch(err => {
        this.setState({ error: err.message });
        console.log(err.message);
      });
  };

  login = e => {
    e.preventDefault();
    this.auth.signInWithEmailAndPassword(this.email, this.password)
      .then(user => {localStorage.setItem("user", JSON.stringify(user));
        this.setState({loggedIn: true});
        window.location.replace('/')
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });
  };


  render() {
    return (
      <div className="login">
        {this.state.error}
        {this.state.success}
        <form action="#" method="post" onSubmit={this.login}>
          <div>
            <input type="email" ref="email" placeholder="Enter email here" />
          </div>
          <div>
            <input
              type="password"
              ref="password"
              placeholder="Enter password here"
            />
          </div>
          <div>
            <input
              type="submit"
              value="Login"
              className="btn"
              onClick={this.login}
            />

            <input
              type="submit"
              value="Signup"
              className="btn signup"
              onClick={this.signup}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
