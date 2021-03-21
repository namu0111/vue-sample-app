import createAuth0Client from '@auth0/auth0-spa-js'
// Import the Auth0 configuration
import { domain, clientId } from "../../auth_config.json";

class AuthService {
  constructor() {
  }

  async init() {
    this.auth0 = await createAuth0Client({
        domain: domain,
        client_id: clientId,
    });
    await this.isLoggedIn();
  }

  async isLoggedIn() {
    this.loggedIn = await this.auth0.isAuthenticated();
    await this.getUser();
  }

  async getUser() {
    this.user = await this.auth0.getUser();
  }

  login(appState) {
    this.auth0.loginWithRedirect({appState: appState});
  }

  logout() {
    this.auth0.logout();
  }

  async callback() {
    const result = await this.auth0.handleRedirectCallback();
    await this.isLoggedIn();
    return result.appState;
  }
}

const service = new AuthService();
export default service;