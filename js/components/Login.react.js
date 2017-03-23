import React, { Component } from 'react';

import LoginStore from '../stores/LoginStore';
import LoginActions from '../actions/LoginActions';

const ENTER_KEY_CODE = 13;

export default class BaseUrl extends Component {

  constructor(props) {
    super(props);
    this.state = this.getLoginState();
  }

  componentDidMount() {
    LoginStore.addChangeListener(this.setLoginState);
    LoginStore.fetchCurrentUser();
  }

  componentWillUnmount() {
    LoginStore.removeChangeListener(this.setLoginState);
  }

  setLoginState = () => {
    this.setState(this.getLoginState);
  }

  getLoginState = () => {
    return {
      currentUser: LoginStore.getCurrentUser() || {},
      isLogged: LoginStore.isLogged() || false
    };
  }

  onClick = () => {
    LoginActions.loginWithFacebook();
  }

  render() {

    if (this.state.isLogged) {
      return (
          <div>
            {this.state.currentUser.name}
          </div>
      );
    } else {
      return (
          <div>
            <button onClick={this.onClick}>
              LOGIN WITH FB
            </button>
          </div>
      );
    }

  }
}
