import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
// Import the Auth0 configuration
import { domain, clientId } from "../auth_config.json";
// Import the plugin here
import { Auth0Plugin } from "./auth";
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyC1rHGUfRhbs91b65RIO7z37x8EZqGPBX8",
  authDomain: "vue-sample-app-fca69.firebaseapp.com",
  projectId: "vue-sample-app-fca69",
  measurementId: "G-J2F9P783CC"
};

firebase.initializeApp(firebaseConfig);

// Install the authentication plugin here
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
