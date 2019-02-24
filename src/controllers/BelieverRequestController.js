import HttpRequestController from './HttpRequestController';

export default class BelieverRequestController {

  constructor() {
    this.httpRequestController = HttpRequestController.getInstance();
  }

  async login(credentials) {

    try {
      let response = await this.httpRequestController.postRequest("/api/user/login", credentials);
      response = JSON.parse(response);

      if(!response.token){
        throw new Error('Login failed');
      }
      this.httpRequestController.setToken(response.token);

    }
    catch(e){
      throw e;
    }

  }

  getJWTToken() {
    return this.httpRequestController.getToken();
  }
}