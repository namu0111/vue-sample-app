import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
// Import the Auth0 configuration
// import { domain, clientId, audience } from "../auth_config.json";
// Import the plugin here
import { Auth0Plugin } from "./auth";
// GraphQL
import { createProvider } from './vue-apollo';
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuelidate from 'vuelidate'

const domain = process.env.VUE_APP_DOMAIN;
const clientId = process.env.VUE_APP_CLIENTID;
const audience = process.env.VUE_APP_AUTH0_AUDIENCE;

// Install the authentication plugin here
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});

Vue.config.productionTip = false;

Vue.use(VueAxios, axios)
Vue.use(Vuelidate)

new Vue({
  router,
  store,
  vuetify,
  apolloProvider: createProvider(),// GraphQL API
  render: h => h(App),
}).$mount('#app')
