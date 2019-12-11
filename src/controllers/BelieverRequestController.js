import HttpRequestController from './HttpRequestController';
import {Alert} from "react-native";

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
      console.log(response);
      if(!response.token){
        if (response.email) {
          Alert.alert(  'Failed to register! ', '' + response.email);
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
      console.log(userId);
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

  async getClientActiveMissions(client_id) {
    try {
      const userId = await this.httpRequestController.getUserId();
      let response = await this.httpRequestController.postRequest("/api/v1/missions/client", {'user_id': userId, 'client_id': client_id} );
      if (response && response.length >= 1){
        return (response);
      }
      return [];
      throw new Error('Failed to get active missions for client');

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

      if (response && response.length >= 1){
        return (response);
      }
      return [];
      throw new Error('Failed to get messages for user');

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
      console.log(userId);
      let response = await this.httpRequestController.postRequest("/api/v1/missions/getMissionHistory", {user_id: userId} );
      if (response && response.length >= 1){
        return (response);
      }
      return [];
      throw new Error('Failed to get mission history for user');

    }
    catch(e){
      throw e;
    }
  }

  async updateContact(credentials) {
    console.log(credentials);
    try {
      const userId = await this.httpRequestController.getUserId();
      let response = await this.httpRequestController.postRequest("/api/v1/profile/editContact", {user_id: userId, ...credentials } );
      if (response && response.length < 1){
        throw new Error('Failed to update username');
      }
      return (response);

    }
    catch(e){
      throw e;
    }
  }

  async updateUsername(credentials) {
    try {
      const userId = await this.httpRequestController.getUserId();
      let response = await this.httpRequestController.postRequest("/api/v1/profile/editUsername", {user_id: userId, ...credentials } );
      if (response && response.length < 1){
        throw new Error('Failed to update profile');
      }
      return (response);

    }
    catch(e){
      throw e;
    }
  }

  async saveFavouriteMission (mission_id) {
    try {
      const userId = await this.httpRequestController.getUserId();
      let response = await this.httpRequestController.postRequest("/api/v1/favs/create", {user_id: userId, mission_id: mission_id} );
      console.log(response);
      if (response && response.length < 1){
        throw new Error('Failed to save favourite mission');
      }
      return true;

    }
    catch(e){
      throw e;
    }
  }

  async deleteFavouriteMission (mission_id) {
    try {
      const userId = await this.httpRequestController.getUserId();
      let response = await this.httpRequestController.postRequest("/api/v1/favs/delete", {user_id: userId, mission_id: mission_id} );
      console.log(response);
      if (response && response.length < 1){
        throw new Error('Failed to delete favourite mission');
      }
      return true;

    }
    catch(e){
      throw e;
    }
  }

  async getFavouriteMission () {
    try {
      const userId = await this.httpRequestController.getUserId();
      console.log(userId);
      let response = await this.httpRequestController.postRequest("/api/v1/favs", {user_id: userId} );
      if (response && response.length >= 1){
        return (response);
      }
      return [];
      throw new Error('Failed to get favourite missions for user');

    }
    catch(e){
      throw e;
    }
  }

  async updateProfileImage(source) {
    let form = new FormData();
    const userId = await this.httpRequestController.getUserId();
    form.append("user_id", userId);
    form.append("profilepic", source);
    form.append("file", source);
    const baseUrl = this.httpRequestController.getBaseUrl();

    try {
      const response = await fetch(baseUrl +"/api/v1/profile/editProfilePic", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: 'application/json',
        },
        body: form,
      });
      console.log(response.toString());
      return response.json();
    }
    catch (e) {
      throw e;
    }

  }

  async deleteProfile() {
    try {
      const userId = await this.httpRequestController.getUserId();
      let response = await this.httpRequestController.postRequest("/api/v1/profile/delete", {user_id: userId} );
      if (!response.hasOwnProperty('deleted')){
        return false;
      }
      return true;
      throw new Error('Failed to delete profile');

    }
    catch(e){
      throw e;
    }
  }

}