import React, { Component } from 'react';

import AuthStore from '../stores/AuthStore';


const ENTER_KEY_CODE = 13;

export default class Auth extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLogged: AuthStore.isLogged(),
      login: '',
      password: '',
    };
  }

  componentDidMount() {
    AuthStore.addChangeListener(this.onLoggedChange);
  }

  componentWillUnmount() {
    AuthStore.removeChangeListener(this.onLoggedChange);
  }

  onLoggedChange = () => {
    this.setState({
      isLogged: AuthStore.isLogged(),
      login: '',
      password: '',
    });
  }

  onKeyDown = (event) => {
    if (event.keyCode === ENTER_KEY_CODE && event.target.name === 'password') {
      this.login();
    }
  }

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  login = () => {
    AuthStore.login(this.state.login, this.state.password);
  }

  logout() {
    AuthStore.logout();
  }

  render() {
    const loginForm = (
      <form>
        <div>
          <label>Login:</label>
          <br />
          <input
            type="text"
            name="login"
            value={this.state.login}
            onChange={this.onInputChange}
            autoFocus
          />
        </div>
        <div>
          <label>Password:</label>
          <br />
          <input
            type="text"
            name="password"
            value={this.state.password}
            onKeyDown={this.onKeyDown}
            onChange={this.onInputChange}
          />
        </div>
        <div>
          <input
            type="button"
            onClick={this.login}
            value="Login"
          />
        </div>
      </form>
    );

    const logoutButton = (
      <div>
        <input
          type="button"
          onClick={this.logout}
          value="Logout"
        />
      </div>
    );

    if (this.state.isLogged) {
      return logoutButton;
    } else {
      return loginForm;
    }
  }

}
