import React, { Component } from 'react';

import AuthStore from '../stores/AuthStore';
import ContactActions from '../actions/ContactActions';
import ContactListStore from '../stores/ContactListStore';

const ENTER_KEY_CODE = 13;

export default class BaseUrl extends Component {

  constructor(props) {
    super(props);
    this.state = {
      baseUrl: ContactListStore.getBaseUrl()
    };
  }

  onKeyDown = (event) => {
    if (event.keyCode === ENTER_KEY_CODE && event.target.name === 'baseUrl') {
      this.saveBaseUrl();
    }
  }

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  saveBaseUrl = () => {
    ContactActions.saveBaseUrl(this.state.baseUrl);
  }

  render() {
    return (
      <form>
        <div>
          <label>Enter your base url:</label>
          <br />
          <input
            type="text"
            name="baseUrl"
            className="base-url"
            value={this.state.baseUrl}
            onKeyDown={this.onKeyDown}
            onChange={this.onInputChange}
          />
        </div>
        <div>
          <input
            type="button"
            onClick={this.saveBaseUrl}
            value="Save"
          />
        </div>
      </form>
    );
  }
}
