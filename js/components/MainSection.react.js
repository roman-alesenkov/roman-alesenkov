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
    ContactListStore.addChangeListener(this.setMainSectionState);
  }

  componentWillUnmount() {
    ContactListStore.removeChangeListener(this.setMainSectionState);
  }

  setMainSectionState = () => {
    this.setState(this.getMainSectionState);
  }

  getMainSectionState = () => {
    return {
      limitValues: ContactListStore.getLimitValues() || [],
      countAll: ContactListStore.getCountAll() || 0,
      limit: ContactListStore.getLimit() || 0,
      page: ContactListStore.getPage() || 1
    }
  }

  onCreateNew = () => {
    ContactListStore.clearProfileInfo();
  }

  onLimitChange = (limit) => {
    ContactActions.changeLimit(limit);
  }

  onPageChange = (page) => {
    ContactActions.changePage(page);
  }

  render() {
    const contactList = this.props.contactList;
    let contacts = [];
    let limits = [];
    let pages = [];
    let numberOfPages = Math.ceil(this.state.countAll / this.state.limit);
    let pagesValues = Array(numberOfPages).fill().map((e,i)=>i+1);

    contacts = contactList.map((contact, i) => {
      let index = (this.state.page - 1) * this.state.limit + i;
      return (
        <Contact key={contact.id} contact={contact} index={index} />
      );
    });

    limits = this.state.limitValues.map((limit) => {
      let className = limit === this.state.limit ? 'active' : '';
      return (
          <LimitItem onLimitChange={this.onLimitChange} key={limit} value={limit} className={className} />
      )
    });

    pages = pagesValues.map((page) => {
      let className = page === this.state.page ? 'active' : '';
      return (
          <LimitItem onLimitChange={this.onPageChange} key={page} value={page} className={className} />
      )
    });

    return (
      <section id="main">
        <Link className="create-new" onClick={this.onCreateNew} to={'contacts/new'}> Create New </Link>
        <div className="header">

        <div className="found-records"> Found {this.state.countAll} records.</div>
          <span>
          Records per page: <span className="limit">{limits}</span>
            </span>
        </div>
        <ul id="contact-list">{contacts}</ul>
        <div className="pagination">{pages}</div>

      </section>
    );
  }
}

MainSection.propTypes = {
  contactList: PropTypes.array.isRequired,
};
