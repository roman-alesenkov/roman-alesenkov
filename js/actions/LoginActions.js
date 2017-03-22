import AppDispatcher from '../dispatcher/AppDispatcher';
import LoginConstants from '../constants/LoginConstants';


const LoginActions = {

  logout() {
    AppDispatcher.dispatch({
      actionType: LoginConstants.AUTH_LOGOUT
    });
  },

  loginWithFacebook(){
    AppDispatcher.dispatch({
      actionType: LoginConstants.AUTH_LOGIN_WITH_FACEBOOK
    });
  }

};

module.exports = LoginActions;
