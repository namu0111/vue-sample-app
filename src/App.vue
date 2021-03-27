<template>
  <v-app>
    <v-app-bar
        app
        color="primary"
        dark
    >
        <v-app-bar-nav-icon @click.stop="toggleSideMenu" v-show='$auth.isAuthenticated'></v-app-bar-nav-icon>
        <v-toolbar-title @click="$router.push({ name: 'home' })">Contact List App</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <!-- show login when not authenticated -->
          <v-btn text @click="login" v-if="!$auth.isAuthenticated">Auth0 Log in</v-btn>
          <v-btn text v-if="$auth.isAuthenticated" link :to="{ name: 'profile'}" >{{ this.$store.getters["login_user/userName"] }}</v-btn>
          <!-- show logout when authenticated -->
          <v-btn text @click="logout" v-if="$auth.isAuthenticated">Auth0 Log out</v-btn>
        </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <v-container v-show='$auth.isAuthenticated'>
       <SideNav/>
      </v-container>
      <v-container align-start>
       <Error />
      </v-container>
      <v-container align-start>
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import SideNav from './components/SideNav.vue';
import Error from "./components/Error";
import auth from './store/modules/auth'
import login_user from './store/modules/login_user'
import jwt_decode from "jwt-decode";

export default {
  name: 'App',

  components: {
    SideNav,
    Error,
  },
  async beforeUpdate () {
    if(this.$auth.isAuthenticated){ 
      this.setAuth0LoginUser();
      await this.getClaims()
    }else{
      console.log('Not Authenticated')
    } 
  },
  computed: {
    ...mapGetters(
      {
        userId: 'login_user/userId',
        userName: 'login_user/userName'
      }
      ),
  },
  data: () => ({

  }),
  methods: {
    async getClaims () {
      const claims = await this.$auth.getIdTokenClaims();
      console.log('claims:', claims);
      const token = claims.__raw;
      console.log('token:', token);
      await this.$store.dispatch(`auth/setAuthToken`,token);
      const jwt = token;
      const decoded = jwt_decode(jwt);
      const role = decoded['https://hasura.io/jwt/claims']['x-hasura-role']
      console.log('decode:', decoded);
      console.log('role:', role)
      await this.$store.dispatch(`auth/setAuthRole`,role);
      console.log(this.$store.state.auth.authRole)
    },
    async setAuth0LoginUser(){
      const userInfo = this.$auth.user
      console.log('user info:', userInfo)  
      await this.$store.dispatch(`login_user/setLoginUser`,userInfo);
    },
    login() {
      this.$auth.loginWithRedirect({audience: process.env.VUE_APP_AUDIENCE});
    },
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin  
      },);
      console.log('Not Authenticated')
    },
    ...mapActions(
      [
        'toggleSideMenu',
        'deleteLoginUser',
      ],
      auth[
        'setAuthToken',
        'setAuthRole'
      ],
      login_user[
        'setLoginUser'
      ]
    ),
  },
};
</script>
