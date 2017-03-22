import AppDispatcher from '../dispatcher/AppDispatcher';
import ContactConstants from '../constants/ContactConstants';


const ContactActions = {

  saveBaseUrl(baseUrl) {
    AppDispatcher.dispatch({
      actionType: ContactConstants.BASE_URL_SAVE,
      baseUrl,
    });
  },

  destroy(id) {
    AppDispatcher.dispatch({
      actionType: ContactConstants.CONTACT_DESTROY,
      id,
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

  updateEditableProfileText(type, value) {
    AppDispatcher.dispatch({
      actionType: ContactConstants.CONTACT_UPDATE_EDITABLE_TEXT,
      type,
      value,
    });
  },

  saveProfile(){
    AppDispatcher.dispatch({
      actionType: ContactConstants.CONTACT_SAVE
    });
  },

  changeLimit(limit){
    AppDispatcher.dispatch({
      actionType: ContactConstants.LIMIT_CHANGE,
      limit
    });
  },

  changePage(page){
    AppDispatcher.dispatch({
      actionType: ContactConstants.PAGE_CHANGE,
      page
    });
  }

};

module.exports = ContactActions;
