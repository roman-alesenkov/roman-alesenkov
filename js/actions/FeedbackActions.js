import AppDispatcher from '../dispatcher/AppDispatcher';
import FeedbackConstants from '../constants/FeedbackConstants';

const ContactUsActions = {

  sendForm() {
    AppDispatcher.dispatch({
      actionType: FeedbackConstants.SEND_CONTACT_US_FORM
    });
  },

  updateEditableContactUsText(type, value) {
    AppDispatcher.dispatch({
      actionType: FeedbackConstants.UPDATE_CONTACT_US_FORM,
      type,
      value,
    });
  }

};

module.exports = ContactUsActions;
