import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import ConfigConstants from '../constants/ConfigConstants';
import ContactConstants from '../constants/ContactConstants';
import FeedbackConstants from '../constants/FeedbackConstants';
import assign from 'object-assign';
import $ from 'jquery';

const FORM_SENT = 'FORM_SENT';
const CHANGE_EVENT = 'change';

let BASE_URL = ConfigConstants.BASE_URL;

let editableFormData;

clearEditableFormData();

function updateEditableContactUsText(type, value) {
  editableFormData[type] = value;
}

function clearEditableFormData() {
  editableFormData = {
    subject: '',
    body: '',
    email: ''
  };
}

const ContactUsStore = assign({}, EventEmitter.prototype, {

  sendForm() {

    $.ajax({
      url: BASE_URL + '/feedback',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(editableFormData),
      success: function () {
        clearEditableFormData();
         this.emit(FORM_SENT);

      }.bind(this)
    });
  },

  saveBaseUrl(baseUrl) {
    BASE_URL = baseUrl;
  },

  addFormSentListener(callback) {
    this.on(FORM_SENT, callback);
  },

  removeFormSentListener(callback) {
    this.removeListener(FORM_SENT, callback);
  },

  getCurrentContactUs() {
    return editableFormData;
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

});

AppDispatcher.register((action) => {
  switch (action.actionType) {

    case FeedbackConstants.SEND_CONTACT_US_FORM:
      ContactUsStore.sendForm();
      break;

    case FeedbackConstants.UPDATE_CONTACT_US_FORM:
      updateEditableContactUsText(action.type, action.value);
      break;

    case ContactConstants.BASE_URL_SAVE:
      ContactUsStore.saveBaseUrl(action.baseUrl);

  }
});

module.exports = ContactUsStore;
