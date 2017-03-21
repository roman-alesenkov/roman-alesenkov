let ConfigConstants = {
  BASE_URL: 'https://user-app-team.herokuapp.com/api',
  //BASE_URL: 'https://floating-dusk-14900.herokuapp.com/api',
  //BASE_URL: 'http://localhost:8080/api',

  setBaseUrl (baseUrl) {
    this.BASE_URL = baseUrl;
  }
};

export default ConfigConstants;