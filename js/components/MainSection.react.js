import React, { Component, PropTypes } from 'react';

import Contact from './Contact.react';
import ContactActions from '../actions/ContactActions';
import ContactListStore from '../stores/ContactListStore';
import AuthStore from '../stores/AuthStore';


export default class MainSection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: ContactListStore.getFilterState(),
      isLogged: AuthStore.isLogged(),
    };
  }

  componentDidMount() {
    AuthStore.addChangeListener(this.onLoggedChange);
  }

  componentWillUnmount() {
    AuthStore.removeChangeListener(this.onLoggedChange);
  }

  onLoggedChange = () => {
    this.setState({
      isLogged: AuthStore.isLogged(),
    });
  }

  onSortAscend = (e) => {
    const name = e.target.name;
    const ascendant = true;
    ContactActions.sortList(name, ascendant);
  }

  onSortDescend = (e) => {
    const name = e.target.name;
    const ascendant = false;
    ContactActions.sortList(name, ascendant);
  }

  onFilterChange = (e) => {
    const currentState = this.state.filter;
    currentState.searchString = e.target.value;
    this.setState({ filter: currentState });
    ContactActions.filterList(e.target.value);
  }

  onFilterByGenderChange = (e) => {
    const checked = e.target.checked;
    const gender = e.target.name;

    const currentState = this.state.filter;
    currentState.gender[gender] = !currentState.gender[gender];

    this.setState({ filter: currentState });

    ContactActions.filterByGenderChange(checked, gender);
  }

  render() {
    const contactList = this.props.contactList;
    let contacts = [];

    contacts = contactList.map((contact) => {
      return (
        <Contact key={contact.email} contact={contact} isLogged={this.state.isLogged} />
      );
    });

    return (
      <section id="main">
        <div className="search-box-wrapper">
          <input
            type="text"
            onChange={this.onFilterChange}
            value={this.state.filter.searchString}
            autoFocus
            placeholder="Search ..."
            className="search-box"
          />
        </div>
        <div className="sort-filter-wrapper">
          <div className="gender-filter-wrapper">
            <div className="gender-filter-label">
              Filter by Gender:
            </div>
            <div className="gender-filter">
              <div className="gender-filter-male">
                <input
                  type="checkbox"
                  name="male"
                  checked={this.state.filter.gender.male}
                  onChange={this.onFilterByGenderChange}
                />
                <label htmlFor="male">Male</label>
              </div>
              <div className="gender-filter-female">
                <input
                  type="checkbox"
                  name="female"
                  checked={this.state.filter.gender.female}
                  onChange={this.onFilterByGenderChange}
                />
                <label htmlFor="female">Female</label>
              </div>
            </div>
          </div>
          <div className="sort-name-wrapper">
            <div className="sort-name-label">
              Sort by Name:
            </div>
            <div className="sort-name">
              <div className="sort-name-ascend">
                <button name="name" onClick={this.onSortAscend}>^</button>
              </div>
              <div className="sort-name-descend">
                <button name="name" onClick={this.onSortDescend}>v</button>
              </div>
            </div>
          </div>
        </div>
        <ul id="contact-list">{contacts}</ul>

      </section>
    );
  }
}

MainSection.propTypes = {
  contactList: PropTypes.array.isRequired,
};
