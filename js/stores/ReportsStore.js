import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import ConfigConstants from '../constants/ConfigConstants';
import ContactConstants from '../constants/ContactConstants';
import ReportsConstants from '../constants/ReportsConstants';
import assign from 'object-assign';
import $ from 'jquery';

const CHANGE_EVENT = 'change';

let BASE_URL = ConfigConstants.BASE_URL;

let reportList = [];

function download(reportType){
  window.open(BASE_URL + '/reports/' + reportType);
}

const ReportsStore = assign({}, EventEmitter.prototype, {

  getAll() {
    return reportList;
  },

  fetchAll() {

    $.ajax({
      url: BASE_URL + '/reports',
      withCredentials: true,
      dataType: 'json',
      success: function (data) {
        reportList = data;
        this.emit(CHANGE_EVENT);
      }.bind(this)
    });

/*    reportList = [
      {
        "description": "Generate and download table with users.",
        "type": "users",
        "label": "Users"
      },
      {
        "description": "Generate and download table with feedback.",
        "type": "feedback",
        "label": "Feedback"
      }
    ];*/

  },

  saveBaseUrl(baseUrl) {
    BASE_URL = baseUrl;
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

    case ReportsConstants.DOWNLOAD:
      download(action.reportType);
      break;

    case ContactConstants.BASE_URL_SAVE:
      ReportsStore.saveBaseUrl(action.baseUrl);

  }
});

module.exports = ReportsStore;
