import React, { Component } from 'react';

import Header from './Header.react';
import MainSection from './MainSection.react';
import ContactListStore from '../stores/ContactListStore';


function getContactListState() {
  return {
    contactList: ContactListStore.getAll() || [],
  };
}


export default class ContactApp extends Component {

  constructor(props) {
    super(props);
    this.state = getContactListState();
  }

  componentDidMount() {
    ContactListStore.fetchAll();
    ContactListStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    ContactListStore.removeChangeListener(this.onChange);
  }

  onChange = () => {
    this.setState(getContactListState());
  }

  render() {
    return (
      <div>
        <MainSection
          contactList={this.state.contactList}
        />
      </div>
    );
  }

}
