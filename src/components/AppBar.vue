<template>
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
          <v-btn text @click="$router.push({ name: 'contact-form' })">Contact</v-btn>
        </v-toolbar-items>
    </v-app-bar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import auth from '../store/modules/auth'
import login_user from '../store/modules/login_user'
import jwt_decode from "jwt-decode";

export default {
  name: 'AppBar',

  components: {

  },
  async beforeUpdate () {
    if(this.$auth.isAuthenticated){ 
        await this.getClaims()
        await this.setAuth0LoginUser();
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
      
      const accessToken = await this.$auth.getTokenSilently();
      const decodeAccessToken = jwt_decode(accessToken);
      const decodeAccessTokenRole = decodeAccessToken['https://hasura.io/jwt/claims/roles']
      console.log("access:",decodeAccessTokenRole);
      await this.$store.dispatch(`auth/setAuthRole`,decodeAccessTokenRole);
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