import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import ContactConstants from '../constants/ContactConstants';
import assign from 'object-assign';
import $ from 'jquery';


const CHANGE_EVENT = 'change';
const BASE_URL = 'https://api.randomuser.me/';

let contactList = [];
let profile = null;

let searchString = '';
let sortCriteria = {
  name: null,
  ascendant: null,
};

let gender = {
  male: false,
  female: false,
};

function filter(contactList) {
  let filteredList = contactList;

  //  filter by searchString
  const SEARCH_FILTERS = [['name', 'first'], ['name', 'last'], 'email', ['location', 'city']];
  if (searchString.length > 0) {
    let filteredBySearch = [];

    filteredList.forEach((filteredItem) => {
      SEARCH_FILTERS.forEach((searchFilter) => {
        let filteredItemProperty;
        if (Array.isArray(searchFilter)) {
          filteredItemProperty = filteredItem[searchFilter[0]][searchFilter[1]];
        } else {
          filteredItemProperty = filteredItem[searchFilter];
        }
        if (filteredItemProperty.indexOf(searchString) !== -1) {
          filteredBySearch.push(filteredItem);
        }
      });
    });

    filteredList = filteredBySearch;
  }

  //  filter by gender

  if (gender.male !== gender.female) {
    if (gender.male) {
      filteredList = filteredList.filter((contact) => {
        return contact.gender === 'male';
      });
    } else {
      filteredList = filteredList.filter((contact) => {
        return contact.gender === 'female';
      });
    }
  }

  return filteredList;
}

function sort(listOfContacts) {
  let sortedList = listOfContacts;

  if (sortCriteria.name === 'name') {
    if (sortCriteria.ascendant) {
      sortedList = sortedList.sort((a, b) => { return (a.email > b.email) ? 1 : ((b.email > a.email) ? -1 : 0); } );
    } else {
      sortedList = sortedList.sort((a, b) => { return (a.email < b.email) ? 1 : ((b.email < a.email) ? -1 : 0); } );
    }
  }

  return sortedList;
}

function destroy(email) {
  let updatedContactList = [];

  contactList.forEach((contact) => {
    if (contact.email !== email) {
      updatedContactList.push(contact);
    }
  });

  contactList = updatedContactList;
}

function updateByEmail(email, text) {
  if (contactList.length) {
    let updatedContactList = [];

    contactList.forEach((contact) => {
      if (contact.email === email) {
        contact.name.first = text;
      }
      updatedContactList.push(contact);
    });

    contactList = updatedContactList;
  } else {
    profile.name.first = text;
  }
}

const ContactListStore = assign({}, EventEmitter.prototype, {

  getAll() {
    return sort(filter(contactList));
  },

  fetchAll() {
    if (contactList.length) {
      return this.getAll();
    } else {
      $.ajax({
        url: `${BASE_URL}?results=20&inc=login,name,gender,email,location,picture,phone`,
        dataType: 'json',
        success: function (data) {
          contactList = data.results;
          this.emit(CHANGE_EVENT);
        }.bind(this)
      });
    }
  },

  getUserByUsername(username) {
    contactList.forEach((contact) => {
      if (contact.login.username === username) {
        profile = contact;
      }
    });
    return profile;
  },

  fetchUserByUsername() {
    if (profile) {
      return profile;
    } else {
      $.ajax({
        url: `${BASE_URL}?results=1&inc=login,name,gender,email,location,picture,phone`,
        dataType: 'json',
        success: function (data) {
          profile = data.results[0];
          this.emit(CHANGE_EVENT);
        }.bind(this),
      });
    }
  },

  getFilterState() {
    return {
      gender,
      searchString,
    };
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
});

AppDispatcher.register((action) => {
  switch (action.actionType) {

    case ContactConstants.CONTACT_FILTER:
      searchString = action.searchString;
      ContactListStore.emitChange();
      break;

    case ContactConstants.CONTACT_FILTER_BY_GENDER:
      gender[action.gender] = action.checked;
      ContactListStore.emitChange();
      break;

    case ContactConstants.CONTACT_SORT:
      sortCriteria = {
        name: action.name,
        ascendant: action.ascendant,
      };
      ContactListStore.emitChange();
      break;

    case ContactConstants.CONTACT_DESTROY:
      destroy(action.email);
      ContactListStore.emitChange();
      break;

    case ContactConstants.CONTACT_UPDATE_TEXT:
      updateByEmail(action.email, action.text);
      ContactListStore.emitChange();
      break;

    default:

  }
});

module.exports = ContactListStore;
