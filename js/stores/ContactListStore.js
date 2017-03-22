import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import ContactConstants from '../constants/ContactConstants';
import ConfigConstants from '../constants/ConfigConstants';
import assign from 'object-assign';
import $ from 'jquery';


const CHANGE_EVENT = 'change';
const CONTACT_CREATED_EVENT = 'CONTACT_CREATED';
//let BASE_URL = 'https://node-api-rhaibevozn.now.sh/api';
//let BASE_URL = 'http://localhost:8080/api';
//let BASE_URL = 'https://floating-dusk-14900.herokuapp.com/api';
let BASE_URL = ConfigConstants.BASE_URL;

let contactList = [];
let profile = null;
let editableProfile = {};

let params = {
  offset: 0,
  limit: 5,
  inc: 'id,firstName,lastName'
};

let countAll = 0;

const limitValues = [5, 10, 20];

function updateEditableProfileText(type, value) {
  editableProfile[type] = value;
}

const ContactListStore = assign({}, EventEmitter.prototype, {

  getCountAll() {
    return countAll;
  },

  getLimit() {
    return params.limit;
  },

  setLimit(limit) {
    params.limit = limit;
  },

  setPage(page) {
    params.offset = (page - 1)* params.limit;
  },

  getPage(){
    return (params.offset / params.limit) + 1;
  },

  getLimitValues() {
    return limitValues;
  },

  getAll() {
    return contactList;
  },

  clearProfileInfo() {
    editableProfile = {};
    profile = {};
  },

  fetchAll() {
      $.ajax({
        url: BASE_URL + '/users',
        withCredentials: true,
        dataType: 'json',
        data: params,
        success: function (data) {
          contactList = data.items || [];
          countAll = data.countAll || 0;
          this.emit(CHANGE_EVENT);
        }.bind(this)
      });
  },

  getCurrentProfile() {
    return profile;
  },

  destroyById(id) {
    $.ajax({
      type: 'DELETE',
      url: BASE_URL + '/user/' + id,
      withCredentials: true,
      dataType: 'json',
      success: function (data) {
        this.fetchAll();
      }.bind(this)
    });
  },

  saveProfile() {
    let url;
    let type;

    if (editableProfile.id) {
      url = BASE_URL + '/user/' + editableProfile.id;
      type = 'PUT';
    } else {
      url = BASE_URL + '/users';
      type = 'POST';
    }

    editableProfile.sex = editableProfile.sex || 'male';

    $.ajax({
      url: url,
      type: type,
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(editableProfile),
      success: function () {
        if (!editableProfile.id) {
          this.clearProfileInfo();
        }

        this.emit(CHANGE_EVENT);

        if (!editableProfile.id) {
          this.emit(CONTACT_CREATED_EVENT);
        }

      }.bind(this)
    });
  },

  fetchUserById(id) {
    this.clearProfileInfo();
    $.ajax({
      //url: `${BASE_URL}?results=1&inc=login,name,gender,email,location,picture,phone`,
      url: BASE_URL + '/user/' + id,
      dataType: 'json',
      success: function (data) {
        profile = data;
        editableProfile = profile;
        this.emit(CHANGE_EVENT);
      }.bind(this)
    });
  },

  getFilterState() {
    return {
      gender,
      searchString,
    };
  },

  getBaseUrl() {
    return BASE_URL;
  },

  saveBaseUrl(baseUrl) {
    ConfigConstants.setBaseUrl(baseUrl);
    BASE_URL = baseUrl;
  },

  downloadUserList() {
    window.open(BASE_URL + '/reports/users');
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

  addContactCreatedListener(callback) {
    this.on(CONTACT_CREATED_EVENT, callback);
  },

  removeContactCreatedListener(callback) {
    this.removeListener(CONTACT_CREATED_EVENT, callback);
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
      destroyById(action.id);
      ContactListStore.emitChange();
      break;

    case ContactConstants.CONTACT_UPDATE_EDITABLE_TEXT:
      updateEditableProfileText(action.type, action.value);
      break;

    case ContactConstants.CONTACT_SAVE:
      ContactListStore.saveProfile();
      ContactListStore.emitChange();
      break;

    case ContactConstants.BASE_URL_SAVE:
      ContactListStore.saveBaseUrl(action.baseUrl);
      ContactListStore.fetchAll();
      break;

    case ContactConstants.LIMIT_CHANGE:
      ContactListStore.setLimit(action.limit);
      ContactListStore.setPage(1);
      ContactListStore.fetchAll();
    break;

    case ContactConstants.PAGE_CHANGE:
      ContactListStore.setPage(action.page);
      ContactListStore.fetchAll();
    default:

  }
});

module.exports = ContactListStore;
