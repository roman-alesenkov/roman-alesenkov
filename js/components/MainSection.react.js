import React, { Component, PropTypes } from 'react';

import Contact from './Contact.react';
import { Link } from 'react-router';
import ContactActions from '../actions/ContactActions';
import ContactListStore from '../stores/ContactListStore';
import AuthStore from '../stores/AuthStore';


export default class MainSection extends Component {

  constructor(props) {
    super(props);
  }

  downloadUserList = () => {
    ContactListStore.downloadUserList();
  }

  onCreateNew = () => {
    ContactListStore.clearProfileInfo();
  }

  render() {
    const contactList = this.props.contactList;
    let contacts = [];

    contacts = contactList.map((contact, i) => {
      return (
        <Contact key={contact.id} contact={contact} index={i} />
      );
    });

    return (
      <section id="main">

        <Link className="create-new" onClick={this.onCreateNew} to={'contacts/new'}> Create New </Link>
        <button className="download-button" onClick={this.downloadUserList}>Download user list</button>
        <ul id="contact-list">{contacts}</ul>

      </section>
    );
  }
}

MainSection.propTypes = {
  contactList: PropTypes.array.isRequired,
};
