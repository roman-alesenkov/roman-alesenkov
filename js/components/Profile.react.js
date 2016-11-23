import React, { Component } from 'react';

import TextInput from './TextInput.react';
import ContactListStore from '../stores/ContactListStore';
import AuthStore from '../stores/AuthStore';
import ContactActions from '../actions/ContactActions';


export default class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = this.getProfileState();
  }

  componentDidMount() {
    ContactListStore.addChangeListener(this.onChange);
    AuthStore.addChangeListener(this.onLoggedChange);
    ContactListStore.fetchUserByUsername(this.props.params.username);
  }

  componentWillUnmount() {
    ContactListStore.removeChangeListener(this.onChange);
    AuthStore.removeChangeListener(this.onLoggedChange);
  }

  onLoggedChange = () => {
    this.setState({
      isLogged: AuthStore.isLogged(),
    });
  }

  onChange = () => {
    this.setState(this.getProfileState());
  }

  onDoubleClick = () => {
    this.setState({ isEditing: true });
  }

  onSave = (text) => {
    ContactActions.updateText(this.state.profile.email, text);
    this.setState({ isEditing: false });
  }

  getProfileState = () => {
    return {
      profile: ContactListStore.getUserByUsername(
        this.props.params.username
      ) || { name: {}, picture: {}, location: {} },
      isEditing: false,
      isLogged: AuthStore.isLogged(),
    };
  }

  render() {
    let input;

    if (this.state.isEditing && this.state.isLogged) {
      input = (
        <TextInput
          className="edit"
          onSave={this.onSave}
          value={this.state.profile.name.first}
        />
      );
    } else {
      input = (
        <span onDoubleClick={this.onDoubleClick}>{this.state.profile.name.first}</span>
      );
    }

    return (
      <div className="profile-content">

        <div className="first-last-name">
          <h3>
            {input}
            <span> {this.state.profile.name.last}</span>

          </h3>
        </div>

        <img src={this.state.profile.picture.large} alt="" />

        <div className="info-field">
            {this.state.profile.email}
        </div>

        <div className="info-field">
            {this.state.profile.phone}
        </div>

        <div className="info-field">
            {this.state.profile.location.street}
        </div>

        <div className="info-field">
            {this.state.profile.location.city}
        </div>

        <div className="info-field">
            {this.state.profile.location.state}
        </div>

        <div className="info-field">
            {this.state.profile.location.postcode}
        </div>

        <div className="note">Double-click on first name to edit it (only for logged users).</div>

      </div>
    );
  }

}
