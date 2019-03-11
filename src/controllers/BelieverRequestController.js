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


  async getMissionsFeed() {
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

  async getClientsNearUser() {
    try {
      let response = await this.httpRequestController.postRequest("/api/v1/clients", {'user_id': 115} );

      if (response && response.length < 1){
        throw new Error('Failed to get brands for user');
      }
      return (response);

    }
    catch(e){
      throw e;
    }
  }

  async getClientsFollowedByUser() {
    try {
      let response = await this.httpRequestController.postRequest("/api/v1/clientsFollowedByUser", {'user_id': 115} );

      if (response && response.length < 1){
        throw new Error('Failed to get followed brands for user');
      }
      return (response);

    }
    catch(e){
      throw e;
    }
  }

  async postMissionCompletion(mission_id) {
    try {
      let response = await this.httpRequestController.postRequest("/api/v1/missions", {'user_id': 115, 'mission_id': mission_id} );

      if (response && response.length < 1){
        throw new Error('Oops. Something went wrong while saving your progress.');
      }
      return (response);

    }
    catch(e){
      throw e;
    }
  }

  async getRewardsList() {
    try {
      let response = await this.httpRequestController.postRequest("/api/v1/rewards" );

      if (response && response.length < 1){
        throw new Error('Failed to get rewards');
      }
      return (response);

    }
    catch(e){
      throw e;
    }
  }

  async getUserProfile() {
    try {
      let response = await this.httpRequestController.postRequest("/api/v1/profile", {user_id: 115} );

      if (response && response.length < 1){
        throw new Error('Failed to get profile');
      }
      return (response);

    }
    catch(e){
      throw e;
    }
  }


}