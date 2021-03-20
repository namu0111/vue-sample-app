import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import firebase from 'firebase'

Vue.config.productionTip = false

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
  apiKey: "AIzaSyC1rHGUfRhbs91b65RIO7z37x8EZqGPBX8",
  authDomain: "vue-sample-app-fca69.firebaseapp.com",
  projectId: "vue-sample-app-fca69",
  storageBucket: "vue-sample-app-fca69.appspot.com",
  messagingSenderId: "249296077029",
  appId: "1:249296077029:web:416617ead803d9f1c7940c",
  measurementId: "G-J2F9P783CC"
};

firebase.initializeApp(config);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
