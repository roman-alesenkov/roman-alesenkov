import React, { Component, PropTypes } from 'react';

import Contact from './Contact.react';
import LimitItem from './LimitItem.react';
import { Link } from 'react-router';
import ContactActions from '../actions/ContactActions';
import ContactListStore from '../stores/ContactListStore';
import AuthStore from '../stores/AuthStore';


export default class MainSection extends Component {

  constructor(props) {
    super(props);
    this.state = this.getMainSectionState();
  }

  componentDidMount() {
    this.setState(this.getMainSectionState);
  }

  getMainSectionState = () => {
    return {
      limitValues: ContactListStore.getLimitValues() || []
    }
  }

  downloadUserList = () => {
    ContactListStore.downloadUserList();
  }

  onCreateNew = () => {
    ContactListStore.clearProfileInfo();
  }

  onLimitChange = (limit) => {
    ContactActions.changeLimit(limit);
  }

  render() {
    const contactList = this.props.contactList;
    let contacts = [];
    let limits = [];


    contacts = contactList.map((contact, i) => {
      return (
        <Contact key={contact.id} contact={contact} index={i} />
      );
    });

    limits = this.state.limitValues.map((limit) => {
      return (
          <LimitItem onLimitChange={this.onLimitChange} key={limit} value={limit} />
      )
    });

    return (
      <section id="main">
        <div className="header">
          <Link className="create-new" onClick={this.onCreateNew} to={'contacts/new'}> Create New </Link>
          <div className="limit">{limits}</div>
        </div>
        <ul id="contact-list">{contacts}</ul>

      </section>
    );
  }
}

MainSection.propTypes = {
  contactList: PropTypes.array.isRequired,
};
