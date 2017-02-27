import React, { Component } from 'react';

import TextInput from './TextInput.react';
import RadioInput from './RadioInput.react';
import ContactListStore from '../stores/ContactListStore';
import ContactActions from '../actions/ContactActions';


export default class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = this.getProfileState();
  }

  componentDidMount() {
    ContactListStore.addChangeListener(this.setProfileState);
    ContactListStore.fetchUserById(this.props.params.id);
  }

  componentWillUnmount() {
    ContactListStore.removeChangeListener(this.setProfileState);
  }

  onEditableProfileTextChange = (type, value) => {
    ContactActions.updateEditableProfileText(type, value);
  }

  onSave = () => {
    ContactActions.saveProfile();
  }

  setProfileState = () => {
      this.setState(this.getProfileState);
  }

  getProfileState = () => {
    return {
      profile: ContactListStore.getCurrentProfile() || {}
    };
  }

  render() {

    return (
      <div className="profile-content">

        <div>
              <label>First Name: </label>
               <TextInput
                  className="edit"
                  type="firstName"
                  onChange={this.onEditableProfileTextChange}
                  value={this.state.profile.firstName}
                  autoFocus="true"
                />

        </div>

          <div>
              <label>Last Name: </label>
              <TextInput
                  className="edit"
                  type="lastName"
                  onChange={this.onEditableProfileTextChange}
                  value={this.state.profile.lastName}
              />
        </div>

          <div>
              <label>Age: </label>
              <TextInput
                  className="edit"
                  type="age"
                  onChange={this.onEditableProfileTextChange}
                  value={this.state.profile.age}
              />
          </div>

          <div>
              <label>Income in $: </label>
              <TextInput
                  className="edit"
                  type="income"
                  onChange={this.onEditableProfileTextChange}
                  value={this.state.profile.income}
              />
          </div>

          <div>
              <label>city: </label>
              <TextInput
                  className="edit"
                  type="city"
                  onChange={this.onEditableProfileTextChange}
                  value={this.state.profile.city}
              />
          </div>

          <div>
              <label>sex: </label>
              <RadioInput
                  className="edit"
                  type="sex"
                  onChange={this.onEditableProfileTextChange}
                  value={this.state.profile.sex}
              />
          </div>

        <div className="note">Double-click on first name to edit it (only for logged users).</div>

        <button onClick={this.onSave}>SAVE</button>
      </div>
    );
  }

}
