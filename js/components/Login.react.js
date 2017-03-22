import React, { Component } from 'react';

import LoginStore from '../stores/LoginStore';
import LoginActions from '../actions/LoginActions';

const ENTER_KEY_CODE = 13;

export default class BaseUrl extends Component {

  constructor(props) {
    super(props);
  }

  onClick = () => {
    LoginActions.loginWithFacebook();
  }

  render() {
    return (
      <div>
        <button onClick={this.onClick}>
          LOGIN WITH FB
        </button>
      </div>
    );
  }
}
