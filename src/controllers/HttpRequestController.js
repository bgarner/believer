import {stringify} from 'query-string';

export default class HttpRequestController {

  constructor() {
    this.token = null;
    this.baseUrl = "http://localhost:8000";
    this._instance = null;
  }

  static getInstance() {
    if (!this._instance) {
      this._instance = new HttpRequestController();
    }

    return this._instance;
  }

  //save this token to a local storage
  setToken(token) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  async postRequest(path, request) {

    try {
     const response = await fetch(this.baseUrl + path, {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      return response.text();
    }
    catch(e){
      throw e;
    }
  }

  getRequest(path, params) {
    const queryString = stringify(params);
    return new Promise((resolve, reject) => {
      return fetch(this.baseUrl + path + "?" + queryString, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.token
        }
      })
        .then((response) => response.json())
        .then((responseJson) => resolve(responseJson))
        .catch((error) => reject(error))

    });

  }
}
