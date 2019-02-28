import HttpRequestController from './HttpRequestController';

export default class BelieverRequestController {

  constructor() {
    this.httpRequestController = HttpRequestController.getInstance();
  }

  async login(credentials) {

    try {
      let response = await this.httpRequestController.postRequest("/api/user/login", credentials);
      // response = JSON.parse(response);

      if(!response.token){
        throw new Error('Login failed');
      }
      this.httpRequestController.setToken(response.token);

    }
    catch(e){
      throw e;
    }

  }


  async getMissionsFeed()
  {
    try {
      let response = await this.httpRequestController.postRequest("/api/v1/missions", {'user_id': 115} );
      // response = JSON.parse(response);

      if (response && response.length < 1){
        throw new Error('Failed to get missions for user');
      }
       return (response);

    }
    catch(e){
      throw e;
    }
  }


}