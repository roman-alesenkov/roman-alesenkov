import AppDispatcher from '../dispatcher/AppDispatcher';
import ContactConstants from '../constants/ContactConstants';


const ContactActions = {

  destroy(email) {
    AppDispatcher.dispatch({
      actionType: ContactConstants.CONTACT_DESTROY,
      email,
    });
  },

  filterList(searchString) {
    AppDispatcher.dispatch({
      actionType: ContactConstants.CONTACT_FILTER,
      searchString,
    });
  },

  filterByGenderChange(checked, gender) {
    AppDispatcher.dispatch({
      actionType: ContactConstants.CONTACT_FILTER_BY_GENDER,
      checked,
      gender,
    });
  },

  sortList(name, ascendant) {
    AppDispatcher.dispatch({
      actionType: ContactConstants.CONTACT_SORT,
      name,
      ascendant,
    });
  },

  updateText(email, text) {
    AppDispatcher.dispatch({
      actionType: ContactConstants.CONTACT_UPDATE_TEXT,
      email,
      text,
    });
  },

};

module.exports = ContactActions;
