import HttpRequestController from './HttpRequestController';

export default class BelieverRequestController {

  constructor() {
    this.httpRequestController = HttpRequestController.getInstance();
  }

  login(credentials) {
    return new Promise((resolve, reject) => {
      this.httpRequestController.postRequest("/api/user/login", credentials)
        .then((response) => {
          response = JSON.parse(response);
          // alert(response.token);
          this.httpRequestController.setToken(response.token);
          return resolve();
        })
        .catch((err) => reject(err));
    });
  }

  getJWTToken() {
    return this.httpRequestController.getToken();
  }
}