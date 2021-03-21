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
          <v-btn text v-if="$auth.isAuthenticated" link :to="{ name: 'profile'}" >{{ $store.getters.userName }}</v-btn>
          <!-- show logout when authenticated -->
          <v-btn text @click="logout" v-if="$auth.isAuthenticated">Auth0 Log out</v-btn>
        </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <v-container v-show='$auth.isAuthenticated'>
       <SideNav/>
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

export default {
  name: 'App',

  components: {
    SideNav,
  },
  beforeUpdate () {
    this.setAuth0LoginUser();
    this.fetchAddresses();
  },
  computed: {
    ...mapGetters(['userName',])
  },
  data: () => ({
    //
  }),
  methods: {
    async login() {
      await this.$auth.loginWithRedirect();
    },
    async logout() {
      await this.$auth.logout({
        returnTo: window.location.origin  
      },);
      console.log('Log out')
    },
    async setAuth0LoginUser(){
        await this.setLoginUser(this.$auth.user)
        console.log(this.$auth.user)
        console.log(this.$store.getters.user)
    },
    ...mapActions(
      [
        'toggleSideMenu',
        'setLoginUser',
        'deleteLoginUser',
        'fetchAddresses',
      ]
    )
  },
};
</script>
