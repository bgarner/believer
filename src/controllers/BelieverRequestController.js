import HttpRequestController from './HttpRequestController';

export default class BelieverRequestController {

  constructor() {
    this.httpRequestController = HttpRequestController.getInstance();
  }



  async login(credentials) {

    try {
      let response = await this.httpRequestController.postRequest("/api/user/login", credentials);

      if(!response.token){
        throw new Error('Login failed');
      }
      this.httpRequestController.setToken(response.token);
      this.httpRequestController.setUserId(response.user_id);

    }
    catch(e){
      throw e;
    }

  }

  async register(credentials) {
    try {
      let response = await this.httpRequestController.postRequest("/api/user/register", credentials);
      if(!response.token){
        if (response.email) {
          alert('Failed to register! \n' + response.email);
        }
        throw new Error('Failed to register');
      }
      this.httpRequestController.setToken(response.token);
      this.httpRequestController.setUserId(response.user_id);

    }
    catch(e){
      throw e;
    }
  }

  async getMissionsFeed() {
    try {
      const userId = await this.httpRequestController.getUserId();
      let response = await this.httpRequestController.postRequest("/api/v1/missions", {'user_id': userId} );

      if (response && response.length >= 1){
        return (response);
      }
      return [];
      throw new Error('Failed to get missions for user');

    }
    catch(e){
      throw e;
    }
  }

  async getClientsNearUser() {
    try {
      const userId = await this.httpRequestController.getUserId();
      let response = await this.httpRequestController.postRequest("/api/v1/clients", {'user_id': userId} );

      if (response && response.length >= 1){
        return (response);

      }
      return [];
      throw new Error('Failed to get brands for user');

    }
    catch(e){
      throw e;
    }
  }

  async getClientsFollowedByUser() {
    try {
      const userId = await this.httpRequestController.getUserId();
      let response = await this.httpRequestController.postRequest("/api/v1/clientsFollowedByUser", {'user_id': userId} );

      if (response && response.length >= 1){
        return (response);
      }
      return [];
      throw new Error('Failed to get followed brands for user');


    }
    catch(e){
      throw e;
    }
  }

  async getClientDetails(client_id) {
    try {
      let response = await this.httpRequestController.postRequest("/api/v1/clients/show", {client_id} );
      if (response && response.length < 1){
        throw new Error('Failed to get client details');
      }
      return (response);

    }
    catch(e){
      throw e;
    }
  }

  async postMissionCompletion(mission_id) {
    try {
      const userId = await this.httpRequestController.getUserId();
      let response = await this.httpRequestController.postRequest("/api/v1/missions/complete", {'user_id': userId, 'mission_id': mission_id} );

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

  async redeemReward(reward_id) {
    try {
      const userId = await this.httpRequestController.getUserId();
      let response = await this.httpRequestController.postRequest("/api/v1/rewards/redeem" , {user_id: userId, reward_id: reward_id});

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
      const userId = await this.httpRequestController.getUserId();
      let response = await this.httpRequestController.postRequest("/api/v1/profile", {user_id: userId} );

      if (response && response.length < 1){
        throw new Error('Failed to get profile');
      }
      return (response);

    }
    catch(e){
      throw e;
    }
  }

  async followClient(client_id) {
    try {
      const userId = await this.httpRequestController.getUserId();
      let response = await this.httpRequestController.postRequest("/api/v1/clients/follow", {user_id: userId, client_id: client_id} );

      if (response && response.length < 1){
        throw new Error('Failed to follow Client');
      }
      return (response);

    }
    catch(e){
      throw e;
    }
  }

  async unfollowClient(client_id) {
    try {
      const userId = await this.httpRequestController.getUserId();
      let response = await this.httpRequestController.postRequest("/api/v1/clients/unfollow", {user_id: userId, client_id: client_id} );

      if (response && response.length < 1){
        throw new Error('Failed to unfollow Client');
      }
      return (response);

    }
    catch(e){
      throw e;
    }
  }

  async getMessages() {
    try {
      const userId = await this.httpRequestController.getUserId();
      let response = await this.httpRequestController.postRequest("/api/v1/messages", {user_id: userId} );

      if (response && response.length < 1){
        throw new Error('Failed to get messages for user');
      }
      return (response);

    }
    catch(e){
      throw e;
    }
  }

  async getMessage(message_id) {
    try {
      const userId = await this.httpRequestController.getUserId();
      let response = await this.httpRequestController.postRequest("/api/v1/messages/show", {user_id: userId, message_id: message_id} );
      if (response && response.length < 1){
        throw new Error('Failed to get message details');
      }
      return (response);

    }
    catch(e){
      throw e;
    }
  }

  async deleteMessage(message_id) {
    try {
      const userId = await this.httpRequestController.getUserId();
      let response = await this.httpRequestController.postRequest("/api/v1/messages/delete", {user_id: userId, message_id: message_id} );
      if (response && response.length < 1){
        throw new Error('Failed to delete message');
      }
      return (response);

    }
    catch(e){
      throw e;
    }
  }

  async postReferral(first, last, email, brand_id) {
    try {
      const userId = await this.httpRequestController.getUserId();
      let response = await this.httpRequestController.postRequest("/api/v1/referral/create",
        {
          'first_name': first,
          'last_name': last,
          'email': email,
          'brand_id': brand_id,
          'referred_by_id': userId,
        });

      if (response && response.length < 1){
        throw new Error('Oops. Something went wrong while submitting the referral.');
      }
      return (response);

    }
    catch(e){
      throw e;
    }
  }

  async getMissionHistory() {
    try {
      const userId = await this.httpRequestController.getUserId();
      let response = await this.httpRequestController.postRequest("/api/v1/missions/getMissionHistory", {user_id: userId} );
      console.log(response);
      if (response && response.length < 1){
        throw new Error('Failed to get messages for user');
      }
      return (response);

    }
    catch(e){
      throw e;
    }
  }

}