import React, { Component } from 'react';

import TextInput from './TextInput.react';
import FeedbackActions from '../actions/FeedbackActions';
import ContactUsStore from '../stores/ContactUsStore';

export default class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = this.getContactUsState();
  }

  componentDidMount() {
    ContactUsStore.addChangeListener(this.setContactUsState);
      ContactUsStore.addFormSentListener(this.setContactUsState);
  }

  componentWillUnmount() {
      ContactUsStore.removeChangeListener(this.setContactUsState);
      ContactUsStore.removeFormSentListener(this.setContactUsState);
  }

  onEditableContactUsTextChange = (type, value) => {
    FeedbackActions.updateEditableContactUsText(type, value);
  }

  onSave = () => {
    FeedbackActions.sendForm();
  }

    setContactUsState = () => {
      this.setState(this.getContactUsState);
  }

    getContactUsState = () => {
    return {
      formData: ContactUsStore.getCurrentContactUs() || {},
      contactCreatedMessageIsShown: false
    };
  }

  showContactCreatedMessage = () => {
      this.setState({contactCreatedMessageIsShown : true});
  }

  render() {

    let contactCreatedMessage = <div>The message has been successfully sent!</div>;

    contactCreatedMessage = this.state.contactCreatedMessageIsShown ? contactCreatedMessage : '';

    return (
      <div className="profile-content">

        <div>
              <label>Subject: </label>
               <TextInput
                  className="edit"
                  type="subject"
                  onChange={this.onEditableContactUsTextChange}
                  value={this.state.formData.subject}
                  autoFocus="true"
                />
        </div>

        <div>
              <label>Body: </label>
               <TextInput
                  className="edit"
                  type="body"
                  onChange={this.onEditableContactUsTextChange}
                  value={this.state.formData.body}
                />
        </div>

        <div>
              <label>E-mail: </label>
               <TextInput
                  className="edit"
                  type="from"
                  onChange={this.onEditableContactUsTextChange}
                  value={this.state.formData.from}
                />
        </div>


        <div className="note">Double-click on first name to edit it (only for logged users).</div>

        <button onClick={this.onSave}>SAVE</button>
<br/>
          {contactCreatedMessage}
    <br/>
      </div>
    );
  }

}
