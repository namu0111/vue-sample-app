<template>
  <v-app>
    <v-app-bar
        app
        color="primary"
        dark
    >
        <v-app-bar-nav-icon @click.stop="toggleSideMenu" v-show='$store.state.login_user'></v-app-bar-nav-icon>
        <v-toolbar-title @click="$router.push({ name: 'home' })">マイアドレス帳</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn text @click="logout" v-if='$store.state.login_user'>ログアウト</v-btn>
        </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <v-container v-show='$store.state.login_user'>
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
import firebase from 'firebase'

export default {
  name: 'App',

  components: {
    SideNav,
  },
  computed: {
    ...mapGetters(['userName'])
  },
  created () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setLoginUser(user)
        this.fetchAddresses()
        if (this.$router.currentRoute.name === 'Login') this.$router.push({ name: 'home' })
      }else{
        this.deleteLoginUser()
        this.$router.push({ name: 'Login' })
      }
    }
    )
  },
  data: () => ({
    //
  }),
  methods: {
    ...mapActions(
      [
        'toggleSideMenu',
        'setLoginUser',
        'logout',
        'deleteLoginUser',
        'fetchAddresses',
      ]
    )
  },
};
</script>
