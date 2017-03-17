import AppDispatcher from '../dispatcher/AppDispatcher';
import ReportsConstants from '../constants/ReportsConstants';

const ReportsActions = {

  download(reportType) {
    AppDispatcher.dispatch({
      actionType: ReportsConstants.DOWNLOAD,
      reportType
    });
  }

};

module.exports = ReportsActions;
