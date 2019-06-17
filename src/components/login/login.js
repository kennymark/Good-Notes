import React, { Component } from "react";
import { auth } from "firebase";
class Login extends Component {

  state = {
    error: "",
    success: "",
    email: '', password: ''
  }

  signup = e => {
    e.preventDefault();
    const { email, password } = this.state
    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(user => this.setState({ msg: "User has been created sucesssfully" }))
      .catch(err => this.setState({ msg: err.message }));
  };

  login = e => {
    e.preventDefault();
    const { email, password } = this.state
    auth().signInWithEmailAndPassword(email, password)
      .then(user => this.props.history.push(`/`))
      .catch(err => this.setState({ msg: err.message }));
  };

  setUser = (e) => {
    console.dir(e.target)
    this.setState({ [e.target.name]: e.target.value })
  }


  render() {
    return (
      <div className="login">
        {this.state.msg}
        <form action="#" method="post" onSubmit={this.login}>
          <div>
            <input type="email" name="email" placeholder="Enter email here" onChange={this.setUser} />
          </div>
          <div>
            <input type="password" name="password" placeholder="Enter password here" onChange={this.setUser} />
          </div>
          <div>
            <input type="submit" value="Login" className="btn" onClick={this.login} />
            <input type="submit" value="Signup" className="btn signup" onClick={this.signup} />
          </div>
        </form>
      </div>
    );
  }
}

export default Login;