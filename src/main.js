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
// GraphQL
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from "apollo-cache-inmemory";
import VueApollo from "vue-apollo";

// GraphQL API
const httpLink = new HttpLink({
  uri: process.env.VUE_APP_HASURA_URL
});

const apolloClient = new ApolloClient({
  link: httpLink,
  // 実行したクエリをメモリにキャッシュします。
  cache: new InMemoryCache(),
  connectToDevTool: true
});

Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  projectId: process.env.FIREBASE_PROJECTID,
  measurementId: process.env.FIREBASE_MEASUREMETID
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
  render: h => h(App),
  apolloProvider,
}).$mount('#app')
